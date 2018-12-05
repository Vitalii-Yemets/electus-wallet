import {
	withLatestFrom,
	switchMap,
	//mergeMap,
	map,
	catchError
} from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { SendTransactionInfo } from '../../models/send-transaction-info'
import { SendTransactionErrorInfo } from '../../models/send-transaction-error-info'
import { SendTransactionSuccessInfo } from '../../models/send-transaction-success-info'
import getKeyProviderAsync from '../../utils/key-providers'
import getApiProviderAsync from '../../utils/api-providers'
import { first } from '../../utils/common'
import {
	SEND_TRANSACTION,
	SEND_TRANSACTION_SUCCESS
} from './constants'
import {
	hideSend,
	sendTransactionSuccess,
	sendTransactionError
} from './actions'

export const sendTransactionEpic = (action$, state$) => action$.pipe(
	ofType(SEND_TRANSACTION),
	withLatestFrom(state$),
	// eslint-disable-next-line
	switchMap(([action, state]) => {
		const {
			to,
			amount
		} = action.sendInfo

		const {
			wallets,
			selectedCoin,
			network
		} = state.walletsState

		const walletForm = first(
			wallets.filter(wallet => wallet.Address === selectedCoin.Address)
		)

		const blokchain = selectedCoin.blokchain

		return getKeyProviderAsync(blokchain).pipe(
			switchMap(keyProvider => {
				const sendTransactionInfo = new SendTransactionInfo({
					to,
					amount,
					coin: selectedCoin,
					privateKey: walletForm.key,
					signer: keyProvider.signTransaction
				})

				const options = {
					network,
					sendTransactionInfo
				}

				return getApiProviderAsync(blokchain).pipe(
					switchMap(apiProvider => apiProvider.sendTransactionAsync(options)),
					catchError(error => sendTransactionError(new SendTransactionErrorInfo(error)))
				)
			})
		)
	}),
	map(response => sendTransactionSuccess(new SendTransactionSuccessInfo(response)))
)

export const hideSendEpic = action$ => action$.pipe(
	ofType(SEND_TRANSACTION_SUCCESS),
	map(() => hideSend())
)

