import CryptoJS from 'crypto-js'

class AkunahEncryption {
    #key
    constructor(key) {
        this.#key = CryptoJS.enc.Base64.parse(key)
    }

    decrypt(crypted_data) {
        const bytes = Buffer.from(crypted_data, 'base64')
        const str = bytes.toString()
        const data = JSON.parse(str)
        const iv = CryptoJS.enc.Base64.parse(data.iv)
        const value = CryptoJS.enc.Base64.parse(data.value)
        const decrypted = CryptoJS.AES.decrypt({ ciphertext: value }, this.#key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
        })
        const decrypted_text = decrypted.toString(CryptoJS.enc.Utf8)
        return decrypted_text
    }

    encrypt(plainText) {
        const iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64);
        const encrypted = CryptoJS.AES.encrypt(plainText, this.#key, {
            iv: CryptoJS.enc.Base64.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        const encryptedData = {
            iv: iv,
            value: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
        };
        encryptedData['mac'] = CryptoJS.HmacSHA256(encryptedData['iv'] + encryptedData['value'], this.#key).toString(CryptoJS.enc.Hex);
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(encryptedData))).trim();
    }
}

export default AkunahEncryption;
