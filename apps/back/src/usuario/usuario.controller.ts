import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CrearUsuarioDTO } from './dto/CrearUsuario.dto';
import { UsuarioService } from './usuario.service';

/**
 * Controladores de la ruta /usuarios
 */
@Controller('usuarios')
export class UsuarioController {
    constructor(private svUsuario: UsuarioService) {

    }

    /**
     * Obtener todos los usuario
     * @returns Usuarios[] | HttpException
     */
    @Get()
    async getAllUsuarios() {        
        const tempUsuarios = await this.svUsuario.getUsuarios();
        if(!tempUsuarios.length) throw new HttpException('No hay usuarios que mostrar', HttpStatus.NO_CONTENT)

        return tempUsuarios ; 
    }

    /**
     * Controlador para agregar un usuario
     * @param user Objeto de tranferencia de datos que reprecenta el usuario
     * @returns Objeto response.
     */
    @Post()
    async crearUsuario(@Body() user: CrearUsuarioDTO) {
        const tempUser  = await this.svUsuario.crearUsuario(user); 

        return {
            message: 'Usuario Creado',
            id: tempUser.id            
        };
    }

}

