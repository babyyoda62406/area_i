import { typesRutasServer } from "../Types/TpRutasServer";

// const prefix = 'api'
// const version = 'v1'

export const RutaServer: typesRutasServer = {
    iniciarSesion: '/api/v1/auth/login',
    getProyectos: '/api/v1/proyecto',
    getOrganizaciones:'/api/v1/organizacion',
    setProyectos: '/api/v1/proyecto/',
    getUsuarios: '/api/v1/usuarios/',
    addUsuario:  '/api/v1/usuarios/',
    updateUsuarios: '/api/v1/usuarios',
    deleteUsuarios: '/api/v1/usuarios',

}