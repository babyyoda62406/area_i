import { RutaServer } from "../../../Helpers/RutaServer"

import { ALerta } from "../../../Services/Alerta"
import { FetchService } from "../../../Services/FetchService"
import { typeDatosProyServer } from "../../../Types/CMP"
import { tpActualizarTabla } from "../../../Types/UseStates"
import { tpColumnModified } from "../types/tpcolumnas"

export const DatoModificado = (
    token: string,
    paramsUpdate: any,
    paramsold: any,
    columnModified: tpColumnModified,
    data: typeDatosProyServer[],
    setData: (arg: typeDatosProyServer[]) => void,
    actualizarTabla: tpActualizarTabla,
    setActualizarTabla:(arg:tpActualizarTabla)=>void) => {

    const elementModified = paramsUpdate
    

    
    const newValue = {
        'id': elementModified.id,
        [columnModified.column]: elementModified[columnModified.column]
    }
    console.log(newValue)
    let newUrl = ` ${RutaServer.getProyectos}/${elementModified.id}`
    FetchService(newUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        },
        body: JSON.stringify(newValue),
    })
        .then(async (res: Response) => {
            switch (res.status) {

                case 200:
                    
                    const { message: mesSucces, newProyecto } = await res.json()
                    let position = data.findIndex(element => element.uid === newProyecto.id)
                    
                    const newData = [...data]
                    newData[position] = {
                        ...newData[position],
                        ...newProyecto
                    }
                    
                    setData(newData)
                    ALerta({ title: mesSucces, icon: "success", position: 'top-right' })
                    setActualizarTabla({...actualizarTabla,['tablaProyectos']:!actualizarTabla.tablaProyectos})
                    break;

                case 400:
                    const { message: mesError } = await res.json()
                    ALerta({ title: mesError, icon: "error", position: 'center' })
                    break;

                case 409:
                    const { message: mesErrorDat } = await res.json()
                    ALerta({ title: mesErrorDat, icon: "error", position: 'center' })
                    break;

                default:
                    ALerta({ title: 'por favor revise su conexion', icon: 'warning' })
            }
        })

    return paramsold
}