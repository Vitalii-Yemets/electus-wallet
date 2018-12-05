import React from 'react'
import { Button } from 'mdbreact'
import BlockchainMenu from '../BlockchainMenu'
import CoinChoseList from '../CoinChoseList'
import './BlokchainChoseStep.css'

const BlokchainChoseStep = ({
	onSelectBlokchain,
	onCheckedCoin,
	onGoToGenerateSeedStep,

	selectedBlokchain,
	coinChoseList,

	isShowBlokchainChoseStep,
	availableBlockchains,
}) => {
	if (!isShowBlokchainChoseStep) {
		return null
	}

	const blockchainMenuProps = {
		onSelectBlokchain,
		selectedBlokchain,
		availableBlockchains,
	}

	const disabledNextStep = !selectedBlokchain

	const coinChoseListProps = {
		onCheckedCoin,
		isShwoCoinChoseList: !!selectedBlokchain,
		coinChoseList
	}

	return (
		<div className='blokchain-chose-step t-c'>
			<div className='generate-wallet-text'>
				Generate New Wallet
			</div>
			<BlockchainMenu {...blockchainMenuProps} />
			<CoinChoseList {...coinChoseListProps} />
			<Button className='next-step-btn' onClick={onGoToGenerateSeedStep} disabled={disabledNextStep}>
				Next step >
			</Button>
		</div>
	)
}

export default BlokchainChoseStep