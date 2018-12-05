import CoinType from '../../models/coin-type'
import {
	BitcoinIcon,
	EthereumIcon,
	OmisegoIco,
	ZrxIco,
	ZilliqaIco,
	GolemIco,
	AugurIco,
	KyberNetworkIco,
	PowerLedgerIco,
	StatusIco,
	TrueUSDIco,
	MCOIco,
	BancoIcon
} from '../../assets/svg/'

const CoinInfos = {
	Bitcoin: {
		btc: {
			symbol: 'btc',
			name: 'Bitcoin',
			type: CoinType.COIN,
			contractAddress: null,
			decimals: 8,
			blokchain: 'Bitcoin',
			ico: BitcoinIcon
		}
	},
	Ethereum: {
		eth: {
			symbol: 'eth',
			name: 'Ethereum',
			type: CoinType.COIN,
			contractAddress: null,
			decimals: 18,
			blokchain: 'Ethereum',
			ico: EthereumIcon
		},
		// rco: {
		// 	symbol: 'rco',
		// 	name: 'Roma Fixed Supply Token',
		// 	type: CoinType.TOKEN,
		// 	contractAddress: '0xfe260463f929b209133cfd2c8bb5bad7bb8c8346',
		// 	decimals: 18,
		// 	blokchain: 'Ethereum'
		// },
		zrx: {
			symbol: 'zrx',
			name: '0x',
			type: CoinType.TOKEN,
			contractAddress: '0xD0fCcCe95c44a8c4Bd3C111718Bdc3D3Bcd56FB9',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: ZrxIco
		},
		omg: {
			symbol: 'omg',
			name: 'OmiseGO',
			type: CoinType.TOKEN,
			contractAddress: '0x2DaB476e673f5C8713153B21eD7003315Ff19d62',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: OmisegoIco
		},
		zil: {
			symbol: 'zil',
			name: 'Zilliqa',
			type: CoinType.TOKEN,
			contractAddress: '0xd8c67febd31ff9f12d0527c6a8c9850e420317dc',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: ZilliqaIco
		},
		rep: {
			symbol: 'rep',
			name: 'Augur',
			type: CoinType.TOKEN,
			contractAddress: '0xf82672940290bec96884a2df0a1c26a7f7e9b378',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: AugurIco
		},
		gnt: {
			symbol: 'gnt',
			name: 'Golem',
			type: CoinType.TOKEN,
			contractAddress: '0x925ce15dd88ebb75472a5649ed338203a16b34dc',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: GolemIco
		},
		snt: {
			symbol: 'snt',
			name: 'Status',
			type: CoinType.TOKEN,
			contractAddress: '0xeb204b45e6e9b0d118c99edd5cfd6a91fab5b797',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: StatusIco
		},
		bnt: {
			symbol: 'bnt',
			name: 'Banco',
			type: CoinType.TOKEN,
			contractAddress: '0x3b4e01d64ffa7d37265b0ad46492023e29727332',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: BancoIcon,
		},
		mco: {
			symbol: 'mco',
			name: 'MCO',
			type: CoinType.TOKEN,
			contractAddress: '0xd72d7e3403678c8e074905dd6e04c38c8d5e3dcf',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: MCOIco
		},
		knc: {
			symbol: 'knc',
			name: 'Kyber Network',
			type: CoinType.TOKEN,
			contractAddress: '0x25455feae9eaeeb68300774391e51fe4bdac9b72',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: KyberNetworkIco
		},
		powr: {
			symbol: 'powr',
			name: 'Power Ledger',
			type: CoinType.TOKEN,
			contractAddress: '0x99d305adf574d22d849a5198188a6289e98462a2',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: PowerLedgerIco
		},
		tusd: {
			symbol: 'tusd',
			name: 'TrueUSD',
			type: CoinType.TOKEN,
			contractAddress: '0x2272e362c956bd91e5434e4ead1eb09de9bec6e3',
			decimals: 18,
			blokchain: 'Ethereum',
			ico: TrueUSDIco
		}
	}
}

export default CoinInfos
