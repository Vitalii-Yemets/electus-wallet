import React from 'react'
import { Subject } from 'rxjs'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { openMenu, closeMenu, showPreloader } from './actions'

import { BrowserRouter } from 'react-router-dom'

import Settings from '../Settings'
import Wallets from '../Wallets'
import Menu from '../../components/Menu'
import Toolbar from '../../components/Toolbar'
import Preloader from '../../components/Preloader'
import './Root.css'

const keysUploadEventEmitter = new Subject();

const Root = ({
	consolidatedBalance,
	currencyForConversion,
	dialogIsOpen,
	openMenu,
	closeMenu,
	isShowPreloader,
	selectedCoin
}) => {

	const toolbarProps = {
		consolidatedBalance,
		currencyForConversion,
		dialogIsOpen,
		openMenu,
		keysUploadEventEmitter
	};

	const menuProps = {
		consolidatedBalance,
		currencyForConversion,
		selectedCoin,
		dialogIsOpen,
		closeMenu
	}

	const preloaderProps = {
		isShowPreloader
	}

	return (
		<BrowserRouter>
			<div className='root'>
				<Preloader {...preloaderProps} />

				<div className="container-fluid">
					<div className="row">
						<div className="col-12 toolbar-container">
							<Toolbar {...toolbarProps} />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2 col-md-0 col-sm-0 col-xs-0 p-0">
							<Menu {...menuProps} />
						</div>
						<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 p-0">
							<Switch>
								<Route path='/settings' component={Settings} />
								<Route path='/wallets' component={Wallets} />
								<Redirect exact={true} path='*' to="/wallets" component={Wallets} />
							</Switch>
						</div>
					</div>
				</div>
			</div>
		</BrowserRouter>
	)
}

const withLifecycle = lifecycle({
	componentDidMount() {
		const { showPreloader } = this.props
		showPreloader()
	}
})(Root)

const mapStateToProps = state => ({
	consolidatedBalance: state.walletsState.consolidatedBalance,
	currencyForConversion: state.walletsState.currencyForConversion,
	selectedCoin: state.walletsState.selectedCoin,
	dialogIsOpen: state.rootState.isOpen,
	isShowPreloader: state.rootState.isShowPreloader
})

const mapDispatchToProps = dispatch => ({
	openMenu: () => dispatch(openMenu()),
	closeMenu: () => dispatch(closeMenu()),
	showPreloader: () => dispatch(showPreloader())
})


export default connect(mapStateToProps, mapDispatchToProps)(withLifecycle)

