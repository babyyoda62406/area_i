import { RutaServer } from "../../../Helpers/RutaServer";
import { Item } from "../../../Interfaces/TableInterfaces";
import { ALerta } from "../../../Services/Alerta";
import { FetchService } from "../../../Services/FetchService";
import { reloadTabla } from "../services/ReloadTabla";


/**
 * 
 * @param arg 
 * @param data 
 * @param token 
 */
export const EliminarFila = (arg:any,data:Item[],token:string,setData:Function) => {
    
    
        let elemento = arg
    
        const newData = data.filter((item) => item.id !== arg.id);
    
        FetchService(`${RutaServer.getProyectos}/${elemento.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "token": token
          },
          body: JSON.stringify(elemento)
    
        })
          .then(async (res: Response) => {
            switch (res.status) {
              case 200:
                const { message: messSucces } = await res.json()
                ALerta({ text: messSucces, icon: 'success', position:'top-right'})
                reloadTabla(token,setData)
                break
              
              case 400:
                const { message: messError } = await res.json()
                ALerta({ title: messError, icon: 'error' })
                break
              
              case 409:
              const { message: messDatI } = await res.json()
              ALerta({ title: messDatI, icon: 'error' })
                break
              
              case 500:
                ALerta({ title: 'por favor verifique su conexion de red', icon: "error" })
                break
              
              default:
                ALerta({title:'por favor reintente de nuevo',icon:'warning'})
            }
          })
    
      
}