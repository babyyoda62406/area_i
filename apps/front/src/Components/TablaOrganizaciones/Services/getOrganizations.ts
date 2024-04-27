import { RutaServer } from "../../../Helpers/RutaServer";
import { ALerta } from "../../../Services/Alerta";
import { FetchService } from "../../../Services/FetchService";
import { tpDataOrganizations } from "../Types/DataOrganizations";

export const getOrganizations = (token: string, setData: (arg: tpDataOrganizations[]) => void) => {

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
                    const elementFinallly = data.map((item: tpDataOrganizations, index: number) => {
                        item['numElement'] = index + 1
                        return item
                    })
                    setData([...elementFinallly])
                    break

                case 204:
                    const {message:messNoContent} = await res.json()
                    ALerta({title:messNoContent, icon:'warning'})
                    
                    break
                
                case 304:
                    const dataCache = await res.json()
                    const elementCache = dataCache.map((item: tpDataOrganizations, index: number) => {
                        return item['numElement'] = index + 1
                    })
                    setData([...elementCache])

                    break

                case 400:
                    const {message:messError} = await res.json()
                    ALerta({ title: messError, icon: 'error' })
                    break

                case 404:
                    const {message:messNf} = await res.json()
                    ALerta({ title: messNf, icon: 'error' })
                    break

                case 409:
                    const {message:messConflict} = await res.json()
                    ALerta({ title: messConflict, icon: 'warning' })
                    break
                
                default:
                    alert('oye mijo coge el error')
                    ALerta({ title: 'estado Desconocido', icon: 'error' })

                    break
            }
        })
        .catch(err => console.log(err))



}