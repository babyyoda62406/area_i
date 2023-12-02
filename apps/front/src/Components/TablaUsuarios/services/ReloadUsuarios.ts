
import { RutaServer } from "../../../Helpers/RutaServer"

import { ALerta } from "../../../Services/Alerta"
import { FetchService } from "../../../Services/FetchService"
import { INTUsuario } from "../interfaces/Usuario"


/**
 * 
 * @param token 
 * @param setData 
 */

export const reloadUsuarios = (token: string, setDatos: Function)=> {

	
		

	FetchService(RutaServer.getUsuarios, {
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

						datos.map((element: INTUsuario) => {
							return element.key = element.id
						})
						
						
						setDatos([...datos, {}])


						break

					case 204:
						ALerta({ title: 'por favor agregue algun usuario', icon: 'warning' })
						break

					case 304:
						let dataNM = await res.json()
						dataNM.map((element: INTUsuario) => {
							return element.key = element.id
						})
						
						setDatos(dataNM)
						
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
						console.log('error en tabla de gestion Usuarios')
						break
				}
				
			})



			
	

	// return devolverDatos
}