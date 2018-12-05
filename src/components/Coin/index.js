import React from 'react'
import { BigNumber } from 'bignumber.js'
import classNames from 'classnames'
import './Coin.css'

const Coin = ({
	coinInfo,
	selectedCoin,
	onShowCoinDetails,
	onCloseCoinSelectorOnMobile,
	onShowCoinSelectorOnMobile
}) => {
	const {
		// type,
		// blokchain,
		decimals,
		symbol,
		ico: Ico,
		name,
		balance,
		address,
		contractAddress,
		course
	} = coinInfo

	const selectedCoinId = `${selectedCoin.address}${selectedCoin.contractAddress ? selectedCoin.contractAddress : ''}`

	const currentCoinId = `${address}${contractAddress ? contractAddress : ''}`

	const activeCoinStyles = classNames('coin', currentCoinId === selectedCoinId ? 'active-coin' : '')

	const normalizeBalance = new BigNumber(balance / Math.pow(10, decimals)).toFormat()

	const coinCourse = course ? course : 0

	const w = window.innerWidth
	let disposable = true

	if (w < 576 && disposable) {
		onShowCoinSelectorOnMobile()
		disposable = false
	}

	return (
		<div>
			<div className='desck-coin-click'>
				<div onClick={() => onShowCoinDetails(coinInfo)} className={activeCoinStyles}>
					<div className="row">
						<div className="col-8">
							<div className="flex coin-ico">
								<div className="svg-ico"><Ico /></div>
								<div className="name-coin">
									{name}
								</div>
							</div>
						</div>
						<div className="col-4">
							<div className="flex bg-cours-coin">
								<div className='cours'>
									{coinCourse}
								</div>
							</div>
						</div>
					</div>
					<div className="t-c">
						<div className='quantity'>
							{normalizeBalance}
						</div>
						<div className="name-coin-simbol">
							{symbol.toUpperCase()}
						</div>
					</div>
				</div>
			</div>


			<div className='mobile-coin-click'>
				<div onClick={() => {
					onShowCoinDetails(coinInfo)
					onCloseCoinSelectorOnMobile()
				}} className={activeCoinStyles}>
					<div className="row m-0">
						<div className="col-8 p-0">
							<div className="flex coin-ico">
								<div className="svg-ico"><Ico /></div>
								<div className="name-coin">
									{name}
								</div>
							</div>
						</div>
						<div className="col-4 p-0">
							<div className="flex bg-cours-coin">
								<div className='cours'>
									{coinCourse}
								</div>
							</div>
						</div>
					</div>
					<div className="t-c">
						<div className='quantity'>
							{normalizeBalance}
						</div>
						<div className="name-coin-simbol">
							{symbol.toUpperCase()}
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}

export default Coin