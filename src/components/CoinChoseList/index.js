import React from 'react'
import { Input, FormInline } from 'mdbreact'
import './CoinChoseList.css'

const CoinChoseList = ({
	onCheckedCoin,
	isShwoCoinChoseList,
	coinChoseList
}) => {
	if (!isShwoCoinChoseList) {
		return null
	}

	return (
		<FormInline>
			{coinChoseList.map((tokenSymbol, key) =>
				<Input
					label={tokenSymbol}
					type="checkbox"
					id={"checkbox" + key}
					key={key}
					onChange={evt => onCheckedCoin({
						symbol: tokenSymbol,
						cheked: evt.currentTarget.checked
					})}
				/>)}
		</FormInline>
	)
}

export default CoinChoseList


