const algorithm = 'ECDSA';

const exportKey = (publicKey) => crypto.subtle.exportKey('jwk', publicKey);

const checkSignature = (signature, publicKey, data) => crypto.subtle.verify(
    { name: algorithm, hash: { name: 'SHA-256' } },
    publicKey,
    signature,
    data
);

const signWithPrivateKey = (privateKey, data) => crypto.subtle.sign(
    { name: algorithm, hash: { name: 'SHA-256' } },
    privateKey,
    data
);

const genJWKPair = () => crypto.subtle.generateKey(
    {
        name: algorithm,
        namedCurve: 'P-256',
    },
    true,
    ['sign', 'verify']
);

// Use a lib for production instead of below methods;
const base64Decode = (str) => {
    return b642ab(str);
}

function str2ab(str) {
    let bytes = new Uint8Array(str.length);

    for(let i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }

    return bytes;
}

function b642ab(b64) {
    let str = window.atob(b64);
    return str2ab(str);
}

const ab2b64 = (buf) => {
    let str = String.fromCharCode.apply(null, new Uint8Array(buf));
    return window.btoa(str);
}
