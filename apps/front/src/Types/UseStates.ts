
type typeDatosForm = {
    email: string|string
    password:string
}

/**
 * hook para controlar los errores en la validacion
 */
type typeErrorForm = {
    email: boolean
    password:boolean
}


export type {
    typeDatosForm,
    typeErrorForm
}