import { RutaServer } from "../../../Helpers/RutaServer";
import { FetchService } from "../../../Services/FetchService";
import { ItfTableRolesProyectos } from "../interfaces/ItfTableRoles";


export const getRolesProyectos = (token: string, setData: (arg: ItfTableRolesProyectos) => void) => {
    
    FetchService(RutaServer.getRolsProyecto, {
        headers: {
            'Content-Type': 'application/json',
            "token": token
        }
    })
        .then(async (res) => {
        
            switch (res.status) {
                case 200:
                    
                    
                    setData()

                    break
                
                case 204:
                    break
                
                case 304:

                    break
                
                case 400:
                    break
                case 401:
                    break
                
                case 404:

                    break
                
                case 409:
                    
                    break
                
                default :
                    
                    break
            }
        })
    .catch(err=>console.log(err))
    


}