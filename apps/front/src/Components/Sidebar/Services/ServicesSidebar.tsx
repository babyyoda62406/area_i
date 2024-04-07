



export const HandlerSidebar = (arg: string, ruta: any, setShowModal: (arg: boolean) => void) => {




	switch (arg) {
		case 'gestionProyectos':
			ruta('/Home/gestiongeneral')

			break

		case 'GestionOrganizaciones':
			ruta('/Home/gestion_organizaciones')
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