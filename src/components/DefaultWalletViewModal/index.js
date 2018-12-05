import React from 'react'
import { Button, Modal, Fa } from 'mdbreact'
import { WalletsUploader, WalletsUploaderID } from '../../components/WalletsUploader'
import './DefaultWalletViewModal.css'

const DefaultWalletViewModal = ({
	onCloseDefaultWalletViewModal,
	isShowDefaultWalletViewModal,
	onGenerateWallet,
	onWalletsUpload
}) => {
	if (!isShowDefaultWalletViewModal) {
		return null
	}

	const walletsUploaderProps = {
		onWalletsUpload
	}

	return (
		<Modal centered size='lg' isOpen={true}>
			<Button className='close' onClick={onCloseDefaultWalletViewModal} size='sm'>
				<Fa icon="close" size="lg" />
			</Button>
			<div className='default-wallet-view'>
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-sm-5 col-md-5">
							<div className="t-c border-and-height" onClick={onGenerateWallet}>
								<div className="t-c center-margin">
									<div className="btn-create-upload ">+</div>
									<div className="name-btb-wallet">Create new wallet</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-2 col-md-2 d-none-block">
							<div className='or-text-wallets-start-view center-margin'>or</div>
						</div>
						<div className="col-12 col-sm-5 col-md-5">
							<WalletsUploader {...walletsUploaderProps} />
							<div className="t-c border-and-height" onClick={() => {
								const walletsUploader = document.getElementById(WalletsUploaderID)
								walletsUploader.click()
								onCloseDefaultWalletViewModal()
							}}>
								<div className="t-c center-margin">
									<div className="btn-create-upload ">+</div>
									<div className="name-btb-wallet">Upload your wallet</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default DefaultWalletViewModal