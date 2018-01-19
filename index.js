class WebVTTConverter {
  constructor(resource) {
    this.resource = resource;
  }

  blobToBuffer() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', event => {
        const buf = event.target.result;
        resolve(new Uint8Array(buf));
      });
      reader.addEventListener('error', () => reject('Error while reading the Blob object'));
      reader.readAsArrayBuffer(this.resource)
    });
  }

  toVTT(utf8str) {
    return utf8str
    .replace(/\{\\([ibu])\}/g, '</$1>')
    .replace(/\{\\([ibu])1\}/g, '<$1>')
    .replace(/\{([ibu])\}/g, '<$1>')
    .replace(/\{\/([ibu])\}/g, '</$1>')
    .replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, '$1.$2') + '\r\n\r\n';
  }

  toTypedArray(str) {
    const result = [];
    str.split().forEach((each, index) => {
      result.push(parseInt(str.substring(index, index + 2), 16));
    });
    return Uint8Array.from(result);
  }

  getURL() {
    return new Promise((resolve, reject) => {
      if (!(this.resource instanceof Blob)) return reject('Expecting resource to be a Blob but something else found.');
      if (!(FileReader)) return reject('No FileReader constructor found');
      if (!TextDecoder) return reject('No TextDecoder constructor found');
      this.blobToBuffer()
      .then(buffer => {
        const utf8str = new TextDecoder('utf-8').decode(buffer);
        const vttString = 'WEBVTT FILE\r\n\r\n';
        console.log(this.toTypedArray(vttString.concat(utf8str)));
      });
    });
  }
}

window.WebVTTConverter = WebVTTConverter;

export default WebVTTConverter;
