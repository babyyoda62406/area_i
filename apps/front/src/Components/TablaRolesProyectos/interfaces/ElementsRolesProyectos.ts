

export interface ItfFormAddRolProy {
    setShowModal:(arg:boolean)=>void
}

export interface ItfDataAddRolProy {
    nombre?:string
}


export interface ItfDataUpdateRoles {
    
    nombre?: string
    estado?: "Activo" | "Inactivo"
    
}
