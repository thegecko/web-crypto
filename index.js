const algorithm = "ECDSA";
const curve = "P-256"; // can be "P-256", "P-384", or "P-521" - secp256r1
const hash = "SHA-256"; // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
const crypto = window.crypto.subtle || window.crypto.webkitSubtle;

function generateKey() {
    return crypto.generateKey({
        name: algorithm,
        namedCurve: curve
    }, true, ["sign", "verify"]);
}

function importPrivatePem(pem) {
    let key = b642ab(removeLines(pem));
    return crypto.importKey("pkcs8", key, {
        name: algorithm,
        namedCurve: curve
    }, true, ["sign"])
}

function exportPrivatePem(key) {
    return crypto.exportKey("pkcs8", key.privateKey)
    .then(privateKey => {
        return addLines(ab2b64(privateKey));
    });
}

function sign(privateKey, data) {
    return crypto.sign({
        name: algorithm,
        hash: {
            name: hash
        }
    }, privateKey, str2ab(data)
    )
    .then(signature => ab2b64(signature));
}

function verify(publicKey, data, signature) {
    return crypto.verify({
        name: algorithm,
        hash: {
            name: hash
        }
    }, publicKey, b642ab(signature), str2ab(data));
}

function ab2b64(buf) {
    let str = String.fromCharCode.apply(null, new Uint8Array(buf));
    return window.btoa(str);
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

function addLines(str) {
    let finalString = '';
    while(str.length > 0) {
        finalString += str.substring(0, 64) + '\n';
        str = str.substring(64);
    }
    return `-----BEGIN PRIVATE KEY-----\n${finalString}-----END PRIVATE KEY-----`;
}

function removeLines(str) {
    let key = str.split("\n").filter(line => !/^-+.*-+$/.test(line));
    return key.join("");
}
