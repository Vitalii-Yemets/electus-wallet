import initialRootState from './containers/Root/initialState'
import initialWalletsState from './containers/Wallets/initialState'
import intialCoinDetailsState from './containers/CoinDetails/initialState'

const initialAppState = {
	
	walletsState: initialWalletsState,
	rootState: initialRootState,
	coinDetailsState: intialCoinDetailsState
};

export default initialAppState;