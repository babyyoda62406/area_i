


export const ReadToken = (token:string) => {
    
    const [_, encodedPayload] = token.split('.')

    const decodedPayload = JSON.parse(atob(encodedPayload))
    
    return decodedPayload.id 
}