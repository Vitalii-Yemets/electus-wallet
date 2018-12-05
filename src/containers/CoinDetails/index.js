import React from 'react'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { interval } from 'rxjs'
import { first } from '../../utils/common'
import TransactionList from '../../components/TransactionList'
import Send from '../../components/Send'
import Receive from '../../components/Receive'
import Spinner from '../../components/Spinner'

import { DownloadIco } from '../../assets/svg'

import SendTransactionSuccessInfoModal from '../../components/SendTransactionSuccessInfoModal'
import SendTransactionErrorInfoModal from '../../components/SendTransactionErrorInfoModal'
import { generateFileName } from '../../utils/common'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from 'mdbreact'
import {
	showTransactionList,
	showSend,
	sendTransaction,
	showReceive,
	hideReceive,
	hideSend,
	disabledSendInput,
	unDisabledSendInput,
	openGenerateQRCodeModal,
	closeGenerateQRCodeModal,
	closeSendTransactionSuccessInfoModal,
	closeSendTransactionErrorInfoModal
} from './actions'
import './CoinDetails.css'

const CoinDetails = ({
	selectedCoin,
	transactionsBySelectedCoin,
	onShowSend,
	isShowTransactionList,
	isShowSend,
	onSendMessage,
	onShowReceive,
	isShowReceive,
	onHideSend,
	onHideReceive,
	isDisabledSendInput,
	onDisabledSendInput,
	onUnDisabledSendInput,
	onCloseGenerateQRCodeModal,
	onOpenGenerateQRCodeModal,
	onGetLineChartData,
	isGenerateQRCodeModal,
	onShowCoinSelectorOnMobile,
	isShowCoinSelector,
	isShowSpinnerChart,
	dataChart,
	isShowSpinner,
	isShowSendTransactionSuccessInfoModal,
	isShowSendTransactionErrorInfoModal,
	onCloseSendTransactionSuccessInfoModal,
	onCloseSendTransactionErrorInfoModal,
	sendTransactionSuccessInfo,
	sendTransactionErrorInfo,
	wallets,
	// isShowSpinnerSend
}) => {
	let w = window.innerWidth
	if (isShowCoinSelector && w < 576) {
		return null
	}

	const sendTransactionSuccessInfoProps = {
		isShowSendTransactionSuccessInfoModal,
		onCloseSendTransactionSuccessInfoModal,
		sendTransactionSuccessInfo
	}

	const sendTransactionErrorInfoProps = {
		isShowSendTransactionErrorInfoModal,
		onCloseSendTransactionErrorInfoModal,
		sendTransactionErrorInfo
	}

	const transactionListProps = {
		onGetLineChartData,
		selectedCoin,
		transactionsBySelectedCoin,
		isShowTransactionList,
		isShowSpinnerChart,
		dataChart
	}

	const sendProps = {
		isShowSend,
		onSendMessage,
		selectedCoin,
		onHideSend,
		isDisabledSendInput,
		onDisabledSendInput,
		onUnDisabledSendInput
	}

	const receiveProps = {
		isShowReceive,
		selectedCoin,
		onHideReceive,
		onCloseGenerateQRCodeModal,
		onOpenGenerateQRCodeModal,
		isGenerateQRCodeModal
	}

	const spinnerProps = {
		isShowSpinner,
		// isShowSpinner: isShowSpinnerSend
	}

	const downloadWallet = walletToSave => {
		const keyIntoJson = JSON.stringify(walletToSave)

		const anchor = document.createElement('a')

		anchor.download = `${generateFileName(walletToSave.Address)}.json`

		anchor.href = window.URL.createObjectURL(new Blob([keyIntoJson], { type: 'text/json' }))

		anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':')

		anchor.click()
	}

	const Ico = selectedCoin.ico

	const course = selectedCoin.Course ? selectedCoin.Course : 0

	const onDownload = () => {
		const address = selectedCoin.Address

		const walletToSave = first(wallets.filter(wallet => wallet.Address === address))

		downloadWallet(walletToSave)
	}

	return (
		<div className='coin-details'>
			<Spinner {...spinnerProps} />
			<SendTransactionSuccessInfoModal {...sendTransactionSuccessInfoProps} />
			<SendTransactionErrorInfoModal {...sendTransactionErrorInfoProps} />
			<div className='head-coin-details'>
				<div className='row'>
					<Button className='btn-back-en-close mobile-coin-click mobile-coin-click-btn' onClick={onShowCoinSelectorOnMobile}>X</Button>
					<div className="col-5">
						<div className='row'>
							<div className="col-4">
								<div className="ico-details">
									<Ico />
								</div>
							</div>
							<div className="col-8">
								<div className='coin-details-name-blockchain'>
									{selectedCoin.name}
								</div>
								<div className='coin-details-balance'>
									{course}
								</div>
								<div className='download-wallet-ico' onClick={onDownload}>
									<DownloadIco />
								</div>
							</div>
						</div>
					</div>
					<div className="col-7">
						<div className="float-r">
							<div className="adress-wallet">
								<label>{selectedCoin.address}</label>
							</div>
							<CopyToClipboard text={selectedCoin.address}>
								<Button className="btn-copy-adress">copy</Button>
							</CopyToClipboard>
						</div>
						<div className="t-c">
							<label className='pub-adress'>Public Address</label>
						</div>
					</div>
				</div>


				<div className="flex block-detail-balans">
					<div className='coin-details-balance'>
						{`${selectedCoin.balance / Math.pow(10, selectedCoin.decimals)}`}
					</div>

					<div className='coin-details-name-simbol'>
						{`${selectedCoin.symbol.toUpperCase()}`}
					</div>
				</div>
				<div className='row'>
					<div className="col-6">
						<div className="t-r">
							<Button className='coin-details-send coin-details-btn'
								onClick={onShowSend}>
								send
							</Button>
						</div>
					</div>
					<div className="col-6">
						<div className="t-l">
							<Button className='coin-details-recive coin-details-btn'
								onClick={onShowReceive}>
								receive
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className='footer-coin-details'>
				<div className='container border-top-details p-0 mt-3'>
					<TransactionList {...transactionListProps} />
					<Send {...sendProps} />
					<Receive {...receiveProps} />
				</div>
			</div>
		</div>
	)
}

const coinDetailsWithLifecycle = lifecycle({
	componentDidMount() {
		const { onCheckCoinsBalance } = this.props
		interval(25000).subscribe(onCheckCoinsBalance)
	}
})(CoinDetails)

const mapStateToProps = state => ({
	selectedCoin: state.walletsState.selectedCoin,
	transactionsBySelectedCoin: state.walletsState.transactionsBySelectedCoin,
	isShowTransactionList: state.coinDetailsState.isShowTransactionList,
	isShowSend: state.coinDetailsState.isShowSend,
	isShowReceive: state.coinDetailsState.isShowReceive,
	isDisabledSendInput: state.coinDetailsState.isDisabledSendInput,
	isGenerateQRCodeModal: state.coinDetailsState.isGenerateQRCodeModal,
	isShowSendTransactionSuccessInfoModal: state.coinDetailsState.isShowSendTransactionSuccessInfoModal,
	isShowSendTransactionErrorInfoModal: state.coinDetailsState.isShowSendTransactionErrorInfoModal,
	sendTransactionSuccessInfo: state.coinDetailsState.sendTransactionSuccessInfo,
	sendTransactionErrorInfo: state.coinDetailsState.sendTransactionErrorInfo,
	wallets: state.walletsState.wallets,
	isShowSpinnerSend: state.coinDetailsState.isShowSpinnerSend
})

const mapDispatchToProps = dispatch => ({
	onShowTransactionList: () => dispatch(showTransactionList()),
	onShowSend: () => dispatch(showSend()),
	onShowReceive: () => dispatch(showReceive()),
	onSendMessage: messageDetails => dispatch(sendTransaction(messageDetails)),
	onHideSend: () => dispatch(hideSend()),
	onHideReceive: () => dispatch(hideReceive()),
	onDisabledSendInput: () => dispatch(disabledSendInput()),
	onUnDisabledSendInput: () => dispatch(unDisabledSendInput()),
	onCloseGenerateQRCodeModal: () => dispatch(closeGenerateQRCodeModal()),
	onOpenGenerateQRCodeModal: () => dispatch(openGenerateQRCodeModal()),
	onCloseSendTransactionSuccessInfoModal: () => dispatch(closeSendTransactionSuccessInfoModal()),
	onCloseSendTransactionErrorInfoModal: () => dispatch(closeSendTransactionErrorInfoModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(coinDetailsWithLifecycle)
