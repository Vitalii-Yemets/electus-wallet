import BlockchainInfoProvider from './provider'

const getBalanceAsync = BlockchainInfoProvider.getBalanceAsync

const getTransactionsAsync = BlockchainInfoProvider.getTransactionsAsync

const sendTransactionAsync = BlockchainInfoProvider.sendTransactionAsync

export {
    getBalanceAsync,
    getTransactionsAsync,
    sendTransactionAsync
}