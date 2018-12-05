import React from 'react'
import { Button, Modal, Fa } from 'mdbreact'
import QRCode from 'qrcode.react'
import './GenerateQRCodeModal.css'

const GenerateQRCodeModal = ({
	onCloseGenerateQRCodeModal,
	selectedCoin,
	isGenerateQRCodeModal
}) => {
	if (!isGenerateQRCodeModal) {
		return null
	}

	const saveToFile = () => {
        let del = document.querySelector(".for-qr-delete")
        let c = document.querySelector(".qr-code");
        let d = c.toDataURL("image/png");
        let link = document.createElement('a');
        link.href = d;
        link.download = 'QRCode.png';
        del.appendChild(link);
        link.click();

        del.removeChild(del.firstChild)
    };

	return (
		<Modal centered size='md' isOpen={true}>
			<Button className='close' onClick={onCloseGenerateQRCodeModal} size='sm'>
				<Fa icon="close" size="lg" />
			</Button>
			<div className='qr-generator'>
				<div className='qr-generator-title'>
					<div className='qr-generator-label'>
						scan or download
					</div>
				</div>
				<div className='bloc-center'>
					<QRCode className={'qr-code'}
						renderAs={"canvas"}
						value={selectedCoin.address}
						color={"#67a814"}
						size={200} />

					<div className='for-qr-delete'></div>
				</div>
				<div className='bloc-center'>
					<Button onClick={saveToFile} className='btn-qr-download'>download</Button>
				</div>
			</div>		
		</Modal>
	);
}


export default GenerateQRCodeModal;