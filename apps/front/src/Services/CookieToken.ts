
import Cookies from 'js-cookie'

// /**
//  * 
//  * @param token 
//  * recibe el token para guardarlo por cinco minutos
//  * return void
//  */
export const CookieToken = (token:string) => {
    
    const tiempoExpiracion = new Date()
    tiempoExpiracion.setTime(tiempoExpiracion.getTime() + 5 * 60 * 1000)
    Cookies.set('token', token, { expires: tiempoExpiracion })
    return ''
} 