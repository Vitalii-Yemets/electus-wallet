import React from 'react'
import { connect } from 'react-redux'
import {
	generateWalletNew,
	generateWalletCancelNew,
	selectBlokchainNew,
	coinCheckedNew,
	goToGenerateSeedStepNew,
	generateSeedNew,
	generatePrivateKey,
	generateWalletCompleted,
	getLineChartData,

	showCoinDetails,
	uploadWallets,
	closeWalletsUploadWarningModal,
	showCoinSelectorOnMobile,
	closeCoinSelectorOnMobile,
	checkCoinsBalance,

	openDefaultWalletViewModal,
	closeDefaultWalletViewModal
} from './actions'
import CoinDetails from '../CoinDetails'
import CoinSelector from '../../components/CoinSelector'
import GenerateWalletModal from '../../components/GenerateWalletModal'
import DefaultWalletViewModal from '../../components/DefaultWalletViewModal'

import WalletsUploadWarningModal from '../../components/WalletsUploadWarningModal'
import { WalletsUploader, WalletsUploaderID } from '../../components/WalletsUploader'
import Spinner from '../../components/Spinner'
import './Wallets.css'

const Wallets = ({
	onGenerateWallet,
	onGenerateWalletCancel,
	onSelectBlokchain,
	onCheckedCoin,
	onGoToGenerateSeedStep,
	onGenerateSeed,
	onGeneratePrivateKey,
	onGenerateWalletCompleted,
	onGetLineChartData,
	onCheckCoinsBalance,
	isDefaultWalletsView,
	isShowGenerateWalletModal,
	isShowBlokchainChoseStep,
	isShowSeedGenerateStep,
	isShowWalletInfoStep,
	isShowWalletsUploadWarningModal,
	isShowCoinSelector,
	isShowSpinner,
	isShowSpinnerChart,
	availableBlockchains,
	selectedBlokchain,
	selectedCoin,
	coinChoseList,
	selectedCoinsFromCoinChoseList,
	seed,
	coinInfos,
	coins,
	walletInfo,
	warningInfo,
	dataChart,

	onShowCoinDetails,
	onWalletsUpload,
	onCloseWalletsUploadWarningModal,
	onShowCoinSelectorOnMobile,
	onCloseCoinSelectorOnMobile,

	onOpenDefaultWalletViewModal,
	onCloseDefaultWalletViewModal,
	isShowDefaultWalletViewModal

}) => {
	const generateWalletModalProps = {
		onGenerateWalletCancel,
		onSelectBlokchain,
		onCheckedCoin,
		onGoToGenerateSeedStep,
		onGenerateSeed,
		onGeneratePrivateKey,
		onGenerateWalletCompleted,
		isShowGenerateWalletModal,
		isShowBlokchainChoseStep,
		isShowSeedGenerateStep,
		isShowWalletInfoStep,
		coinChoseList,
		selectedBlokchain,
		seed,
		walletInfo,
		coinInfos,
		availableBlockchains,
		selectedCoinsFromCoinChoseList
	}

	const walletsUploadWarningModalProps = {
		warningInfo,
		isShowWalletsUploadWarningModal,
		onCloseWalletsUploadWarningModal,
	}

	const defaultWalletViewModalProps = {
		onCloseDefaultWalletViewModal,
		isShowDefaultWalletViewModal,
		onGenerateWallet,
		onWalletsUpload
	}

	const coinSelectorProps = {
		coins,
		onShowCoinDetails,
		// onGenerateWallet,
		onCheckCoinsBalance,
		selectedCoin,
		isShowCoinSelector,
		onCloseCoinSelectorOnMobile,
		onShowCoinSelectorOnMobile,
		onOpenDefaultWalletViewModal
	}

	const walletsUploaderProps = {
		onWalletsUpload
	}

	const coinDetailsProps = {
		onCheckCoinsBalance,
		onShowCoinSelectorOnMobile,
		onGetLineChartData,
		isShowCoinSelector,
		isShowSpinnerChart,
		dataChart
	}

	const spinnerProps = {
		isShowSpinner
	}

	return isDefaultWalletsView ?
		<div className='wallets-start-view'>

			<GenerateWalletModal {...generateWalletModalProps} />
			<WalletsUploadWarningModal {...walletsUploadWarningModalProps} />

			<div className="container-fluid">
				<div className="row">
					<div className='title-text-wallets-start-view'>
						Before start work with <br /> ELECTUS WALLET
      				</div>
					<div className="col-12 col-sm-5 col-md-5">
						<div className="t-c border-and-height" onClick={onGenerateWallet}>
							<div className="t-c center-margin">
								<div className="btn-create-upload ">+</div>
								<div className="name-btb-wallet">Create new wallet</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-2 col-md-2 d-none-block">
						<div className='or-text-wallets-start-view center-margin'>or</div>
					</div>
					<div className="col-12 col-sm-5 col-md-5">
						<WalletsUploader {...walletsUploaderProps} />
						<div className="t-c border-and-height" onClick={() => {
							const walletsUploader = document.getElementById(WalletsUploaderID)
							walletsUploader.click()
						}}>
							<div className="t-c center-margin">
								<div className="btn-create-upload ">+</div>
								<div className="name-btb-wallet">Upload your wallet</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		:
		<div className='wallets container-fluid'>
			<Spinner {...spinnerProps} />
			<DefaultWalletViewModal {...defaultWalletViewModalProps} />
			<GenerateWalletModal {...generateWalletModalProps} />
			<div className="row m-0">
				<div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 p-0">
					<CoinSelector {...coinSelectorProps} />
				</div>
				<div className="col-lg-9 col-md-8 col-sm-8 col-xs-12 p-0">
					<CoinDetails {...coinDetailsProps} />
				</div>
			</div>
		</div>
}

const matStateToProps = state => ({
	isDefaultWalletsView: state.walletsState.isDefaultWalletsView,
	isShowGenerateWalletModal: state.walletsState.isShowGenerateWalletModal,
	isShowBlokchainChoseStep: state.walletsState.isShowBlokchainChoseStep,
	isShowWalletInfoStep: state.walletsState.isShowWalletInfoStep,
	isShowWalletsUploadWarningModal: state.walletsState.isShowWalletsUploadWarningModal,
	isShowCoinSelector: state.walletsState.isShowCoinSelector,
	isShowSeedGenerateStep: state.walletsState.isShowSeedGenerateStep,
	isShowSpinner: state.walletsState.isShowSpinner,
	isShowSpinnerChart: state.walletsState.isShowSpinnerChart,
	selectedBlokchain: state.walletsState.selectedBlokchain,
	coinChoseList: state.walletsState.coinChoseList,
	selectedCoinsFromCoinChoseList: state.walletsState.selectedCoinsFromCoinChoseList,
	seed: state.walletsState.seed,
	coinInfos: state.walletsState.coinInfos,
	availableBlockchains: state.walletsState.availableBlockchains,
	walletInfo: state.walletsState.walletInfo,
	selectedCoin: state.walletsState.selectedCoin,
	coins: state.walletsState.coins,
	dataChart: state.walletsState.dataChart,

	warningInfo: state.walletsState.warningInfo,

	isShowDefaultWalletViewModal: state.walletsState.isShowDefaultWalletViewModal
})

const matDispatchToProps = dispatch => ({
	onGenerateWallet: () => dispatch(generateWalletNew()),
	onGenerateWalletCancel: () => dispatch(generateWalletCancelNew()),
	onSelectBlokchain: selectedBlokchain => dispatch(selectBlokchainNew(selectedBlokchain)),
	onCheckedCoin: coin => dispatch(coinCheckedNew(coin)),
	onGoToGenerateSeedStep: () => dispatch(goToGenerateSeedStepNew()),
	onGenerateSeed: () => dispatch(generateSeedNew()),
	onGeneratePrivateKey: () => dispatch(generatePrivateKey()),
	onGenerateWalletCompleted: () => dispatch(generateWalletCompleted()),
	onShowCoinDetails: coin => dispatch(showCoinDetails(coin)),
	onWalletsUpload: newWallets => dispatch(uploadWallets(newWallets)),
	onCloseWalletsUploadWarningModal: () => dispatch(closeWalletsUploadWarningModal()),
	onShowCoinSelectorOnMobile: () => dispatch(showCoinSelectorOnMobile()),
	onCloseCoinSelectorOnMobile: () => dispatch(closeCoinSelectorOnMobile()),
	onGetLineChartData: () => dispatch(getLineChartData()),
	onCheckCoinsBalance: () => dispatch(checkCoinsBalance()),
	onCloseDefaultWalletViewModal: () => dispatch(closeDefaultWalletViewModal()),
	onOpenDefaultWalletViewModal: () => dispatch(openDefaultWalletViewModal())
})

export default connect(matStateToProps, matDispatchToProps)(Wallets)