import CoinInfos from './coinInfos'

const initialWalletsState = {
	selectedBlokchain: null,

	seed: null,

	network: 'TESTNET',

	selectedCoin: null,

	walletInfo: null,

	warningInfo: null,

	coinChoseList: [],

	wallets: [],

	coins: [],

	transactionsBySelectedCoin: [],

	selectedCoinsFromCoinChoseList: [],

	availableBlockchains: Object.keys(CoinInfos),

	coinInfos: CoinInfos,

	dataChart: {},

	isDefaultWalletsView: true,

	isShowGenerateWalletModal: false,

	isShowSpinner: false,

	isShowSpinnerChart: false,

	isShowBlokchainChoseStep: false,

	isShowPutPasswordStep: false,

	isShowWalletInfoStep: false,

	isShowWalletsUploadWarningModal: false,

	isShowCoinSelector: true,

	isShowDefaultWalletViewModal: false
}

export default initialWalletsState