import { GridRowId } from "@mui/x-data-grid";
import { FetchService } from "../../../Services/FetchService";
import { RutaServer } from "../../../Helpers/RutaServer";
import { ALerta } from "../../../Services/Alerta";

export const DeleteElement = (idData: GridRowId,token:string) => {
    
    
    
    FetchService(`${RutaServer.setProyectos}/${idData}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        }
    })
        .then(async(res) => {
            switch (res.status) {
                case 200:
                    const {message}= await res.json() 
                    ALerta({ text: message, icon: 'success' })
                    
                    break
                case 400:
                    const { message: messagePro } = await res.json()
                    ALerta({ title: messagePro, icon: 'error' })
                    break
                
                    case 500:
                        const { message: messageServer } = await res.json()
                        ALerta({ title: messageServer, icon: 'error' })
                        break
                
                default:
                    ALerta({ title: 'estado desconocido' })
                    
        }
    })

    
    
}

