import React from 'react'
import { Tabs, Tab, TabList, TabPanel } from '../Tabs'
import Spinner from '../Spinner'
import LineChart from '../LineChart'
import Transaction from '../Transaction'
import TransactionType from '../../models/transaction-type'

const TransactionList = ({
	onGetLineChartData,
	selectedCoin,
	transactionsBySelectedCoin,
	isShowTransactionList,
	isShowSpinnerChart,
	dataChart
}) => {
	if (!isShowTransactionList) {
		return null
	}

	const spinnerProps = {
		isShowSpinner: isShowSpinnerChart
	}

	const lineChartProps = {
		dataChart
	}

	const address = selectedCoin.Address

	return (
		<div className='tab-relative'>
			<Spinner {...spinnerProps} />

			<Tabs defaultIndex={0} className="p-0">
				<TabList>
					<Tab className='all-tab'>all</Tab>
					<Tab className='send-tab'>send</Tab>
					<Tab className='received-tab'>received</Tab>
					<Tab className='chart-tab'>
						<div onClick={onGetLineChartData}>
							chart
						</div>
					</Tab>
				</TabList>
				<div className="h-content-tabs">
					<TabPanel>
						{
							transactionsBySelectedCoin
								.sort((obj1, obj2) => { return obj2.TimeStamp() - obj1.TimeStamp() })
								.map((transaction, key) => {
									const transactionProps = {
										transaction,
										selectedCoin
									}

									return <Transaction key={key} {...transactionProps} />
								})
						}
					</TabPanel>
					<TabPanel>
						{
							transactionsBySelectedCoin
								.filter(transaction => {
									return transaction.Type(address) === TransactionType.SENDED
								})
								.sort((obj1, obj2) => { return obj2.TimeStamp() - obj1.TimeStamp() })
								.map((transaction, key) => {
									const transactionProps = {
										transaction,
										selectedCoin
									}

									return <Transaction key={key} {...transactionProps} />
								})
						}
					</TabPanel>
					<TabPanel>
						{
							transactionsBySelectedCoin
								.filter(transaction => transaction.Type(address) === TransactionType.RECEIVED)
								.sort((obj1, obj2) => { return obj2.TimeStamp() - obj1.TimeStamp() })
								.map((transaction, key) => {
									const transactionProps = {
										transaction,
										selectedCoin
									}

									return <Transaction key={key} {...transactionProps} />
								})
						}
					</TabPanel>
					<TabPanel>
						<LineChart {...lineChartProps} />
					</TabPanel>
				</div>
			</Tabs>
		</div>
	)
}

export default TransactionList