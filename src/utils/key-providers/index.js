import { Observable } from 'rxjs'
import Ethereum from './ethereum/provider'
import Bitcoin from './bitcoin/provider'

const ProviderName = {
    Bitcoin: 'BITCOIN',
    Ethrerum: 'ETHEREUM'
}

const getKeyProviderAsync = providerName => Observable.create(observer => {
    switch (providerName.toUpperCase()) {
        case ProviderName.Ethrerum: {
            observer.next(Ethereum)
            observer.complete()
            break
        }

        case ProviderName.Bitcoin: {
            observer.next(Bitcoin)
            observer.complete()
            break
        }

        default: {
            observer.error(new Error('Unknown key provider name.'))
            break
        }
    }
})

export default getKeyProviderAsync