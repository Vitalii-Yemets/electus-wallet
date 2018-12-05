import React from 'react'
import TransactionType from '../../models/transaction-type'
import { ArrowUp, ArrowDown } from '../../assets/svg'
import './Transaction.css'

const Transaction = ({
	transaction,
	selectedCoin
}) => {
	const selectedCoinAddress = selectedCoin.Address

	const date = transaction.Date()

	const explorer = transaction.Explorer()

	const hash = transaction.Hash()

	const transactionType = transaction.Type(selectedCoinAddress)

	const normalizeAmount = transaction.Value(selectedCoinAddress, selectedCoin.Decimals)

	return (
		<div className={'transaction'}>
			<div className="row m-0 p-0">
				<div className="col-lg-4 col-md-4 col-sm-4 col-4 pr-0">
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-12">
							<div className="flex transaction-margin-left">
								<span className={'transaction-ico'}>
									{transactionType === TransactionType.RECEIVED
										? <ArrowDown />
										: <ArrowUp />}
								</span>
								{transactionType === TransactionType.RECEIVED
									? <div className='recive-state'>Recive</div>
									: <div className='send-state'>Send</div>}
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-12">
							<div className={'transaction-value t-c'}>
								{normalizeAmount}
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-5 col-md-5 col-sm-5 col-5">
					<a href={explorer} target='_blank' rel="noopener noreferrer">
						<div className={'transaction-adress'} data-hash={hash}>
							{hash}
						</div>
					</a>
				</div>
				<div className="col-lg-3 col-md-3 col-sm-3 col-3 pl-0 transaction-date-container">
					<div className='transaction-date'>
						{date}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Transaction
