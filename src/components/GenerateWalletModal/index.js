import React from 'react'
import { Button, Modal, Fa } from 'mdbreact'

import BlokchainChoseStep from '../BlokchainChoseStep'
import GenerateSeedStep from '../GenerateSeedStep'
import WalletInfoStep from '../WalletInfoStep'

import './GenerateWalletModal.css'

const GenerateWalletModal = ({
	onGenerateWalletCancel,
	onSelectBlokchain,
	onCheckedCoin,
	onGoToGenerateSeedStep,
	onGenerateSeed,
	onGeneratePrivateKey,
	onGenerateWalletCompleted,

	isShowGenerateWalletModal,
	isShowBlokchainChoseStep,
	isShowSeedGenerateStep,
	isShowWalletInfoStep,
	selectedBlokchain,
	coinChoseList,
	seed,
	selectedCoinsFromCoinChoseList,
	walletInfo,
	coinInfos,
	availableBlockchains
}) => {
	if (!isShowGenerateWalletModal) {
		return null
	}

	const blokchainChoseStepProps = {
		onSelectBlokchain,
		onCheckedCoin,
		onGoToGenerateSeedStep,

		isShowBlokchainChoseStep,
		availableBlockchains,
		selectedBlokchain,
		coinChoseList,
		selectedCoinsFromCoinChoseList
	}

	const generateSeedStepProps = {
		onGenerateSeed,
		onGeneratePrivateKey,
		isShowSeedGenerateStep,
		seed
	}

	const walletInfoStepProps = {
		onGenerateWalletCompleted,
		isShowWalletInfoStep,
		walletInfo,
		coinInfos
	}

	return (
		<Modal className='generate-wallet-modal' centered size='lg' isOpen={isShowGenerateWalletModal}>
			<BlokchainChoseStep {...blokchainChoseStepProps} />
			<GenerateSeedStep {...generateSeedStepProps} />
			<WalletInfoStep {...walletInfoStepProps} />
			<Button className='close' onClick={onGenerateWalletCancel} size='sm'>
				<Fa icon="close" size="lg" />
			</Button>
		</Modal>
	)
}

export default GenerateWalletModal