import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearUsuarioDTO } from './dto/CrearUsuario.dto';
import { UsuarioService } from './usuario.service';

/**
 * Controladores de la ruta /usuarios
 */
@Controller('usuarios')
export class UsuarioController {
    constructor(private svUsuario: UsuarioService) {

    }

    @Get()
    getAllUsuarios() {

        return 'Todos los usuarios';
    }

    @Post()
    async crearUsuario(@Body() user: CrearUsuarioDTO) {
        const tempUser  = await this.svUsuario.crearUsuario(user); 

        return {
            message: 'Usuario Creado',
            id: tempUser.id            
        };
    }
}

