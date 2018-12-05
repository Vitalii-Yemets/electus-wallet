import { Observable } from 'rxjs'
import * as Ethereum from './ethereum'
import * as Bitcoin from './bitcoin'

const ProviderName = {
    Bitcoin: 'BITCOIN',
    Ethrerum: 'ETHEREUM'
}

const getApiProviderAsync = providerName => Observable.create(observer => {
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

export default getApiProviderAsync