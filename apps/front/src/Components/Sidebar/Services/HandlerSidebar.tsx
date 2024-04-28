



export const handlerSidebar = (arg: string, ruta:(arg:string)=>void ,location:any) => {



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


		case 'gestionRoles':
			!location.pathname.includes('gestion_organizaciones') ?
				ruta('/home/gestion_roles'):ruta('/Home')
			break

		default:
			console.log('el sidebar no tiene este elemento configurado')
			console.log(arg)
			break


	}
}