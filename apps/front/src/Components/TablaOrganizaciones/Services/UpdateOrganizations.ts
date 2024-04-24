import { GridRowId } from "@mui/x-data-grid"
import { RutaServer } from "../../../Helpers/RutaServer"
import { ALerta } from "../../../Services/Alerta"
import { FetchService } from "../../../Services/FetchService"
import { tpActualizarTabla } from "../../../Types/UseStates"

export const UpdateOrganization = (
    token: string,
    id: GridRowId,
    data: string,
    actualizarTabla:tpActualizarTabla,
    setActualizarTabla: (arg:tpActualizarTabla) => void,
    setShowModal:(arg:boolean)=>void) => {


    const sendValue = {"nombre":data}
    
    FetchService(`${RutaServer.getOrganizaciones}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        },
        body: JSON.stringify(sendValue),
    }
    )
        .then(async (res) => {
            switch (res.status) {
                case 200:
                    const { message:succes } = await res.json()
                    ALerta({ title: succes, icon: 'success', position: 'top-right' })
                    setActualizarTabla({...actualizarTabla,['tablaOrganizaciones']:!actualizarTabla.tablaOrganizaciones})
                    setShowModal(false)
                    break
                
                case 400:
                    const { message:err4} = await res.json()

                    ALerta({ title: err4, icon: 'error', position: 'top-right' })
                    break
                
                case 409:
                    const { message:conflict } = await res.json()
                    ALerta({title:conflict,icon:'error',position:'center'})
                    break
                default:
                    ALerta({
                        title: 'estado de resupuesta no controlado',
                        text: String(res.status),
                        icon: 'warning',
                        position:'center'
                    })
                    break

            }
        })
        .catch(err => console.error(err))
}