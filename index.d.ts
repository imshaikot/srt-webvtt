declare module "srt-webvtt" {
  class WebVTTConverter {
    constructor(resource: Blob);

    public blobToBuffer(): Promise<Uint8Array | string>;
    public static blobToString(
      blob: Blob,
      success: (result: string) => void,
      fail: () => void
    ): void;
    public static toVTT(utf8str: string): string;
    public static toTypedArray(str: string): Uint8Array;
    public getURL(): Promise<string>;
    public release(): void;
  }

  export default WebVTTConverter;
}
