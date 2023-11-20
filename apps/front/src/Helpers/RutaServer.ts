import { typesRutasServer } from "../Types/TpRutasServer";

// const prefix = 'api'
// const version = 'v1'

export const RutaServer:typesRutasServer = {
    iniciarUsuario:   '/api/v1/auth/login',
    registrarUsuario: '/api/v1/auth/register',
    getProyectos:     '/api/v1/proyectos/',
    setProyectos:     '/api/v1/proyectos/'

}