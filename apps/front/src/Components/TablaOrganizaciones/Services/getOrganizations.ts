import { RutaServer } from "../../../Helpers/RutaServer";
import { ALerta } from "../../../Services/Alerta";
import { FetchService } from "../../../Services/FetchService";
import { tpDataOrganizations } from "../Types/DataOrganizations";

export const getOrganizations = (token:string,setData:(arg:tpDataOrganizations[])=>void) => {
    
    FetchService(RutaServer.getOrganizaciones, {
		headers: {
			'Content-Type': 'application/json',
			"token": token
		}
    })
        .then(async (res) => {
        
            switch (res.status) {
                case 200:
                    const data = await res.json()
                    setData([...data ])
                    break
                
                case 204:
                ALerta({title:'estado 200', icon:'success'})
                    
                    break
                
                case 400:
                ALerta({title:'estado 200', icon:'success'})

                    break
                
                case 404:
                ALerta({title:'estado 200', icon:'success'})

                    break
                
                case 409:
                ALerta({title:'estado 200', icon:'success'})

                    break
                default:
                    alert('oye mijo coge el error')
                ALerta({title:'estado Desconocido', icon:'error'})

                    break
            }
        })
    .catch(err=>console.log(err))



}