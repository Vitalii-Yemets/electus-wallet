import {
	OPEN_MENU,
	CLOSE_MENU,
	
	HIDDEN_PRELOADER,
	SHOW_PRELOADER
} from './constants';

export const openMenu = () => ({ type: OPEN_MENU })
export const closeMenu = () => ({ type: CLOSE_MENU })

export const hiddenPreloader = () => ({ type: HIDDEN_PRELOADER })
export const showPreloader = () => ({ type: SHOW_PRELOADER })
