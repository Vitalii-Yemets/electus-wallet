import { BigNumber } from 'bignumber.js'
import moment from 'moment'
import TransactionType from './transaction-type'

export class Transaction {
    constructor(rawTransaction) {
        this.rawTransaction = rawTransaction
    }

    Date() {
        let unixTime

        if (this.rawTransaction.timeStamp) {
            unixTime = this.rawTransaction.timeStamp
        } else if (this.rawTransaction.time) {
            unixTime = this.rawTransaction.time
        } else {
            return 'not received Date'
        }

        return moment
            .unix(unixTime)
            .locale('ru')
            .format('LTS L')
    }

    TimeStamp() {
        if (this.rawTransaction.timeStamp) {
            return this.rawTransaction.timeStamp
        } else if (this.rawTransaction.time) {
            return this.rawTransaction.time
        } else {
            return 'not received timeStamp'
        }
    }

    Hash() {
        if (this.rawTransaction.hash) {
            return this.rawTransaction.hash
        } else {
            return 'not received hash'
        }
    }

    Value(address, coinDecimals) {
        if (!address) {
            return -1
        }

        const normalizeAmount = (amnt, dcmls) => {
            const amountInString = (amnt / Math.pow(10, dcmls)).toString()

            return new BigNumber(amountInString).toFormat()
        }

        if (this.rawTransaction.value) {
            return normalizeAmount(this.rawTransaction.value, coinDecimals)
        } else {

            const inputs = this.rawTransaction.inputs

            let amount

            const isSendTransactionType = inputs.filter(input => address === input.prev_out.addr).length > 0

            const outs = this.rawTransaction.out

            if (isSendTransactionType) {
                amount = outs
                    .filter(out => address !== out.addr)
                    .reduce((amnt, out) => (amnt + out.value), 0)
            } else {
                amount = outs
                    .filter(out => address === out.addr)
                    .reduce((amnt, out) => (amnt + out.value), 0)
            }

            return normalizeAmount(amount, coinDecimals)
        }
    }

    Type(address) {
        if (!address) {
            return TransactionType.INVALID_ADDRESS
        }

        if (!(this.rawTransaction.from || this.rawTransaction.inputs)) {
            return TransactionType.UNKNOWN
        }

        if (address === this.rawTransaction.from) {
            return TransactionType.SENDED
        } else if (this.rawTransaction.inputs) {
            const inputs = this.rawTransaction.inputs

            const sendedInputs = inputs.filter(input => address === input.prev_out.addr)

            if (sendedInputs.length > 0) {
                return TransactionType.SENDED
            }
        }

        return TransactionType.RECEIVED
    }

    Explorer() {
        return this.rawTransaction.explorer
    }
}