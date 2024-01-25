



export const HandlerSidebar = (arg: string, ruta: any, setShowModal: (arg: boolean) => void) => {




	switch (arg) {
		case 'gestionProyectos':
			ruta('gestiongeneral')

			break

		case 'AgregarProyectos':
			setShowModal(true)
			break

		case 'gestionUsuarios':
			

			ruta('/home/gestionusuarios')
			break
		
		default:
			console.log('el sidebar no tiene este elemento configurado')
			console.log(arg)
			break


	}
}