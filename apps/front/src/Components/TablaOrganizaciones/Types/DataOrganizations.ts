
type tpDataOrganizations = {
    numElement:number
    id: number
    nombre: string
    estado: 'Activo' | 'Inactivo'
    enUSo:boolean
}

type tpDataCreateOrg = {
    nombre:string
}


export type {
    tpDataOrganizations,
    tpDataCreateOrg
}