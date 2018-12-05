import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import initialAppState from './initialState'
import rootReducer from './containers/Root/reducer'
import walletsReducer from './containers/Wallets/reducer'
import coinDetailsReducer from './containers/CoinDetails/reducer'
import {
	generateSeedEpic,
	generatePrivateKeyEpic,
	addWalletToWalletsEpic,
	uploadWalletsEpic,
	addNewCoinsEpic,
	selectCoinEpic,
	getTransactionsBySelectedCoinEpic,
	getDataChartEpic,
	updateCoinsEpic,
	updateCoinDetails,
	updateCoinsCoursesEpic
} from './containers/Wallets/epics'
import { preloaderEpic } from './containers/Root/epics'
import {
	hideSendEpic,
	sendTransactionEpic
} from './containers/CoinDetails/epics'

import logger from './logger'

const reducers = combineReducers({
	walletsState: walletsReducer,
	rootState: rootReducer,
	coinDetailsState: coinDetailsReducer
})

const epicMiddleware = createEpicMiddleware()

const middlewares = applyMiddleware(thunk, logger, epicMiddleware)

export const store = createStore(reducers, initialAppState, composeWithDevTools(middlewares))

const combinedEpics = combineEpics(
	generateSeedEpic,
	generatePrivateKeyEpic,
	addWalletToWalletsEpic,
	uploadWalletsEpic,
	addNewCoinsEpic,
	updateCoinsCoursesEpic,
	hideSendEpic,
	selectCoinEpic,
	getTransactionsBySelectedCoinEpic,
	preloaderEpic,
	getDataChartEpic,
	updateCoinsEpic,
	updateCoinDetails,
	sendTransactionEpic
)

epicMiddleware.run(combinedEpics)
