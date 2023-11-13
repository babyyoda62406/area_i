

export const FetchService = (url: string, bag: object) => fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: '',
    ...bag
})