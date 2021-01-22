import { 
    encodeData,
    decodeData
} from "../../src/util/encode-decode";

describe('Test encode and decode', () => {

    test("Should be able to encode the given data", () => {
        const data = "this is provate text";
        const encodeText = encodeData(data);
        expect(encodeText).toBe('dGhpcyBpcyBwcm92YXRlIHRleHQ=');
    });

    test("Should be able to decode the given encrypted data", () => {
        const data = "dGhpcyBpcyBwcm92YXRlIHRleHQ=";
        const decodeText = decodeData(data);
        expect(decodeText).toBe('this is provate text');
    });

});

