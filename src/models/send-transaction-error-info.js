export class SendTransactionErrorInfo {
    constructor({ message }) {
        this.message = message
    }

    get Message() {
        return this.message
    }
}