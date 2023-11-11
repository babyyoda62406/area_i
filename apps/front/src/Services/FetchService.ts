
/**
 * 
 * @param url 
 * @param bag 
 * @param resolve 
 * @param reject 
 */
export const FetchService = (url:string, bag:object, resolve:Function, reject:Function) => {
    
    fetch(url, bag)
        .then(res => {
            switch (res.status) {
                case 200:
                    res.json()
                    break;
            
            default:
                console.log(res)
                    break;
            }
        }
            )
        .then(data => resolve(data))
        .catch(err=>reject(err))
}