
export interface ItfDataRolesProyectos {
    id: number
    nombre: string
    estado: "Activo" | "Inactivo"
    enUso: boolean
    numElement?:number
}

export interface ItfFormUpdateRol {
    data: ItfDataRolesProyectos
    
    setShowModal:(arg:boolean)=>void
}