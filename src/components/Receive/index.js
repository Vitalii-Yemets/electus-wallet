import React from 'react'
import { Button } from 'mdbreact'
import {
	ReceiveQrIcon,
	ReceiveTelegramIcon,
	ReceiveCopyIcon,
	ReceiveDropIcon
} from '../../assets/svg'
import GenerateQRCodeModal from '../../components/GenerateQRCodeModal'
import './Receive.css'

const Receive = ({
	isShowReceive,
	selectedCoin,
	onHideReceive,
	onCloseGenerateQRCodeModal,
	onOpenGenerateQRCodeModal,
	isGenerateQRCodeModal
}) => {
	if (!isShowReceive) {
		return null
	}

	const generateQRCodeModalProps = {
		onCloseGenerateQRCodeModal,
		selectedCoin,
		isGenerateQRCodeModal
	}

	return (
		<div className="container recive">
			<GenerateQRCodeModal {...generateQRCodeModalProps} />
			<div className="row">
				<div className='col-3'>
				</div>
				<div className='col-6'>
					<div className="title-send-confirm">Choose a sending method</div>
				</div>
				<div className='col-3 t-r'>
					<Button className='btn-back-en-close' onClick={onHideReceive}>X</Button>
				</div>
			</div>
			<div className="flex devider-top-bottom">
				<div className="row ico-app-recive m-0">
					<div className='col-md-6 col-sm-6 col-lg-6 col-xs-6 m-b-10 m-b'>


						<div className='wrapper-rescive-btn t-c'>
							<div className='btn-generator' onClick={onOpenGenerateQRCodeModal}>
								<ReceiveQrIcon />
							</div>
						</div>
					</div>
					<div className='col-md-6 col-sm-6 col-lg-6 col-xs-6'>


						<div className='wrapper-rescive-btn t-c'>
							<div className='btn-generator btn-no-active'>
								<ReceiveTelegramIcon />
							</div>
						</div>

					</div>
				</div>
				<div className="row ico-app-recive m-0">
					<div className='col-md-6 col-sm-6 col-lg-6 col-xs-6 m-b'>

						<div className='wrapper-rescive-btn t-c'>
							<div className='btn-generator btn-no-active'>
								<ReceiveCopyIcon />
							</div>
						</div>

					</div>
					<div className='col-md-6 col-sm-6 col-lg-6 col-xs-6'>

						<div className='wrapper-rescive-btn t-c'>
							<div className='btn-generator btn-no-active'>
								<ReceiveDropIcon />
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default Receive