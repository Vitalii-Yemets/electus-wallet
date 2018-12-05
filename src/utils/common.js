import CoinType from '../models/coin-type'

export const first = arrayElements => arrayElements[0]

export const equal = (firstOperand, secondOperand, propertyName) => firstOperand[propertyName] === secondOperand[propertyName]

export const toHex = (value, prefix = false) => {
	return prefix ? `0x${Number(value).toString(16)}` : Number(value).toString(16)
}

export const toDec = item => Number(item).toString(10)

export const generateFileName = address => {
	const date = new Date()

	const month = ((date.getMonth() + 1).toString().length === 1) ?
		'0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()

	const days = (date.getDate().toString().length === 1) ?
		'0' + date.getDate().toString() : date.getDate().toString()

	const hours = (date.getHours().toString().length === 1) ?
		'0' + date.getHours().toString() : date.getHours().toString()

	const mins = (date.getMinutes().toString().length === 1) ?
		'0' + date.getMinutes().toString() : date.getMinutes().toString()

	const seconds = (date.getSeconds().toString().length === 1) ?
		'0' + date.getSeconds().toString() : date.getSeconds().toString()

	const mseconds = (date.getMilliseconds().toString().length === 1) ?
		'00' + date.getMilliseconds().toString() :
		((date.getMilliseconds().toString().length === 2) ? '0' + date.getMilliseconds().toString()
			: date.getMilliseconds().toString())

	const fileName = 'UTC--' + date.getFullYear() + '-'
		+ month + '- ' + days + 'T' + hours + ':' + mins + ':' + seconds + '.' + mseconds +
		'Z--' + address

	return fileName
}

export const isToken = (tokenSymbol, tokenMap) => tokenMap[tokenSymbol].type !== CoinType.COIN;

export const excludeCoins = tokens => tokens.filter(token => token.type !== CoinType.COIN);