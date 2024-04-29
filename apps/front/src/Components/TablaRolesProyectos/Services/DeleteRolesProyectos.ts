import { GridRowId } from "@mui/x-data-grid"
import { RutaServer } from "../../../Helpers/RutaServer"
import { ALerta } from "../../../Services/Alerta"
import { FetchService } from "../../../Services/FetchService"
import { tpActualizarTabla } from "../../../Types/UseStates"


export const DeleteRolProyectos = (token: string, id: GridRowId,actualizarTabla:tpActualizarTabla,setActualziarTabla:(arg:tpActualizarTabla)=>void) => {
    
    FetchService(`${RutaServer.getProyectos}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "token": token
        }
    })
        .then(async (res) => {
        
            switch (res.status) {
                case 200:
                    // const { message: messOK } = await res.json()
                    setActualziarTabla({...actualizarTabla,['tablaRolesProyectos']:!actualizarTabla.tablaRolesProyectos})
                    ALerta({title:'Eliminar desconectada, Peticion Controlada',icon:'success'})
                    break
            }
    })
}