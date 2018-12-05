import { keystore } from 'eth-lightwallet'
import crypto, { createHash } from 'crypto'
import { Observable } from 'rxjs'
import EthereumTx from 'ethereumjs-tx'
import Constants from './constants'

const sourceCreateHash = createHash
crypto.createHash = algo => sourceCreateHash(algo === 'ripemd160' ? 'rmd160' : algo)

const generateRandomSeedAsync = () => Observable.create(observer => {
    try {
        const seed = keystore.generateRandomSeed()

        observer.next(seed)

        observer.complete()
    } catch (error) {
        observer.error(error)
    }
})

const generatePrivateKeyAsync = (hdPathString, options) => Observable.create(observer => {
    const {
        seed: seedPhrase,
    } = options

    const password = 'abc123'

    keystore.createVault({
        seedPhrase,
        password,
        hdPathString
    }, (keystoreError, ks) => {
        if (keystoreError) {
            observer.error(keystoreError)
        }

        ks.keyFromPassword(password, (pwDerivedKeyError, pwDerivedKey) => {
            if (pwDerivedKeyError) {
                observer.error(pwDerivedKeyError)
            }

            if (!ks.isDerivedKeyCorrect(pwDerivedKey)) {
                observer.error("Incorrect derived key!")
            }

            try {
                ks.generateNewAddress(pwDerivedKey, 1)

                const address = ks.getAddresses()[0]

                const privateKey = ks.exportPrivateKey(address, pwDerivedKey)

                const result = {
                    address,
                    key: privateKey
                }

                observer.next(result)

                observer.complete()
            } catch (error) {
                observer.error(error)
            }
        })
    })
})

const signTransaction = (key, rawTransaction) => {
    const privateKey = Buffer.from(key, 'hex')

    const ethereumTx = new EthereumTx(rawTransaction)

    ethereumTx.sign(privateKey)

    return `0x${ethereumTx.serialize().toString('hex')}`
}

export default {
    generateRandomSeedAsync,
    signTransaction,
    generatePrivateKeyAsync: options => generatePrivateKeyAsync(Constants.HdPathString, options),
}
