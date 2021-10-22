import { TextDecoder } from 'util'
import { default as WebVTT, moduleName } from './index'

describe('WebVTT', () => {
    let file: Blob;

    beforeEach(() => {
        file = new Blob([new Uint8Array([])], { type: 'text/plain' });
        (global as any).TextDecoder = TextDecoder;
        (global.URL as any).createObjectURL = jest.fn().mockImplementation((text) => 'blob:some-valid-url');
    })

    it('should return a promise', () => {
        expect(WebVTT(file)).toBeInstanceOf(Promise);
    });
    it('should return a valid return', async () => {
        expect(await WebVTT(file)).toBe('blob:some-valid-url');
    });
    it('should throw if undefined or wrong resource provided', async () => {
        try {
            const webVtt = await WebVTT(undefined as any);
        } catch (e: any) {
            expect(e.message).toContain(moduleName);
            expect(e.message).toContain('Blob');
        }
    });
    it('should throw TextDecoder is not defined', async () => {
        (global as any).TextDecoder = undefined;
        try {
            const webVtt = await WebVTT(file);
        } catch (e: any) {
            expect(e.message).toContain(moduleName);
            expect(e.message).toContain('TextDecoder');
        }
    });
});