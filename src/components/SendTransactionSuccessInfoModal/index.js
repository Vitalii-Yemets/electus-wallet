import React from 'react'
import {
    Button,
    Modal,
    Fa
} from 'mdbreact'

import './SendTransactionSuccessInfoModal.css'

const SendTransactionSuccessInfoModal = ({
    sendTransactionSuccessInfo,
    isShowSendTransactionSuccessInfoModal,
    onCloseSendTransactionSuccessInfoModal
}) => {
    if (!isShowSendTransactionSuccessInfoModal) {
        return null
    }

    return (
        <Modal className='generate-wallet-modal generate-info-modal' centered size='md' isOpen={true}>
            <p className='color-green'>The transaction has been sent to the network <br/>
            Check the transaction list after 30 seconds</p>
            <Button className='close' onClick={onCloseSendTransactionSuccessInfoModal} size='sm'>
                <Fa icon="close" size="lg" />
            </Button>
        </Modal>
    )
}

export default SendTransactionSuccessInfoModal