



export const handlerSidebar = (arg: string, ruta:(arg:string)=>void , setShowModal: (arg: boolean) => void,location:any) => {



	switch (arg) {
		case 'gestionProyectos':
			if (!location.pathname.includes('gestiongeneral')) {
				ruta('/Home/gestiongeneral')

			} else {
				ruta('/Home')
				
			}

			break

		case 'GestionOrganizaciones':
			if (!location.pathname.includes('gestion_organizaciones')) {
				ruta('/Home/gestion_organizaciones')
			} else {
				ruta('/Home')
			}
			break

		case 'AgregarProyectos':
			setShowModal(true)
			break

		case 'gestionUsuarios':


			ruta('/home/gestionusuarios')
			break

		case 'gestionRoles':

			ruta('/home/gestionRoles')
			break

		default:
			console.log('el sidebar no tiene este elemento configurado')
			console.log(arg)
			break


	}
}