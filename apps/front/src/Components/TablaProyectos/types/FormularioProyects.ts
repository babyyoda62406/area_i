
import { GridRowId } from "@mui/x-data-grid"
import { typeDatosProyServer } from "../../../Types/CMP"

type tpFormularioUpdateProyects = {
    data: typeDatosProyServer
    id:GridRowId
    setShowModal:(arg:boolean)=>void
}

type tpDataUpdateProyect = {
    id: number
    nombre:string
    identificador: string
    nombreOrg: string
    estado:'Activo'|'Inactivo'

}
export type {
    tpFormularioUpdateProyects,
    tpDataUpdateProyect,

    
}