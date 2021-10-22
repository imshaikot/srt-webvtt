export const moduleName = 'toWebVTT';

const blobToBufferOrString = (blob: Blob, readAs: 'string' | 'buffer'): Promise<Uint8Array | String> => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    const loadedCb = (event: Event) => {
      const buf = (event.target as any).result;
      reader.removeEventListener('loadend', loadedCb);
      resolve(readAs !== 'string' ? new Uint8Array(buf) : buf);
    };

    const errorCb = () => {
      reader.removeEventListener('error', errorCb);
      reject(new Error(`${moduleName}: Error while reading the Blob object`));
    };

    reader.addEventListener('loadend', loadedCb);
    reader.addEventListener('error', errorCb);
    if (readAs !== 'string') {
      reader.readAsArrayBuffer(blob);
    } else {
      reader.readAsText(blob);
    }
  });

const blobToURL = (text: string): string => URL
  .createObjectURL(new Blob([text], { type: 'text/vtt' }));

const toVTT = (utf8str: string) => utf8str
  .replace(/\{\\([ibu])\}/g, '</$1>')
  .replace(/\{\\([ibu])1\}/g, '<$1>')
  .replace(/\{([ibu])\}/g, '<$1>')
  .replace(/\{\/([ibu])\}/g, '</$1>')
  .replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, '$1.$2')
  .concat('\r\n\r\n');

const toWebVTT = async (resource: Blob): Promise<string> => {
  if (!(FileReader)) {
    throw (new Error(`${moduleName}: No FileReader constructor found`));
  }
  if (!TextDecoder) {
    throw (new Error(`${moduleName}: No TextDecoder constructor found`));
  }
  if (!(resource instanceof Blob)) {
    throw new Error(`${moduleName}: Expecting resource to be a Blob but something else found.`);
  }
  let text;
  const vttString = 'WEBVTT FILE\r\n\r\n';
  try {
    const buffer = await blobToBufferOrString(resource, 'string');
    text = vttString.concat(toVTT(buffer as string));
  } catch (e) {
    const buffer = await blobToBufferOrString(resource, 'buffer');
    const decode = new TextDecoder('utf-8').decode(buffer as Uint8Array);
    text = vttString.concat(toVTT(decode));
  }
  return Promise.resolve(blobToURL(text));
};

(window as any).WebVTTConverter = toWebVTT;

export default toWebVTT;
