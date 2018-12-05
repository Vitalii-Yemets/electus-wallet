
import { PathBuilder } from '../utils/path-builder'
import Constants from './constants'

const rpc = apiToken => {
    const path = new PathBuilder()
        .base(`v3/${apiToken}`)
        .serialize()

    return path
}

export const InfuraRpc = () => rpc(Constants.ApiTokens.Infura)

