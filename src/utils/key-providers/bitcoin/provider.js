import { Observable } from 'rxjs'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import bitcoin from 'bitcoinjs-lib'
import Constants from './constants'

const generateRandomSeedAsync = () => Observable.create(observer => {
    try {
        const seed = generateMnemonic()

        observer.next(seed)

        observer.complete()
    } catch (error) {
        observer.error(error)
    }
})

const getBitcoinNetwork = network => {
    switch (network.toUpperCase()) {
        case Constants.Network.Testnet: {
            return bitcoin.networks.testnet
        }

        case Constants.Network.Mainnet: {
            return bitcoin.networks.bitcoin
        }

        default: {
            throw new Error('Unknown bitcoin network.')
        }
    }
}

const generatePrivateKeyAsync = (hdPathString, options) => Observable.create(observer => {
    const {
        seed: mnemonic,
        // password,
        network
    } = options

    try {
        const bitcoinNetwork = getBitcoinNetwork(network)

        const seed = mnemonicToSeed(mnemonic)

        const master = bitcoin.HDNode.fromSeedBuffer(seed, bitcoinNetwork)

        const derived = master.derivePath(hdPathString)

        const address = derived.getAddress()

        const wif = derived.keyPair.toWIF()

        const result = {
            address,
            key: wif
        }

        observer.next(result)

        observer.complete()

    } catch (error) {
        observer.error(error)
    }
})

const signTransaction = (fee, utxos, options) => {
    const {
        network,
        sendTransactionInfo
    } = options

    const satoshis = Math.round(sendTransactionInfo.Amount * Constants.Satoshis)

    const bitcoinNetwork = getBitcoinNetwork(network)

    const txb = new bitcoin.TransactionBuilder(bitcoinNetwork)

    let current = 0

    for (const utx of utxos.unspent_outputs) {

        txb.addInput(utx.tx_hash_big_endian, utx.tx_output_n)

        current += utx.value

        if (current >= (satoshis + fee)) {
            break
        }
    }

    txb.addOutput(sendTransactionInfo.To, satoshis)

    const change = current - (satoshis + (fee * Constants.AverageBytes))

    if (change) {
        txb.addOutput(sendTransactionInfo.Coin.address, change)
    }

    const privateKey = bitcoin.ECPair.fromWIF(sendTransactionInfo.PrivateKey, bitcoinNetwork)

    txb.sign(0, privateKey)

    const rawTransaction = txb
        .build()
        .toHex()

    return rawTransaction
}

export default {
    generateRandomSeedAsync: generateRandomSeedAsync,
    signTransaction,
    generatePrivateKeyAsync: options => generatePrivateKeyAsync(Constants.HdPathString, options),
}
