import { ofType } from 'redux-observable'
import { from as ObservableFrom, of as ObservableOf } from 'rxjs'
import { withLatestFrom, mergeMap, map, switchMap, reduce } from 'rxjs/operators'

import getKeyProviderAsync from '../../utils/key-providers'
import getApiProviderAsync from '../../utils/api-providers'
import { equal, first } from '../../utils/common'
import { Wallet } from '../../models/wallet'
import { Transaction } from '../../models/transaction'
import { Coin } from '../../models/coin'
import { Courses } from '../../models/cources'
import CoinType from '../../models/coin-type'
import {
    GO_TO_GENERATE_SEED_STEP_NEW,
    GENERATE_SEED_NEW,
    GENERATE_PRIVATE_KEY_NEW,
    GENERATE_WALLET_COMPLETED_NEW,
    ADD_WALLET_TO_WALLETS_NEW,
    UPLOAD_WALLETS_NEW,
    UPLOAD_UNIQUE_WALLETS_NEW,
    UPLOAD_AND_REPLACE_DUPLICATE_WALLETS_NEW,
    SHOW_COIN_DETAILS_NEW,
    ADD_NEW_COINS_NEW,
    GET_LINE_CHART_DATA,
    CHECK_COINS_BALANCE,
    UPDATE_COINS
} from './constants'
import {
    setSeedNew,
    gotToWalletInfoStep,
    addWalletToWallets,
    uploadUniqueWallets,
    uploadAndReplaceDuplicateWallets,
    addNewCoins,
    showCoinDetails,
    getTransactionsBySelectedCoin,
    getLineChartDataSuccess,
    updateCoins,
    updateSelectedCoins,
    updateCoinsCourses
} from './actions'

export const generateSeedEpic = (action$, state$) => action$.pipe(
    ofType(
        GENERATE_SEED_NEW,
        GO_TO_GENERATE_SEED_STEP_NEW
    ),
    withLatestFrom(state$),
    switchMap(
        // eslint-disable-next-line
        ([action, state]) => getKeyProviderAsync(state.walletsState.selectedBlokchain).pipe(
            switchMap(keyProvider => keyProvider.generateRandomSeedAsync())
        )
    ),
    map(seed => setSeedNew(seed))
)

export const generatePrivateKeyEpic = (action$, state$) => action$.pipe(
    ofType(GENERATE_PRIVATE_KEY_NEW),
    withLatestFrom(state$),
    // eslint-disable-next-line
    switchMap(([action, state]) => getKeyProviderAsync(state.walletsState.selectedBlokchain).pipe(
        switchMap(keyProvider => {
            const password = '' //TODO: By default is empty string. Will be implemented in future

            const network = state.walletsState.network

            const blokchain = state.walletsState.selectedBlokchain

            //TODO: Fix getting seed
            const seedTextarea = document.getElementById('textareaSeed')
            const newSeedWords = seedTextarea.value

            // const seed = state.walletsState.seed
            const seed = newSeedWords

            const options = {
                password,
                network,
                seed
            }

            return keyProvider.generatePrivateKeyAsync(options).pipe(
                mergeMap(
                    keyAddressPair => getApiProviderAsync(blokchain).pipe(
                        switchMap(apiProvider => {
                            const options = {
                                network,
                                coinType: CoinType.COIN
                            }

                            return apiProvider.getBalanceAsync(keyAddressPair.address, options)
                        })
                    ),
                    (keyAddressPair, balance) => ({ ...keyAddressPair, balance })
                )
            )
        }),
        map(privateKeyInfo => {
            const { address, key } = privateKeyInfo

            const blokchain = state.walletsState.selectedBlokchain

            const coins = state.walletsState.selectedCoinsFromCoinChoseList

            const walletInfo = {
                address,
                blokchain,
                coins,
                key
            }

            return walletInfo
        })
    )),
    map(walletInfo => gotToWalletInfoStep(walletInfo))
)

export const addWalletToWalletsEpic = (action$, state$) => action$.pipe(
    ofType(GENERATE_WALLET_COMPLETED_NEW),
    withLatestFrom(state$),
    // eslint-disable-next-line
    map(([action, state]) => {
        const walletInfo = state.walletsState.walletInfo

        const newWallet = new Wallet(walletInfo)

        return addWalletToWallets(newWallet)
    })
)

export const uploadWalletsEpic = (action$, state$) => action$.pipe(
    ofType(UPLOAD_WALLETS_NEW),
    withLatestFrom(state$),
    map(([action, state]) => {
        const loadedWallets = action.loadedWallets

        const existingWallets = state.walletsState.wallets

        const mergerResult = mergeWallets(loadedWallets, existingWallets)

        if (mergerResult.duplicated.length > 0) {
            const warningInfo = {
                message: 'Such wallet(s) already loaded!',
                walletsDuplicated: mergerResult.duplicated
            }

            return uploadAndReplaceDuplicateWallets(warningInfo, mergerResult.duplicated, mergerResult.unique)
        } else {
            return uploadUniqueWallets(mergerResult.unique)
        }
    })
)

const mergeWallets = (loadedWallets, existingWallets) => {
    const duplicated = []
    const unique = []

    let existingWalletsIndex = 0
    let loadedWalletsIndex = 0

    for (; loadedWalletsIndex < loadedWallets.length; loadedWalletsIndex++) {
        let isUniqe = true

        for (; existingWalletsIndex < existingWallets.length; existingWalletsIndex++) {
            const firstOperand = loadedWallets[loadedWalletsIndex]

            const secondOperand = existingWallets[existingWalletsIndex]

            if (equal(firstOperand, secondOperand, 'address')) {
                isUniqe = false;

                const duplicate = new Wallet(loadedWallets[loadedWalletsIndex])

                duplicated.push(duplicate)

                break
            }
        }

        if (isUniqe) {
            const uniqueWallet = new Wallet(loadedWallets[loadedWalletsIndex])

            unique.push(uniqueWallet)
        }
    }

    const mergerResult = {
        duplicated,
        unique
    }

    return mergerResult
}

export const addNewCoinsEpic = (action$, state$) => action$.pipe(
    ofType(
        ADD_WALLET_TO_WALLETS_NEW,
        UPLOAD_UNIQUE_WALLETS_NEW,
        UPLOAD_AND_REPLACE_DUPLICATE_WALLETS_NEW
    ),
    withLatestFrom(state$),
    map(([action, state]) => {
        const uniqueWallets = []

        if (action.type === ADD_WALLET_TO_WALLETS_NEW) {
            uniqueWallets.push(action.newWallet)
        } else {
            uniqueWallets.push(...action.uniqueWallets)
        }

        const { coinInfos, network } = state.walletsState

        return {
            uniqueWallets,
            coinInfos,
            network
        }
    }),
    switchMap(({ uniqueWallets, coinInfos, network }) => ObservableFrom(uniqueWallets).pipe(
        mergeMap(
            uniqueWallet => ObservableFrom(uniqueWallet.Coins).pipe(
                map(symbol => coinInfos[uniqueWallet.Blokchain][symbol]),
            ),
            (uniqueWallet, coinInfo) => ({ uniqueWallet, coinInfo }),
        ),
        mergeMap(
            ({ uniqueWallet, coinInfo }) => {
                const address = uniqueWallet.address

                const options = {
                    network,
                    coinType: coinInfo.type,
                    contractAddress: coinInfo.contractAddress
                }

                const blokchain = uniqueWallet.Blokchain

                return getApiProviderAsync(blokchain).pipe(
                    switchMap(apiProvider => apiProvider.getBalanceAsync(address, options))
                )
            },
            ({ uniqueWallet, coinInfo }, balance) => {

                const coin = new Coin({
                    ...coinInfo,
                    balance,
                    address: uniqueWallet.Address
                })

                return coin
            }
        ),
        reduce((coins, coin) => {
            coins.push(coin)
            return coins
        }, []))
    ),
    map(newCoins => addNewCoins(newCoins))
)

export const updateCoinsCoursesEpic = (action$, state$) => action$.pipe(
    ofType(
        ADD_NEW_COINS_NEW,
        UPDATE_COINS
    ),
    withLatestFrom(state$),
    // eslint-disable-next-line
    switchMap(([action, state]) => {
        const coins = state.walletsState.coins

        const symbolsQuery = coins.reduce(
            (symbolsQuery, coin) => symbolsQuery += `${coin.symbol.toUpperCase()},`,
            ''
        )

        const cryptocompare_cource_api = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbolsQuery}&tsyms=USD`

        return ObservableFrom(
            fetch(cryptocompare_cource_api)
                .then(response => response.json())
                .then(coinsCourses => {
                    return new Courses(coinsCourses)
                })
                .catch(error => error)
        ).pipe(
            map(coinsCourses => {
                return coinsCourses.updateCourses(coins)
            })
        )
    }),
    map(coinsWithUpdatedCourse => updateCoinsCourses(coinsWithUpdatedCourse))
)

export const selectCoinEpic = (action$, state$) => action$.pipe(
    ofType(ADD_NEW_COINS_NEW),
    withLatestFrom(state$),
    // eslint-disable-next-line
    map(([action, state]) => first(state.walletsState.coins)),
    map(selectedCoin => showCoinDetails(selectedCoin))
)

export const getTransactionsBySelectedCoinEpic = (action$, state$) => action$.pipe(
    ofType(SHOW_COIN_DETAILS_NEW),
    withLatestFrom(state$),
    // eslint-disable-next-line
    mergeMap(([action, state]) => {
        const coin = state.walletsState.selectedCoin

        const blokchain = coin.blokchain

        const network = state.walletsState.network

        const options = {
            network
        }

        return getApiProviderAsync(blokchain).pipe(
            switchMap(apiProvider => apiProvider.getTransactionsAsync(coin, options)),
            map(transactions => {
                return transactions.map(rawTransaction => new Transaction(rawTransaction))
            })
        )
    }),
    map(transactionsBySelectedCoin => {
        return getTransactionsBySelectedCoin(transactionsBySelectedCoin)
    })
)

export const getDataChartEpic = (action$, state$) => action$.pipe(
    ofType(
        GET_LINE_CHART_DATA,
        SHOW_COIN_DETAILS_NEW
    ),
    withLatestFrom(state$),
    // eslint-disable-next-line
    switchMap(([action, state]) => {
        const symbolToUpper = state.walletsState.selectedCoin.symbol.toUpperCase()

        return ObservableFrom(
            fetch(`https://min-api.cryptocompare.com/data/histominute?fsym=${symbolToUpper}&tsym=USD&limit=30`)
                .then(response => response.json())
                .catch(error => error)
        )
    }),
    map(data => getLineChartDataSuccess(data.Data))
)

export const updateCoinsEpic = (action$, state$) => action$.pipe(
    ofType(CHECK_COINS_BALANCE),
    withLatestFrom(state$),
    // eslint-disable-next-line
    map(([action, state]) => state.walletsState),
    switchMap(walletsState => ObservableOf(...walletsState.coins).pipe(
        mergeMap(
            coin => {
                const address = coin.Address

                const network = walletsState.network

                const options = {
                    network,
                    coinType: coin.Type,
                    contractAddress: coin.ContractAddress
                }

                const blokchain = coin.Blokchain

                return getApiProviderAsync(blokchain).pipe(
                    switchMap(apiProvider => apiProvider.getBalanceAsync(address, options))
                )
            },
            // eslint-disable-next-line
            (coinWithOldBalance, newBalance) => {
                coinWithOldBalance.balance = newBalance
                const coin = new Coin({
                    ...coinWithOldBalance,
                    balance: newBalance
                })

                return coin
            }
        ),
        reduce((coins, coin) => {
            coins.push(coin)
            return coins
        }, []))
    ),
    map((coins) => updateCoins(coins))
)

export const updateCoinDetails = (action$, state$) => action$.pipe(
    ofType(UPDATE_COINS),
    withLatestFrom(state$),
    // eslint-disable-next-line
    map(([action, state]) => {
        const {
            coins,
            selectedCoin,
            network
        } = state.walletsState

        const targetCoinId = `${selectedCoin.Address}${selectedCoin.SmartContract ? selectedCoin.SmartContract : ''}${selectedCoin.Symbol}`

        const selectedUpdatedCoin = first(coins.filter(nextCoin => {
            const nextCoinCoinId = `${nextCoin.Address}${nextCoin.SmartContract ? nextCoin.SmartContract : ''}${nextCoin.Symbol}`

            return targetCoinId === nextCoinCoinId
        }))

        return {
            selectedUpdatedCoin,
            network
        }
    }),
    mergeMap(updateInfo => {
        const selectedUpdatedCoin = updateInfo.selectedUpdatedCoin

        const blokchain = updateInfo.selectedUpdatedCoin.Blokchain

        const network = updateInfo.network

        const options = {
            network
        }

        return getApiProviderAsync(blokchain).pipe(
            switchMap(apiProvider => apiProvider.getTransactionsAsync(selectedUpdatedCoin, options)),
            map(transactions => {
                const transactionsBySelectedUpdatedCoin = transactions.map(rawTransaction => new Transaction(rawTransaction))

                return updateSelectedCoins(
                    selectedUpdatedCoin,
                    transactionsBySelectedUpdatedCoin
                )
            })
        )
    })
)
