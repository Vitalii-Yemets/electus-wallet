import { PathBuilder } from '../utils/path-builder'

export const Balance = options => {
    const { address } = options

    if (!address) {
        throw new Error('Ivalid address.')
    }

    const path = new PathBuilder()
        .base('balance')
        .property('active', address)
        .property('cors', 'true')
        .serialize()

    return path
}

export const UnspentOutputs = options => {
    const { address, limit = 250, confirmations = 0 } = options

    if (!address) {
        throw new Error('Ivalid address.')
    }

    const path = new PathBuilder()
        .base('unspent')
        .property('active', address)
        .property('cors', 'true')
        .property('limit', limit)
        .property('confirmations', confirmations)
        .serialize()

    return path
}

export const Fees = () => {
    const path = new PathBuilder()
        .base('api/v1/fees/recommended')
        .serialize()

    return path
}

export const Transactions = options => {
    const { address, limit = 50, offset } = options

    if (!address) {
        throw new Error('Ivalid address.')
    }

    const path = new PathBuilder()
        .base(`rawaddr/${address}`)
        .property('limit', limit)
        .property('offset', offset)
        // .property('cors', 'true')
        .serialize()

    return path
}

export const TransactionExplorer = () => {
    const baseTrailingQuestionMark = false

    const path = new PathBuilder('tx', baseTrailingQuestionMark)
        .serialize()

    return path
}

export const Broadcast = () => {
    const path = new PathBuilder()
        .base('pushtx')
        .serialize()

    return path
}