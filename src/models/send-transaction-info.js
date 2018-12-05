export class SendTransactionInfo {
    constructor(rawTransactionIfo) {
        this.to = rawTransactionIfo.to
        this.amount = rawTransactionIfo.amount
        this.coin = rawTransactionIfo.coin
        this.privateKey = rawTransactionIfo.privateKey
        this.signer = rawTransactionIfo.signer
    }

    get To() {
        return this.to
    }

    get Amount() {
        return this.amount
    }

    get Coin() {
        return this.coin
    }

    get PrivateKey() {
        return this.privateKey
    }

    get Signer() {
        return this.signer
    }
}