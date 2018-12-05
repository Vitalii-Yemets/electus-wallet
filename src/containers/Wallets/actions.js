import {
	GENERATE_WALLET_NEW,
	SELECTE_BLOKCHAIN_NEW,
	COIN_CHEKED_NEW,
	GO_TO_GENERATE_SEED_STEP_NEW,
	GENERATE_SEED_NEW,
	SET_SEED_NEW,
	GENERATE_PRIVATE_KEY_NEW,
	GO_TO_WALLET_INFO_STEP_NEW,
	GENERATE_WALLET_COMPLETED_NEW,
	ADD_WALLET_TO_WALLETS_NEW,
	GENERATE_WALLET_CANCEL_NEW,
	UPLOAD_WALLETS_NEW,
	UPLOAD_UNIQUE_WALLETS_NEW,
	UPLOAD_AND_REPLACE_DUPLICATE_WALLETS_NEW,
	ADD_NEW_COINS_NEW,
	SHOW_COIN_DETAILS_NEW,
	GET_TRANSACTIONS_BY_SELECTED_COIN_NEW,
	UPDATE_COINS_COURSES,

	GET_LINE_CHART_DATA,
	GET_LINE_CHART_DATA_SUCCESS,
	GET_LINE_CHART_DATA_ERROR,

	CLOSE_WALLETS_UPLOAD_WARNING_MODAL,

	OPEN_COIN_SELECTOR_ON_MOBILE,
	CLOSE_COIN_SELECTOR_ON_MOBILE,
	CHECK_COINS_BALANCE,
	UPDATE_COINS,
	UPDATE_SELECTED_COINS,
	OPEN_DEFAULT_VIEW_WALLETS_MODAL,
	CLOSE_DEFAULT_VIEW_WALLETS_MODAL
} from './constants'

// new
export const generateWalletNew = () => ({
	type: GENERATE_WALLET_NEW
})

export const generateWalletCancelNew = () => ({
	type: GENERATE_WALLET_CANCEL_NEW
})

export const selectBlokchainNew = selectedBlokchain => ({
	type: SELECTE_BLOKCHAIN_NEW,
	selectedBlokchain
})

export const coinCheckedNew = coin => ({
	type: COIN_CHEKED_NEW,
	coin
})

export const goToGenerateSeedStepNew = () => ({
	type: GO_TO_GENERATE_SEED_STEP_NEW
})

export const generateSeedNew = () => ({
	type: GENERATE_SEED_NEW
})

export const setSeedNew = seed => ({
	type: SET_SEED_NEW,
	seed
})

export const generatePrivateKey = () => ({
	type: GENERATE_PRIVATE_KEY_NEW
})

export const gotToWalletInfoStep = walletInfo => ({
	type: GO_TO_WALLET_INFO_STEP_NEW,
	walletInfo
})

export const generateWalletCompleted = () => ({
	type: GENERATE_WALLET_COMPLETED_NEW
})

export const addWalletToWallets = newWallet => ({
	type: ADD_WALLET_TO_WALLETS_NEW,
	newWallet
})

export const uploadWallets = loadedWallets => ({
	type: UPLOAD_WALLETS_NEW,
	loadedWallets
})

export const uploadUniqueWallets = uniqueWallets => ({
	type: UPLOAD_UNIQUE_WALLETS_NEW,
	uniqueWallets
})

export const uploadAndReplaceDuplicateWallets = (warningInfo, duplicateWallets, uniqueWallets) => ({
	type: UPLOAD_AND_REPLACE_DUPLICATE_WALLETS_NEW,
	warningInfo,
	duplicateWallets,
	uniqueWallets
})

export const addNewCoins = newCoins => ({
	type: ADD_NEW_COINS_NEW,
	newCoins
})

export const showCoinDetails = selectedCoin => ({
	type: SHOW_COIN_DETAILS_NEW,
	selectedCoin
})

export const getTransactionsBySelectedCoin = transactionsBySelectedCoin => ({
	type: GET_TRANSACTIONS_BY_SELECTED_COIN_NEW,
	transactionsBySelectedCoin
})

export const getLineChartData = () => ({
	type: GET_LINE_CHART_DATA
})

export const getLineChartDataSuccess = dataChart => ({
	type: GET_LINE_CHART_DATA_SUCCESS,
	dataChart
})

export const getLineChartDataError = error => ({
	type: GET_LINE_CHART_DATA_ERROR,
	error
})

export const showCoinSelectorOnMobile = () => ({
	type: OPEN_COIN_SELECTOR_ON_MOBILE
})

export const closeCoinSelectorOnMobile = () => ({
	type: CLOSE_COIN_SELECTOR_ON_MOBILE
})

export const updateCoins = coins => ({
	type: UPDATE_COINS,
	coins
})

export const updateSelectedCoins = (selectedUpdatedCoin, transactionsBySelectedUpdatedCoin) => ({
	type: UPDATE_SELECTED_COINS,
	selectedUpdatedCoin,
	transactionsBySelectedUpdatedCoin
})

export const checkCoinsBalance = () => ({
	type: CHECK_COINS_BALANCE
})

export const updateCoinsCourses = coinsWithUpdatedCourse => ({
	type: UPDATE_COINS_COURSES,
	coinsWithUpdatedCourse
})


//
/**
 * ===================== Uploadig wallets =================
 */
// export const uploadWallets = newWallets => ({
// 	type: UPLOAD_WALLETS,
// 	newWallets
// })
// export const uploadWalletsSuccess = uniqueWallets => ({
// 	type: UPLOAD_WALLETS_SUCCESS,
// 	uniqueWallets
// })
// export const openWalletsUploadWarningModal = (warningInfo, uniqueWallets) => ({
// 	type: OPEN_WALLETS_UPLOAD_WARNING_MODAL,
// 	warningInfo,
// 	uniqueWallets
// })
export const closeWalletsUploadWarningModal = () => ({
	type: CLOSE_WALLETS_UPLOAD_WARNING_MODAL
})


export const closeDefaultWalletViewModal= () => ({
	type: CLOSE_DEFAULT_VIEW_WALLETS_MODAL
})

export const openDefaultWalletViewModal= () => ({
	type: OPEN_DEFAULT_VIEW_WALLETS_MODAL
})



/**
* =========================================================
*/

/**
 * ===================== Coins ============================
 */
// export const addNewCoins = newCoins => ({
// 	type: ADD_NEW_COINS,
// 	newCoins
// })

// export const showCoinDetails = selectedCoin => ({
// 	type: SHOW_COIN_DETAILS,
// 	selectedCoin
// })

// export const showCoinDetailsSuccess = transactionsBySelectedCoin => ({
// 	type: SHOW_COIN_DETAILS_SUCCESS,
// 	transactionsBySelectedCoin
// })
/**
* =========================================================
*/

// export const showSpinner = () => ({ type: SHOW_SPINNER })
// export const hiddenSpinner = () => ({ type: HIDDEN_SPINNER })

