import { typesRutasServer } from "../Types/TpRutasServer";

// const prefix = 'api'
// const version = 'v1'

export const RutaServer: typesRutasServer = {
    iniciarSesion: '/api/v1/auth/login',
    getProyectos: '/api/v1/proyecto',
    setProyectos: '/api/v1/proyecto/',
    getOrganizaciones: '/api/v1/organizacion',
    getRolsProyecto: '/api/v1/roles-proyectos/'
    
    

}