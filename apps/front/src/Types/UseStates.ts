type tpActualizarTabla = {
    tablaProyectos: boolean
    tablaOrganizaciones:boolean
    tablaUsuarios: boolean
    tablaRolesProyectos:boolean
}


type typeDatosForm = {
    correo: string|string
    password:string
}

/**
 * hook para controlar los errores en la validacion
 */
type typeErrorForm = {
    email: boolean
    password:boolean
}

type typeSubElAside = {
    element:string
}







export type {
    typeDatosForm,
    typeErrorForm,
    typeSubElAside,
    tpActualizarTabla
}