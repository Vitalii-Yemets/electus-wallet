import {
	SHOW_TRANSACTION_LIST,
	HIDE_TRANSACTION_LIST,
	SHOW_SEND,
	HIDE_SEND,
	SEND_TRANSACTION,
	SEND_TRANSACTION_SUCCESS,
	SEND_TRANSACTION_ERROR,
	SHOW_RECEIVE,
	HIDE_RECEIVE,
	DISABLED_SEND_INPUT,
	UN_DISABLED_SEND_INPUT,
	OPEN_GENERATE_QR_CODE_MODAL,
	CLOSE_GENERATE_QR_CODE_MODAL,
	CLOSE_SEND_TRANSACTION_SUCCESS_INFO_MODAL,
	CLOSE_SEND_TRANSACTION_ERROR_INFO_MODAL
} from './constants'

const coinDetailsReducer = (state = null, action) => {
	switch (action.type) {
		case SHOW_TRANSACTION_LIST: {
			const isShowTransactionList = true
			const isShowSend = false
			const isShowReceive = false

			return {
				...state,
				isShowTransactionList,
				isShowSend,
				isShowReceive
			}
		}

		case HIDE_TRANSACTION_LIST: {
			const isShowTransactionList = false

			return {
				...state,
				isShowTransactionList
			}
		}

		case SHOW_SEND: {
			const isShowSend = true
			const isShowTransactionList = false
			const isShowReceive = false

			return {
				...state,
				isShowSend,
				isShowTransactionList,
				isShowReceive
			}
		}

		case HIDE_SEND: {
			const isShowSend = false
			const isShowTransactionList = true
			const isShowReceive = false

			return {
				...state,
				isShowSend,
				isShowTransactionList,
				isShowReceive
			}
		}

		case SHOW_RECEIVE: {
			const isShowReceive = true
			const isShowSend = false
			const isShowTransactionList = false

			return {
				...state,
				isShowReceive,
				isShowSend,
				isShowTransactionList
			}
		}

		case HIDE_RECEIVE: {
			const isShowReceive = false
			const isShowTransactionList = true
			const isShowSend = false

			return {
				...state,
				isShowReceive,
				isShowTransactionList,
				isShowSend
			}
		}

		case SEND_TRANSACTION: {
			const isShowSpinnerSend = true
			return {
				...state,
				isShowSpinnerSend
			}
		}

		case SEND_TRANSACTION_SUCCESS: {
			const isShowSpinnerSend = false
			const sendTransactionSuccessInfo = action.sendTransactionSuccessInfo
			const isShowSend = false
			const isShowSendTransactionSuccessInfoModal = true

			return {
				...state,
				sendTransactionSuccessInfo,
				isShowSend,
				isShowSendTransactionSuccessInfoModal,
				isShowSpinnerSend
			}
		}

		case SEND_TRANSACTION_ERROR: {
			const isShowSpinnerSend = false
			const sendTransactionErrorInfo = action.sendTransactionErrorInfo
			const isShowSend = false
			const isShowSendTransactionErrorInfoModal = true

			return {
				...state,
				sendTransactionErrorInfo,
				isShowSend,
				isShowSendTransactionErrorInfoModal,
				isShowSpinnerSend
			}
		}


		case CLOSE_SEND_TRANSACTION_SUCCESS_INFO_MODAL: {
			const isShowSendTransactionSuccessInfoModal = false

			return {
				...state,
				isShowSendTransactionSuccessInfoModal
			}
		}

		case CLOSE_SEND_TRANSACTION_ERROR_INFO_MODAL: {
			const isShowSendTransactionErrorInfoModal = false

			return {
				...state,
				isShowSendTransactionErrorInfoModal
			}
		}


		case DISABLED_SEND_INPUT: {
			const isDisabledSendInput = true

			return {
				...state,
				isDisabledSendInput
			}
		}

		case UN_DISABLED_SEND_INPUT: {
			const isDisabledSendInput = false

			return {
				...state,
				isDisabledSendInput
			}
		}

		case OPEN_GENERATE_QR_CODE_MODAL: {
			const isGenerateQRCodeModal = true

			return {
				...state,
				isGenerateQRCodeModal
			}
		}

		case CLOSE_GENERATE_QR_CODE_MODAL: {
			const isGenerateQRCodeModal = false

			return {
				...state,
				isGenerateQRCodeModal
			}
		}

		default: {
			return state
		}
	}
}

export default coinDetailsReducer