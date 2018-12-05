import { PathBuilder } from '../utils/path-builder'
import Constants from './constants'

// `module=account&action=txlist&address=${coin.address}&endblock=${block}&sort=desc`
const TransactionsByAddress = (apiToken, address, options) => {
    const {
        startblock,
        endblock,
        sort = 'desc'
    } = options

    const path = new PathBuilder()
        .base('api')
        .property('apikey', apiToken)
        .property('module', 'account')
        .property('action', 'txlist')
        .property('address', address)
        .property('startblock', startblock)
        .property('endblock', endblock)
        .property('sort', sort)
        .serialize()

    return path
}

// `module=account&action=tokentx&contractaddress=${coin.contractAddress}&address=${coin.address}&page=1&offset=100&sort=desc`
const TransactionsByContractAddress = (apiToken, address, contractAddress, options) => {
    const {
        startblock,
        endblock,
        page = 1,
        offset = 100,
        sort = 'desc'
    } = options

    const path = new PathBuilder()
        .base('api')
        .property('apikey', apiToken)
        .property('module', 'account')
        .property('action', 'tokentx')
        .property('contractaddress', contractAddress)
        .property('address', address)
        .property('page', page)
        .property('startblock', startblock)
        .property('endblock', endblock)
        .property('offset', offset)
        .property('sort', sort)
        .serialize()

    return path
}


const TransactionExplorer = () => {
    const baseTrailingQuestionMark = false

    const path = new PathBuilder('tx', baseTrailingQuestionMark)
        .serialize()

    return path
}

export default {
    TransactionsByAddress: (address, options) => TransactionsByAddress(Constants.ApiTokens.Etherscan, address, options),
    TransactionsByContractAddress: (address, contractAddress, options) => TransactionsByContractAddress(Constants.ApiTokens.Etherscan, address, contractAddress, options),
    TransactionExplorer
}