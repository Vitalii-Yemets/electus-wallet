import { from as ObservableFrom } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import Constants from './constants'
import CoinType from '../utils/coin-type'
import { get } from '../utils/api'
import Endpoints from './etherscan.endpoints'
import InfuraProvider from './Infura.provider'

const getHost = network => {
    if (!network) {
        throw new Error('Invalid etherscan network.')
    }

    switch (network.toUpperCase()) {
        case Constants.Networks.Etherscan.Mainnet: {
            return Constants.Hosts.Etherscan.Mainnet
        }

        case Constants.Networks.Etherscan.Testnet: {
            return Constants.Hosts.Etherscan.Testnet
        }

        default: {
            throw new Error('Unknown etherscan network.')
        }
    }
}

const getTransactionHostExplorer = network => {
    if (!network) {
        throw new Error('Invalid etherscan network.')
    }

    switch (network.toUpperCase()) {
        case Constants.Networks.Etherscan.Mainnet: {
            return Constants.Explorer.Mainnet
        }

        case Constants.Networks.Etherscan.Testnet: {
            return Constants.Explorer.Testnet
        }

        default: {
            throw new Error('Unknown etherscan network.')
        }
    }
}

const getTransactionsAsync = (coin, { network }) => InfuraProvider.getBlockNumberAsync({ network }).pipe(
    switchMap(block => {
        const host = getHost(network)

        const options = {
            endblock: block
        }

        const explorerHost = getTransactionHostExplorer(network)

        const explorerWithBase = `${explorerHost}${Endpoints.TransactionExplorer()}`

        const endpoint = coin.type.toUpperCase() === CoinType.COIN
            ? Endpoints.TransactionsByAddress(coin.Address, options)
            : Endpoints.TransactionsByContractAddress(coin.Address, coin.contractAddress, options)

        return ObservableFrom(
            get({ host, endpoint })
                .then(response => response.json())
                .then(response => {
                    const transactions = [...response['result']]

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
        )
    })
)

export default {
    getTransactionsAsync,
    getTransactionHostExplorer
}