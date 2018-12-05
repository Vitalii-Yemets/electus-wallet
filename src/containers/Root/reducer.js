import { OPEN_MENU, CLOSE_MENU, HIDDEN_PRELOADER } from './constants'

const rootReducer = (state = null, action) => {
	switch (action.type) {
		case OPEN_MENU: {
			const isOpen = true

			return {
				...state,
				isOpen
			}
		}

		case CLOSE_MENU: {
			const isOpen = false

			return {
				...state,
				isOpen
			}
		}

		case HIDDEN_PRELOADER: {
			const isShowPreloader = false

			return {
				...state,
				isShowPreloader
			}
		}

		default: {
			return state
		}
	}
}

export default rootReducer