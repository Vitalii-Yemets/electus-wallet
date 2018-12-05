import EtherscanProvider from './etherscan.provider'
import InfuraProvider from './Infura.provider'

const getTransactionsAsync = EtherscanProvider.getTransactionsAsync

const getBalanceAsync = InfuraProvider.getBalanceAsync

const getBlockNumberAsync = InfuraProvider.getBlockNumberAsync

const sendTransactionAsync = InfuraProvider.sendTransactionAsync

export {
    getTransactionsAsync,
    getBalanceAsync,
    getBlockNumberAsync,
    sendTransactionAsync
}