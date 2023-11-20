
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

type typeShowModal = {
    proyectos: boolean
}

type typeActualizarTabla = {
    tablaProyectos:number
}

export type {
    typeDatosForm,
    typeErrorForm,
    typeSubElAside,
    typeShowModal,
    typeActualizarTabla
}