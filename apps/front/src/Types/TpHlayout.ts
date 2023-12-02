import { INTUsuario } from "../Components/TablaUsuarios/interfaces/Usuario"

type typeHomeLayout = {

}
type typeNavbar = {
    

}
type typeTitleNavb = {

}

type typeHerrmtasNavb = {

}

type typeSidebar = {
    Show:boolean
}

type typeGestionG = {
    
}

type typeTablaProyectos = {

}
type typeDatosTablaProyectos = {
    id?: string
    organizacion: string
    nombre: string
    estado: string
    
}

type typeModificar = {

}

type typeGestionarUsuarios = {

}

type typeTablaUsuarios = {
    datos:INTUsuario[]
}


export type { 
    typeHomeLayout,
    typeNavbar,
    typeTitleNavb,
    typeHerrmtasNavb,
    typeSidebar,
    typeGestionG,
    typeTablaProyectos,
    typeDatosTablaProyectos,
    typeModificar,
    typeGestionarUsuarios,
    typeTablaUsuarios
 }