import { ItfUpdateTablesInline } from "../Interfaces/TableInterfaces";
import { ALerta } from "./Alerta";
import { FetchService } from "./FetchService";


/**
 * 
 * @param arg:ItfUpdateTablesInline
 * 
 * @returns 
 */

export const UpdateInlineTable = (arg: ItfUpdateTablesInline) => {

    const { url, tableType, token, actualizarTabla, setActualizarTabla, paramsUpdate, paramsOld } = arg
    const dataServer: { [key: string]: string } = {}

    Object.keys(paramsUpdate).forEach((item) => {

        if (paramsUpdate[item] !== paramsOld[item]) {
            dataServer[item] = paramsUpdate[item]
        }
    })

    
    if (Object.keys(dataServer).length !== 0) {
       
        FetchService(`${url}/${paramsUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(dataServer),
        })
            .then(async (res) => {
                switch (res.status) {

                    case 200:
                        const { message: mesSucces } = await res.json()
                        setActualizarTabla({ ...actualizarTabla, [tableType]: !actualizarTabla[tableType] })
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
                        ALerta({ title: 'error no registrado', text:String(res.status), icon: 'warning' })
                        break;

                }
            })
            .catch(err => console.error(err))
        
        

    } 
    return paramsOld

}