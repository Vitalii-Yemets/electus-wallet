export class Coin {
	constructor({
		type,
		symbol,
		name,
		balance,
		address,
		contractAddress,
		decimals,
		blokchain,
		ico,
		course
	}) {
		this.type = type
		this.symbol = symbol
		this.name = name
		this.balance = balance
		this.address = address
		this.contractAddress = contractAddress
		this.decimals = decimals
		this.blokchain = blokchain
		this.ico = ico
		this.course = course
	}

	get Type() {
		return this.type
	}

	get Symbol() {
		return this.symbol
	}

	get Name() {
		return this.name
	}

	get Balance() {
		return this.balance
	}

	get Address() {
		return this.address
	}

	get ContractAddress() {
		return this.contractAddress
	}

	get Decimals() {
		return this.decimals
	}

	get Blokchain() {
		return this.blokchain
	}

	get Ico() {
		return this.ico
	}

	get Course() {
		return this.course
	}

	static SortByGroup(coins) {
		if (!coins) {
			return []
		}

		const coinsSortingByDescGroup = coins.sort((a, b) => {
			const aId = `${a.Address}${a.ContractAddress ? a.ContractAddress : ''}`.toLowerCase()
			const bId = `${b.Address}${b.ContractAddress ? b.ContractAddress : ''}`.toLowerCase()

			if (aId > bId) {
				return 1
			} else if (aId < bId) {
				return -1
			} else {
				return 0
			}
		})

		return coinsSortingByDescGroup
	}

}