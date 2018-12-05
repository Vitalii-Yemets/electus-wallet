import { from as ObservableFrom } from 'rxjs'
import { switchMap } from 'rxjs/operators';
import Constants from './constants'
import * as Endpoints from './endpoints'
import { get, post } from '../utils/api'
import CoinType from '../utils/coin-type'

const getHost = network => {
    if (!network) {
        throw new Error('Invalid bitcoin network.')
    }

    switch (network.toUpperCase()) {
        case Constants.Networks.Mainnet: {
            return Constants.Hosts.BlockchainMainnet
        }

        case Constants.Networks.Testnet: {
            return Constants.Hosts.BlockchainTestnet
        }

        case Constants.Networks.Fees: {
            return Constants.Hosts.BitcoinFees
        }

        default: {
            throw new Error('Unknown bitcoin network.')
        }
    }
}

const getBalanceAsync = (address, { network, coinType }) => {
    if (coinType === CoinType.TOKEN) {
        throw new Error(`Bitcoin blokchain does't token support.`)
    }

    const endpoint = Endpoints.Balance({ address })

    const host = getHost(network)

    const balance$ = ObservableFrom(
        get({ host, endpoint })
            .then(response => response.json())
            .then(data => data[address].final_balance)
            .catch(error => error)
    )

    return balance$
}

const sendTransactionAsync = (proxy, options) => {
    const {
        network,
        sendTransactionInfo
    } = options

    const address = sendTransactionInfo.Coin.Address

    const getUnspentOutputsOptions = {
        network,
        limit: 50
    }

    const getUnspentOutputs$ = getUnspentOutputsAsync(address, getUnspentOutputsOptions)

    return getUnspentOutputs$.pipe(
        switchMap(unspentOutputs => getFeesAsync().pipe(
            switchMap(fee => {
                const signedTransaction = sendTransactionInfo.Signer(fee, unspentOutputs, options)

                const endpoint = Endpoints.Broadcast()

                const host = getHost(network)

                const hostWithProxy = `${proxy}/${host}`

                const formData = new FormData()

                formData.append('tx', signedTransaction);

                return ObservableFrom(
                    post({
                        host: hostWithProxy,
                        endpoint,
                        body: formData
                    }).then(response => response)
                )
            })
        ))
    )
}

const getUnspentOutputsAsync = (address, { network, limit, confirmations }) => {
    const endpoint = Endpoints.UnspentOutputs({ address, limit, confirmations })

    const host = getHost(network)

    const unspentOutputs$ = ObservableFrom(
        get({ host, endpoint })
            .then(response => response.json())
            .catch(error => error)
    )

    return unspentOutputs$
}

const getFeesAsync = () => {
    const endpoint = Endpoints.Fees()

    const host = getHost(Constants.Networks.Fees)

    const fees$ = ObservableFrom(
        get({ host, endpoint })
            .then(response => response.json())
            .then(feeInfo => feeInfo[Constants.TransactionSpeed.fastestFee])
    )

    return fees$
}

const _getTransactionsAsync = (proxy, coin, { network, limit, offset }) => {
    const address = coin.address

    const endpoint = Endpoints.Transactions({ address, limit, offset })

    const host = getHost(network)

    const hostWithProxy = `${proxy}/${host}`

    const explorerWithBase = `${host}${Endpoints.TransactionExplorer()}`

    const transactions$ = ObservableFrom(
        get({
            host: hostWithProxy,
            endpoint
        })
            .then(response => response.json())
            .then(data => {
                const transactions = data['txs']

                const transactionsWithExplorer = transactions.map(transaction => {
                    const { hash } = transaction

                    const explorer = `${explorerWithBase}/${hash}`

                    return {
                        ...transaction,
                        explorer
                    }
                })

                return transactionsWithExplorer
            })
            .catch(error => error)
    )

    return transactions$
}

export default {
    getBalanceAsync,
    sendTransactionAsync: options => sendTransactionAsync(Constants.Proxy, options),
    getTransactionsAsync: (coin, { network, limit, offset }) => _getTransactionsAsync(Constants.Proxy, coin, { network, limit, offset })
}

