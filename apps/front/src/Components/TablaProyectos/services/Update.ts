import { RutaServer } from "../../../Helpers/RutaServer"
import { Item } from "../../../Interfaces/TableInterfaces"
import { ALerta } from "../../../Services/Alerta"
import { FetchService } from "../../../Services/FetchService"
import { tpColumnModified } from "../types/tpcolumnas"

export const DatoModificado = (
    token: string,
    paramsUpdate: any,
    paramsold: any,
    columnModified: tpColumnModified,
    data: Item[],
    setData:(arg:Item[])=>void) => {

    const elementModified = paramsUpdate
    

    const newValue = {
        'id': elementModified.id,
        [columnModified.column]: elementModified[columnModified.column]

    }

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
                    let position = data.findIndex(element => element.id === newProyecto.id)
                    
                    const newData = [...data]
                    newData[position] = {
                        ...newData[position],
                        ...newProyecto
                    }
                    
                    setData(newData)
                    ALerta({ title: mesSucces, icon: "success", position: 'top-right' })
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