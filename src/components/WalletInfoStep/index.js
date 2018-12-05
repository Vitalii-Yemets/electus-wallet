import React from 'react'
import { Button } from 'mdbreact'
import CoinType from '../../models/coin-type'
import { first } from '../../utils/common'
// import { BitcoinIcon, EthereumIcon } from '../../assets/svg/index'
import './WalletInfoStep.css'

const getCoinSymbol = (coinInfos, blokchain, coinType) => {
	const coinInfosByBlokchainInfo = coinInfos[blokchain]

	const avalibleSymbols = Object.keys(coinInfosByBlokchainInfo)

	const coinSymbol = avalibleSymbols
		.filter(symbol => coinInfosByBlokchainInfo[symbol].type === coinType)[0]

	if (!coinSymbol) {
		throw new Error(`Can't found coin symbol.`)
	}

	return coinSymbol
}

const WalletInfoStep = ({
	onGenerateWalletCompleted,
	isShowWalletInfoStep,
	walletInfo,
	coinInfos,
}) => {
	if (!isShowWalletInfoStep) {
		return null
	}

	const coinBalance = 0

	const {
		blokchain,
		address,
	} = walletInfo

	const coinSymbol = getCoinSymbol(coinInfos, blokchain, CoinType.COIN)
	const coinsMap = coinInfos[blokchain]
	const Icon = first(Object.keys(coinsMap).map(symbol => coinsMap[symbol]).filter(coinInfo => coinInfo.type === CoinType.COIN)).ico

	return (
		<div className='t-c finish-step'>
			<div className='generate-wallet-text'>Wallet Description</div>
			<div className='finish-step-ico-blokchain'><Icon /></div>
			<div className='finish-step-name-blokchain'>{blokchain}</div>
			<div className='finish-step-coin-balance'>
				{coinBalance}
				<span className='symbol-finish-step'>{coinSymbol}</span>
			</div>
			<div className='finish-step-wallet-address'>{address}</div>
			<div className='finish-step-wallet-address-key'>Publick Key</div>
			<Button className='next-step-btn' onClick={onGenerateWalletCompleted}>
				Finish
			</Button>
		</div>
	)
}

export default WalletInfoStep