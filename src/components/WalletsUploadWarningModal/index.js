import React from 'react'
import { Button, Modal, Fa } from 'mdbreact'

import './WalletsUploadWarningModal.css'

const WalletsUploadWarningModal = ({
	isShowWalletsUploadWarningModal,
	warningInfo,
	onCloseWalletsUploadWarningModal
}) => {
	if (!isShowWalletsUploadWarningModal) {
		return null
	}

	const { message, walletsDuplicated } = warningInfo

	const duplicatedWalletsAddressesRender = walletsDuplicated => <p>{walletsDuplicated.map(wallet => wallet.address).join(',')}</p>

	return (
		<Modal className='generate-wallet-modal' centered size='lg' isOpen={isShowWalletsUploadWarningModal}>
			{`${message}`}
			{duplicatedWalletsAddressesRender(walletsDuplicated)}
			<Button className='close' onClick={onCloseWalletsUploadWarningModal} size='sm'>
				<Fa icon="close" size="lg" />
			</Button>
		</Modal>
	)
}

export default WalletsUploadWarningModal