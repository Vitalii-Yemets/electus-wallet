export const get = options => {
    const {
        host,
        endpoint,
    } = options

    const url = `${host}${endpoint}`

    const fetchOptions = {
        method: 'GET',
        header: new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })
    }

    return fetch(url, fetchOptions)
        .catch(error => error)
}

export const post = options => {
    const {
        host,
        endpoint,
        body
    } = options

    const url = `${host}${endpoint}`

    const fetchOptions = {
        method: 'POST',
        header: new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }),
        body
    }

    return fetch(url, fetchOptions)
        .catch(error => error)
}