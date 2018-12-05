import { ofType } from 'redux-observable'
import { withLatestFrom, map, debounceTime } from 'rxjs/operators'

import { SHOW_PRELOADER } from './constants'
import { hiddenPreloader } from './actions'

export const preloaderEpic = (action$, state$) => action$.pipe(
	ofType(SHOW_PRELOADER),
	withLatestFrom(state$),
	debounceTime(1500),
	map(() => hiddenPreloader())
)