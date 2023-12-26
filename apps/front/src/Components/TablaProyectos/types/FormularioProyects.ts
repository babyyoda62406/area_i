
import { GridRowId } from "@mui/x-data-grid"
import { typeDatosProyServer } from "../../../Types/CMP"

type tpFormularioUpdateProyects = {
    data: typeDatosProyServer
    id:GridRowId
    setShowModal:(arg:boolean)=>void
}
export type {
    tpFormularioUpdateProyects
    
}