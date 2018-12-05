import { Coin } from '../../models/coin'
import {
	GENERATE_WALLET_NEW,
	SELECTE_BLOKCHAIN_NEW,
	COIN_CHEKED_NEW,
	GO_TO_GENERATE_SEED_STEP_NEW,
	GENERATE_SEED_NEW,
	SET_SEED_NEW,
	GENERATE_PRIVATE_KEY_NEW,
	GO_TO_WALLET_INFO_STEP_NEW,
	ADD_WALLET_TO_WALLETS_NEW,
	GENERATE_WALLET_COMPLETED_NEW,
	GENERATE_WALLET_CANCEL_NEW,
	UPLOAD_WALLETS_NEW,
	UPLOAD_UNIQUE_WALLETS_NEW,
	UPLOAD_AND_REPLACE_DUPLICATE_WALLETS_NEW,
	ADD_NEW_COINS_NEW,
	SHOW_COIN_DETAILS_NEW,
	GET_TRANSACTIONS_BY_SELECTED_COIN_NEW,
	UPDATE_COINS,
	CLOSE_WALLETS_UPLOAD_WARNING_MODAL,
	OPEN_COIN_SELECTOR_ON_MOBILE,
	CLOSE_COIN_SELECTOR_ON_MOBILE,
	GET_LINE_CHART_DATA,
	GET_LINE_CHART_DATA_SUCCESS,
	GET_LINE_CHART_DATA_ERROR,
	UPDATE_SELECTED_COINS,
	UPDATE_COINS_COURSES,
	OPEN_DEFAULT_VIEW_WALLETS_MODAL,
	CLOSE_DEFAULT_VIEW_WALLETS_MODAL
} from './constants'

const walletsReducer = (state = null, action) => {
	switch (action.type) {

		case GENERATE_WALLET_NEW: {
			const isShowGenerateWalletModal = true
			const isShowBlokchainChoseStep = true
			const isShowSeedGenerateStep = false
			const isShowWalletInfoStep = false
			const seed = null
			const isShowDefaultWalletViewModal = false

			return {
				...state,
				isShowGenerateWalletModal,
				isShowBlokchainChoseStep,
				isShowSeedGenerateStep,
				isShowWalletInfoStep,
				isShowDefaultWalletViewModal,
				seed
			}
		}

		case SELECTE_BLOKCHAIN_NEW: {
			const selectedBlokchain = action.selectedBlokchain
			const coinChoseList = Object.keys(state.coinInfos[selectedBlokchain])

			return {
				...state,
				selectedBlokchain,
				coinChoseList
			}
		}

		case COIN_CHEKED_NEW: {
			const coin = action.coin
			const selectedCoinsFromCoinChoseList = coin.cheked
				? [...state.selectedCoinsFromCoinChoseList, coin.symbol]
				: state.selectedCoinsFromCoinChoseList.filter(tokenName => coin.symbol !== tokenName);

			return {
				...state,
				selectedCoinsFromCoinChoseList
			}
		}

		case GO_TO_GENERATE_SEED_STEP_NEW: {
			const isShowBlokchainChoseStep = false
			const isShowSeedGenerateStep = true

			return {
				...state,
				isShowBlokchainChoseStep,
				isShowSeedGenerateStep
			}
		}

		case GENERATE_SEED_NEW: {
			return {
				...state
			}
		}

		case SET_SEED_NEW: {
			const seed = action.seed

			return {
				...state,
				seed
			}
		}

		case GENERATE_PRIVATE_KEY_NEW: {
			const isShowSeedGenerateStep = false
			const isShowSpinner = true

			return {
				...state,
				isShowSeedGenerateStep,
				isShowSpinner
			}
		}

		case GO_TO_WALLET_INFO_STEP_NEW: {
			const walletInfo = action.walletInfo
			const isShowWalletInfoStep = true
			const isShowSpinner = false

			return {
				...state,
				walletInfo,
				isShowWalletInfoStep,
				isShowSpinner
			}
		}

		case ADD_WALLET_TO_WALLETS_NEW: {
			const newWallet = action.newWallet
			const wallets = [...state.wallets, newWallet]
			const walletInfo = null

			return {
				...state,
				wallets,
				walletInfo
			}
		}

		case GENERATE_WALLET_COMPLETED_NEW:
		case GENERATE_WALLET_CANCEL_NEW: {
			const isShowGenerateWalletModal = false
			const isShowBlokchainChoseStep = false
			const isShowSeedGenerateStep = false
			const isShowWalletInfoStep = false
			const selectedBlokchain = null
			const coinChoseList = []
			const selectedCoinsFromCoinChoseList = []
			const seed = null

			return {
				...state,
				isShowGenerateWalletModal,
				isShowBlokchainChoseStep,
				isShowSeedGenerateStep,
				isShowWalletInfoStep,
				selectedBlokchain,
				coinChoseList,
				selectedCoinsFromCoinChoseList,
				seed
			}
		}

		case UPLOAD_WALLETS_NEW: {
			const isShowSpinner = true

			return {
				...state,
				isShowSpinner
			}
		}

		case UPLOAD_UNIQUE_WALLETS_NEW: {
			const uniqueWallets = action.uniqueWallets
			const existingWallets = state.wallets
			const wallets = [...existingWallets, ...uniqueWallets]
			const isShowSpinner = false

			return {
				...state,
				wallets,
				isShowSpinner
			}
		}

		case UPLOAD_AND_REPLACE_DUPLICATE_WALLETS_NEW: {
			const {
				warningInfo,
				// duplicateWallets,
				uniqueWallets
			} = action

			const existingWallets = state.wallets
			const wallets = [...existingWallets, ...uniqueWallets]
			const isShowWalletsUploadWarningModal = true
			const isShowSpinner = false

			return {
				...state,
				wallets,
				warningInfo,
				isShowWalletsUploadWarningModal,
				isShowSpinner
			}
		}

		case ADD_NEW_COINS_NEW: {
			const existingCoins = state.coins
			const newCoins = action.newCoins
			const coins = Coin.SortByGroup([...existingCoins, ...newCoins])

			return {
				...state,
				coins
			}
		}

		case SHOW_COIN_DETAILS_NEW: {
			const selectedCoin = action.selectedCoin
			const isDefaultWalletsView = false
			const isShowSpinner = true

			return {
				...state,
				selectedCoin,
				isDefaultWalletsView,
				isShowSpinner
			}
		}

		case GET_TRANSACTIONS_BY_SELECTED_COIN_NEW: {
			const transactionsBySelectedCoin = action.transactionsBySelectedCoin
			const isShowSpinner = false

			return {
				...state,
				transactionsBySelectedCoin,
				isShowSpinner
			}
		}

		case OPEN_COIN_SELECTOR_ON_MOBILE: {
			const isShowCoinSelector = true

			return {
				...state,
				isShowCoinSelector
			}
		}

		case CLOSE_COIN_SELECTOR_ON_MOBILE: {
			const isShowCoinSelector = false

			return {
				...state,
				isShowCoinSelector
			}
		}

		case GET_LINE_CHART_DATA: {
			const isShowSpinnerChart = true

			return {
				...state,
				isShowSpinnerChart
			}
		}

		case GET_LINE_CHART_DATA_SUCCESS: {
			const dataChart = action.dataChart
			const isShowSpinnerChart = false

			return {
				...state,
				isShowSpinnerChart,
				dataChart
			}
		}

		case GET_LINE_CHART_DATA_ERROR: {
			const dataChartError = action.dataChartError
			const isShowSpinnerChart = false

			return {
				...state,
				isShowSpinnerChart,
				dataChartError
			}
		}

		/**
		 * ===================== DEFAULT WALLETS MODAL  ==================
		 */

		case OPEN_DEFAULT_VIEW_WALLETS_MODAL: {
			const isShowDefaultWalletViewModal = true
			return {
				...state,
				isShowDefaultWalletViewModal
			}
		}

		case CLOSE_DEFAULT_VIEW_WALLETS_MODAL: {
			const isShowDefaultWalletViewModal = false
			return {
				...state,
				isShowDefaultWalletViewModal
			}
		}

		case CLOSE_WALLETS_UPLOAD_WARNING_MODAL: {
			return {
				...state,
				isShowWalletsUploadWarningModal: false,
				warningInfo: null
			}
		}

		case UPDATE_COINS: {
			const coins = Coin.SortByGroup([...action.coins])

			return {
				...state,
				coins
			}
		}

		case UPDATE_SELECTED_COINS: {
			const selectedCoin = action.selectedUpdatedCoin
			const transactionsBySelectedCoin = action.transactionsBySelectedUpdatedCoin

			return {
				...state,
				selectedCoin,
				transactionsBySelectedCoin
			}
		}

		case UPDATE_COINS_COURSES: {
			const coins = Coin.SortByGroup([...action.coinsWithUpdatedCourse])

			return {
				...state,
				coins
			}
		}

		default:
			return state

	}
}

export default walletsReducer