import React from 'react'
import { Button, Input } from 'mdbreact'
import Spinner from '../Spinner'
import './Send.css'

const Send = ({
    isShowSend,
    onSendMessage,
    // selectedCoin,
    onHideSend,
    isDisabledSendInput,
    onDisabledSendInput,
    onUnDisabledSendInput,
    isShowSpinnerSend
}) => {
    if (!isShowSend) {
        return null
    }

    const spinnerSendProps = {
		isShowSpinner: isShowSpinnerSend
	}

    return (
        <div className='send container-fluid'>
        <Spinner {...spinnerSendProps} />
            <div className={isDisabledSendInput ? 'display-none ' : 'display-block'} >
                <div className="row">
                    <div className='col-3'>
                    </div>
                    <div className='col-6'>
                        <div className="title-send-confirm">Send Coin</div>
                    </div>
                    <div className='col-3 t-r'>
                        <Button className='btn-back-en-close' onClick={onHideSend}>X</Button>
                    </div>
                </div>
            </div>

            <div className={!isDisabledSendInput ? 'display-none ' : 'display-block'} >
                <div className="row">
                    <div className='col-3'>
                    </div>
                    <div className='col-6'>
                        <div className="title-send-confirm">Confirm your operation</div>
                    </div>
                    <div className='col-3 t-r'>
                        <Button className='btn-back-en-close' onClick={onUnDisabledSendInput}>&#8592;</Button>
                        <Button className='btn-back-en-close' onClick={onHideSend}>X</Button>
                    </div>
                </div>
            </div>



            <div className="row">
                <div className='col-3'>

                </div>
                <div className='col-12 col-sm-6'>
                    <Input id='to' label='to' disabled={isDisabledSendInput} />
                    <Input id='amount' label='amount' name='amount' disabled={isDisabledSendInput} />
                    {/* <Input id='password' type='password' label='password' disabled={isDisabledSendInput} /> */}
                </div>
                <div className='col-3'>

                </div>
            </div>




            <div className={isDisabledSendInput ? 'display-none ' : 'display-block'} >
                <div className="flex send-btn">
                    <Button onClick={onDisabledSendInput}>
                        Next step >
                </Button>
                </div>
            </div>

            <div className={!isDisabledSendInput ? 'display-none ' : 'display-block'} >
                <div className="flex confirm-btn">
                    <Button onClick={() => {
                        const to = document.getElementById('to').value.toString()
                        const amount = Number(document.getElementById('amount').value)
                        // const password = document.getElementById('password').value.toString()
                        const messageDetails = { to, amount }
                        onSendMessage(messageDetails)
                    }}>
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Send;