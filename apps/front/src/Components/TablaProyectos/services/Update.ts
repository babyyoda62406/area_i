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
    // setData: (arg: typeDatosProyServer[]) => void,
    actualizarTabla: tpActualizarTabla,
    setActualizarTabla:(arg:tpActualizarTabla)=>void) => {

    const elementModified = paramsUpdate
    const element = data.find(item => item.id == elementModified.id)
    const newUrl = ` ${RutaServer.getProyectos}/${elementModified.id}`
        
    const newValue = {
        'id': elementModified.id,
        [columnModified.column]: elementModified[columnModified.column]
    }
    
    if (element) {
        
        if (element[columnModified.column as keyof typeof element] == elementModified[columnModified.column]) {
            return paramsUpdate
        }
  
    }
    
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
                    const { message: mesSucces} = await res.json()
                    setActualizarTabla({...actualizarTabla,['tablaProyectos']:!actualizarTabla.tablaProyectos})
                    ALerta({ title: mesSucces, icon: "success", position: 'top-right' })
                    
                    break;

                case 400:
                    const { message: mesError } = await res.json()
                    ALerta({ title: mesError, icon: "error", position: 'center' })
                    
                    break;

                case 409:
                    const { message: mesErrorDat } = await res.json()
                    // setActualizarTabla({...actualizarTabla,['tablaProyectos']:!actualizarTabla.tablaProyectos})
                    
                    ALerta({ title: mesErrorDat, icon: "error", position: 'center' })
                    break;

                default:
                    ALerta({ title: 'por favor revise su conexion', icon: 'warning' })
                    break
            }
        })
        .catch(err=>console.log(err))
        
    return paramsold
}