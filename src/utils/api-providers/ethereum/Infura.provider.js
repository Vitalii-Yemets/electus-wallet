import Web3 from 'web3'
import { Observable, from as ObservableFrom } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import Constants from './constants'
import * as Endpoints from './infura.endpoints'
import { toHex } from '../utils/common'
import CoinType from '../utils/coin-type'
import erc20abi from '../utils/erc20abi'

const web3 = new Web3()

const getHost = network => {
    if (!network) {
        throw new Error('Invalid infura network.')
    }

    switch (network.toUpperCase()) {
        case Constants.Networks.Infura.Mainnet: {
            return Constants.Hosts.Infura.Mainnet
        }

        case Constants.Networks.Infura.Testnet: {
            return Constants.Hosts.Infura.Testnet
        }

        default: {
            throw new Error('Unknown infura network.')
        }
    }
}

const _getCoinBalanceAsync = (web3, address) => {
    if (!address) {
        throw new Error('Invalid address.')
    }

    return ObservableFrom(web3.eth.getBalance(address))
}

const _getTokenBalanceAsync = (web3, erc20abi, address, contractAddress) => {
    if (!address) {
        throw new Error('Invalid address.')
    }

    if (!contractAddress) {
        throw new Error('Invalid smart contract address.')
    }

    const contract = new web3.eth.Contract(erc20abi, contractAddress)

    return ObservableFrom(contract.methods.balanceOf(address).call())
}

const getBalanceAsync = (web3, erc20abi, address, { network, coinType, contractAddress }) => {
    if (!address) {
        throw new Error(`Invalid ethereum address.`)
    }

    if (!coinType) {
        throw new Error(`Unknown coin type.`)
    }

    const path = Endpoints.InfuraRpc()

    const host = getHost(network)

    web3.setProvider(`${host}${path}`)

    const balance$ = coinType === CoinType.COIN
        ? _getCoinBalanceAsync(web3, address)
        : _getTokenBalanceAsync(web3, erc20abi, address, contractAddress)

    return balance$
}

const _getCountAsync = (web3, from, { network }) => {
    if (!from) {
        throw new Error('Invalid from argument.')
    }

    const host = getHost(network)

    web3.setProvider(host)

    return Observable.create(observer => web3.eth.getTransactionCount(from)
        .then(count => {
            observer.next(count)
            observer.complete()
        })
    )
}

const _getGasPriceAsync = (web3, { network }) => {
    const host = getHost(network)

    web3.setProvider(host)

    return Observable.create(observer => web3.eth.getGasPrice()
        .then(gasPrice => {
            observer.next(gasPrice)
            observer.complete()
        })
    )
}

const getBlockNumberAsync = (web3, { network }) => {
    const host = getHost(network)

    web3.setProvider(host)

    return Observable.create(observer => {
        web3.eth.getBlockNumber()
            .then(block => {
                observer.next(block)
                observer.complete()
            })
    })
}

const sendTransactionAsync = (web3, options) => {
    const typeCoinToSend = options.sendTransactionInfo.Coin.Type

    switch (typeCoinToSend) {
        case CoinType.COIN: {
            return _sendCoinAsync(web3, options)
        }

        case CoinType.TOKEN: {
            return _sendTokenAsync(web3, options)
        }

        default: {
            return null
        }
    }
}

const _sendCoinAsync = (web3, options) => {
    const {
        network,
        sendTransactionInfo
    } = options

    return _getGasPriceAsync(web3, { network }).pipe(
        switchMap(gasPrice => _getCountAsync(web3, sendTransactionInfo.Coin.Address, { network }).pipe(
            map(count => ({ gasPrice, count }))
        )),
        map(({ gasPrice, count }) => {
            const rawTransaction = {
                from: sendTransactionInfo.Coin.Address,
                to: sendTransactionInfo.To,
                nonce: toHex(count),
                gasPrice: toHex(gasPrice),
                gasLimit: toHex(Constants.Fees.maxGasForEthSend),  // TODO: need to remove hardcode
                value: toHex((sendTransactionInfo.Amount * Math.pow(10, sendTransactionInfo.Coin.Decimals))).toString(),
                data: ''
            }

            const signedTransaction = sendTransactionInfo.signer(sendTransactionInfo.PrivateKey, rawTransaction)

            return signedTransaction
        }),
        switchMap(signedRawTransaction => _sendSignedTransactionAsync(web3, signedRawTransaction, { network })),
    )
}

const _sendTokenAsync = (web3, options) => {
    const {
        network,
        sendTransactionInfo
    } = options

    return _getGasPriceAsync(web3, { network }).pipe(
        switchMap(gasPrice => _getCountAsync(web3, sendTransactionInfo.Coin.Address, { network }).pipe(
            map(count => ({ gasPrice, count }))
        )),
        map(({ gasPrice, count }) => {
            const normalizeAmount = (sendTransactionInfo.Amount * Math.pow(10, sendTransactionInfo.Coin.decimals)).toString()

            const contract = new web3.eth.Contract(erc20abi, sendTransactionInfo.Coin.ContractAddress)

            const data = contract.methods.transfer(sendTransactionInfo.To, normalizeAmount).encodeABI()

            const rawTransaction = {
                from: sendTransactionInfo.Coin.Address,
                to: sendTransactionInfo.Coin.ContractAddress,
                nonce: toHex(count),
                gasPrice: toHex(gasPrice),
                gas: toHex(Constants.Fees.maxGasForTokenSend), // TODO: need to remove hardcode
                value: toHex('0'),
                data
            }

            const signedTransaction = sendTransactionInfo.signer(sendTransactionInfo.PrivateKey, rawTransaction)

            return signedTransaction
        }),
        switchMap(signedRawTransaction => _sendSignedTransactionAsync(web3, signedRawTransaction, { network })),
    )
}

const _sendSignedTransactionAsync = (web3, signedRawTransaction, { network }) => {
    if (!signedRawTransaction) {
        throw new Error('Invalid signedRawTransaction argument.')
    }

    const host = getHost(network)

    web3.setProvider(host)

    return Observable.create(
        observer => web3.eth.sendSignedTransaction(signedRawTransaction)
            .then(response => {
                observer.next(response)
                observer.complete()
            })
    )
}

export default {
    getBalanceAsync: (address, options) => getBalanceAsync(web3, erc20abi, address, options),
    getBlockNumberAsync: options => getBlockNumberAsync(web3, options),
    sendTransactionAsync: sendTransactionInfo => sendTransactionAsync(web3, sendTransactionInfo)
}