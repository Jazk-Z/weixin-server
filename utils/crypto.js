const crypto = require('crypto')
const constants = require('constants')
const fs = require('fs')
const path = require('path')
const initCrypto = async (type) => {
  const basePath = path.resolve(__dirname, '../')
  if (!fs.existsSync(path.join(basePath, 'private'))) {
    const keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'passphrase'
      }
    })
    console.log(keyPair.privateKey)
    fs.writeFileSync(path.join('private'), keyPair.privateKey)
    fs.writeFileSync(path.join('public'), keyPair.publicKey)
  }
  if (type === 'encrypt') return fs.readFileSync(path.join('public'), 'utf8')
  if (type === 'decrypt') return fs.readFileSync(path.join('private'), 'utf8')
}

const publicEncrypt = async (data) => {
  const publicKey = await initCrypto('encrypt')

  const encryptText = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: constants.RSA_PKCS1_PADDING
    },
    Buffer.from(data, 'utf8')
  )

  return encryptText.toString('hex')
}
const privateDecrypt = async (data) => {
  const privateKey = await initCrypto('decrypt')
  const decryptText = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: constants.RSA_PKCS1_PADDING,
      passphrase: 'passphrase'
    },
    Buffer.from(data, 'hex')
  )
  return decryptText.toString('utf8')
}
module.exports = {
  publicEncrypt,
  privateDecrypt
}
