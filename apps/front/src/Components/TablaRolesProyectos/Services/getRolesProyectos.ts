import { RutaServer } from "../../../Helpers/RutaServer";
import { ALerta } from "../../../Services/Alerta";
import { FetchService } from "../../../Services/FetchService";
import { ItfDataRolesProyectos } from "../interfaces/ItfTableRoles";


export const getRolesProyectos = (token: string, setData: (arg: ItfDataRolesProyectos[]) => void) => {
    
    FetchService(RutaServer.getRolsProyecto, {
        headers: {
            'Content-Type': 'application/json',
            "token": token
        }
    })
        .then(async (res) => {
        
            switch (res.status) {
                case 200:
                    const elements = await res.json()
                    const result = elements.map((item:ItfDataRolesProyectos, index: number) => {
                        
                        return {...item,['numElement']:index+1}
                    })
                    setData(result)

                    break
                
                case 204:
                    ALerta({title:'Por Favor Agregue Algun Rol',icon:'warning', position:'center'})
                    break
                
                case 304:
                    const elementsCache = await res.json()
                    const resultCache = elementsCache.map((item:ItfDataRolesProyectos, index: number) => {
                        
                        return {...item,['numElement']:index+1}
                    })
                    setData(resultCache)

                    break
                
                case 400:
                    const {message:messBad} = await res.json()
                    ALerta({title:messBad,icon:'warning', position:'center'})
                    
                    break
                case 401:
                    const {message:messReq} = await res.json()
                    ALerta({title:messReq,icon:'error'})
                    break
                
                case 404:
                        ALerta({title:"por Favor verifique su conexion",icon:"error"})
                    break
                
                case 409:
                    const {message:messConf} = await res.json()
                    ALerta({title:messConf,icon:'warning', position:'center'})
                    
                    break
                
                default :
                    ALerta({title:"Status desconocido",icon:"warning", position:'center'})
                    break
            }
        })
    .catch(err=>console.log(err))
    


}