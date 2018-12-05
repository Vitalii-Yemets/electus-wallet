export default {
    Bitcoin: {
        Decimals: 8,
        Satoshis: 100000000,
    },
    Networks: {
        Mainnet: 'BITCOIN',
        Testnet: 'TESTNET',
        Fees: 'FEES'
    },
    Transactions: {
        AverageBytes: 255
    },
    Proxy: 'https://cors-anywhere.herokuapp.com', // no cors any more
    Hosts: {
        BitcoinFees: 'https://bitcoinfees.earn.com',
        BlockchainMainnet: 'https://blockchain.info',
        BlockchainTestnet: 'https://testnet.blockchain.info'
    },
    TransactionSpeed: {
        fastestFee: 'fastestFee',
        halfHourFee: 'halfHourFee',
        hourFee: 'hourFee'
    }
}