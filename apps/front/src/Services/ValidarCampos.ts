
/**
 * 
 * @param tipo 
 * @param formulario 
 * @returns
 * retorna true si hay una anomalia  de lo contrario retorna false 
 */



export const ValidarCampos = (tipo: string, formulario: string): boolean => {
    
    const expresionRegularEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    switch (tipo) {
        case 'email':
            if (!formulario.trim().length) {
                return true
            } else if (!expresionRegularEmail.test(formulario)) {
                return true
            }

            return false
            break;

        case 'password':

            if (!formulario.trim().length) {
                console.log('la cadena de password esta vacia')
                return true
            }else if(formulario.trim().length < 8) {
                return true
            }

            return false
            break;

        default:
            return true
            break;
    }

}