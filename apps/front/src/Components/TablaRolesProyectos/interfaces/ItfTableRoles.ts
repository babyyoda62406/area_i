
export interface ItfTableRolesProyectos {
    id: number
    nombre: string
    estado: "Activo" | "Inactivo"
    enUso: boolean
    numElement?:number
}