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

export const showTransactionList = () => ({
	type: SHOW_TRANSACTION_LIST
})

export const hideTransactionList = () => ({
	type: HIDE_TRANSACTION_LIST
})

export const showSend = () => ({
	type: SHOW_SEND
})

export const hideSend = () => ({
	type: HIDE_SEND
})

export const showReceive = () => ({
	type: SHOW_RECEIVE
})

export const hideReceive = () => ({
	type: HIDE_RECEIVE
})

export const sendTransaction = sendInfo => ({
	type: SEND_TRANSACTION,
	sendInfo
})

export const sendTransactionSuccess = sendTransactionSuccessInfo => ({
	type: SEND_TRANSACTION_SUCCESS,
	sendTransactionSuccessInfo
})

export const sendTransactionError = sendTransactionErrorInfo => ({
	type: SEND_TRANSACTION_ERROR,
	sendTransactionErrorInfo
})


export const closeSendTransactionSuccessInfoModal = () => ({
	type: CLOSE_SEND_TRANSACTION_SUCCESS_INFO_MODAL
})

export const closeSendTransactionErrorInfoModal = () => ({
	type: CLOSE_SEND_TRANSACTION_ERROR_INFO_MODAL
})


export const disabledSendInput = () => ({
	type: DISABLED_SEND_INPUT
})

export const unDisabledSendInput = () => ({
	type: UN_DISABLED_SEND_INPUT
})

export const openGenerateQRCodeModal = () => ({
	type: OPEN_GENERATE_QR_CODE_MODAL
})

export const closeGenerateQRCodeModal = () => ({
	type: CLOSE_GENERATE_QR_CODE_MODAL
})

