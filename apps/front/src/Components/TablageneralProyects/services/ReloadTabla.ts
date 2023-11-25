import { RutaServer } from "../../../Helpers/RutaServer"
import { Item } from "../../../Interfaces/TableInterfaces"
import { ALerta } from "../../../Services/Alerta"
import { FetchService } from "../../../Services/FetchService"



export const reloadTabla = (token: string,setData:Function) => {
  
   
      
    FetchService(RutaServer.getProyectos, {
      headers: {
        'Content-Type': 'application/json',
        "token": token
      }
    })
      .then(async (res: Response) => {
        console.log(res.status)

        switch (res.status) {
          case 200:
            let datos = await res.json()
            
            datos.map((element: Item) => {
              return element.key = element.id
            })
            setData(datos)
           
            
            break

          case 204:
            ALerta({ title: 'por favor agregue algun proyecto', icon: 'warning' })
            break

          case 304:
            let dataNM = await res.json()
            dataNM.map((element: Item) => {
              return element.key = element.id
            })
            setData(dataNM)
            break

          case 400:
            const { message: errorMess } = await res.json()
            ALerta({ title: errorMess, icon: 'error' })
            break

          case 500:
            const { message: messErr } = await res.json()
            ALerta({ title: messErr, icon: 'error' })
            break

          default:
            console.log('error en tabla de gestion general')
            break
        }
      })
  }