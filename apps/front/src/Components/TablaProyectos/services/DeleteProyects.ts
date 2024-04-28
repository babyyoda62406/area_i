import { GridRowId } from "@mui/x-data-grid";
import { FetchService } from "../../../Services/FetchService";
import { RutaServer } from "../../../Helpers/RutaServer";
import { ALerta } from "../../../Services/Alerta";
import { tpActualizarTabla } from "../../../Types/UseStates";

export const DeleteProyects = (
    idData: GridRowId,
    token: string,
    actualizarTabla: tpActualizarTabla,
    setActualizarTabla: (arg: tpActualizarTabla) => void) => {

    FetchService(`${RutaServer.setProyectos}${idData}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        }
    })
        .then(async (res) => {
            console.log(res)
            console.log(res.status)
            switch (res.status) {
                case 200:
                    ALerta({ title: 'Delete de proyectos desconectado, funcion comprobada', icon: 'success' })
                    setActualizarTabla({ ...actualizarTabla, ['tablaProyectos']: !actualizarTabla.tablaProyectos })
                    break
                
                case 400:
                    ALerta({ title: ' Error 400', icon: 'error' })
                    break
                case 404:
                    ALerta({ title: "error not found", icon: 'error' })
                    break

                case 500:
                    ALerta({ title:"Por favor revise su conexion", icon: 'error' })
                    break

                default:
                    ALerta({ title: 'estado desconocido', icon: 'error' })
                    break
            }
        })
        .catch(err => console.log(err))


}

