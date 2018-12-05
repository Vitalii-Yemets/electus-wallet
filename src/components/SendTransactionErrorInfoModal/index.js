import React from 'react'
import {
    Button,
    Modal,
    Fa
} from 'mdbreact'

import './SendTransactionErrorInfoModal.css'

const SendTransactionErrorInfoModal = ({
    isShowSendTransactionErrorInfoModal,
    sendTransactionErrorInfo,
    onCloseSendTransactionErrorInfoModal
}) => {

    if (!isShowSendTransactionErrorInfoModal) {
        return null
    }
    return (
        <Modal className='generate-wallet-modal generate-info-modal' centered size='md' isOpen={true}>
            <p className='color-red'>Error Send Transaction *******</p>
            <Button className='close' onClick={onCloseSendTransactionErrorInfoModal} size='sm'>
                <Fa icon="close" size="lg" />
            </Button>
        </Modal>
    )
}

export default SendTransactionErrorInfoModal