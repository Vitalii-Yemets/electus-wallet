
// ================================= Model ======================================
// {
//     "blokchain": "Ethereum",
//     "address": "0xb4016d8ca33ab5970b1acdc3fb9a63a123a30638",
//     "tokens": [
//         "Ethereum",
//         "rco"
//     ],
//     "key": {
//         "address": "b4016d8ca33ab5970b1acdc3fb9a63a123a30638",
//         "crypto": {
//             "cipher": "aes-128-ctr",
//             "ciphertext": "b5633ba4214d8b10994f61ce5f8a6cb13e94fd37cc1aa4b8644b0150d6574dcc",
//             "cipherparams": {
//                 "iv": "4b0cdde843188ee30e3fb8fc3c3ad2e3"
//             },
//             "mac": "89e31e74b975e9f525dd649c6eaeedb4205924262434468ef11721e3d53a95e3",
//             "kdf": "scrypt",
//             "kdfparams": {
//                 "dklen": 32,
//                 "n": 262144,
//                 "r": 1,
//                 "p": 8,
//                 "salt": "dd45d145255d8d18c074463a679ed0a3dbef728fcb2d75b6da04b595e7d39bbf"
//             }
//         },
//         "id": "56404bcf-5e65-4ce7-904e-fd206a167708",
//         "version": 3
//     }
// }
// ==============================================================================

export class Wallet {
	constructor({ blokchain, address, coins, key }) {
		this.blokchain = blokchain
		this.address = address
		this.coins = coins ? coins : [] // by default is empty
		this.key = key
	}

	get Blokchain() {
		return this.blokchain
	}

	get Address() {
		return this.address
	}

	get Coins() {
		return this.coins
	}

	get Key() {
		return this.key
	}
}