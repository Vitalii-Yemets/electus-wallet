const networksType = {
    ETHEREUM: 'ETHEREUM',
    TESTNET: 'TESTNET'
}

export default {
    Networks: {
        Infura: {
            Mainnet: networksType.ETHEREUM,
            Testnet: networksType.TESTNET,
        },
        Etherscan: {
            Mainnet: networksType.ETHEREUM,
            Testnet: networksType.TESTNET,
        }
    },
    Hosts: {
        Infura: {
            Mainnet: 'https://mainnet.infura.io',
            Testnet: 'https://ropsten.infura.io'
        },
        Etherscan: {
            Mainnet: 'http://api.etherscan.io',
            Testnet: 'http://api-ropsten.etherscan.io'
        }
    },
    ApiTokens: {
        Infura: 'b2fe6cbf64f14f1b988b8e4d5c50cd56',
        Etherscan: 'ZI3BMCT21XGMGTCYHGDEUA6KU4P5E1MI3F'
    },
    Explorer: {
        Mainnet: 'https://etherscan.io',
        Testnet: 'https://ropsten.etherscan.io'
    },
    Fees: {
        maxGasForEthSend: 25000,
        maxGasForTokenSend: 60000
    }
}

//https://m6b19m0fxh.execute-api.eu-west-1.amazonaws.com/dev/ask?address=0xc8aaf9ef8b2f60d042ea4456c882b2d8b8112460