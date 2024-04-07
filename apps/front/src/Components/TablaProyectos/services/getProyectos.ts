import { RutaServer } from "../../../Helpers/RutaServer"
import { ALerta } from "../../../Services/Alerta"
import { FetchService } from "../../../Services/FetchService"
import { typeDatosProyServer } from "../../../Types/CMP"




export const getProyectos = (token: string, setData: (arg:typeDatosProyServer[])=>void) => {



	FetchService(RutaServer.getProyectos, {
		headers: {
			'Content-Type': 'application/json',
			"token": token
		}
	})
		.then(async (res: Response) => {

			
			switch (res.status) {
				case 200:
					let datos = await res.json()
					datos = datos.map((item:typeDatosProyServer) => {
						const {  organizacion } = item
						return {...item,['nombreOrg']:organizacion?.nombre,['idOrg']:organizacion?.id}
					})
					setData(datos)
					break

				case 204:
					ALerta({ title: 'por favor agregue algun proyecto', icon: 'warning' })
					break

				case 304:
					let dataNM = await res.json()
					dataNM = dataNM.map((item:typeDatosProyServer) => {
						const { organizacion } = item
						return {...item,['nombreOrg']:organizacion?.nombre,['idOrg']:organizacion?.id}
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