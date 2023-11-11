import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
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
        if (!tempUsuarios.length) throw new HttpException('No hay usuarios que mostrar', HttpStatus.NO_CONTENT)

        return tempUsuarios;
    }

    /***
     * Obtener un usuario Por ID
     * @param /id se concatena el id al final de la peticion get
     */

    @Get(':id')
    async getUsuario(@Param('id', ParseIntPipe) id: number) {
        const tempUser = await this.svUsuario.getUsuario(id);
        return {message: 'Usuario obtenido' , usuario: Object.assign(tempUser , {password: '****'})}
    }


    /**
     * Controlador para agregar un usuario
     * @param user Objeto de tranferencia de datos que reprecenta el usuario
     * @returns Objeto response.
     */
    @Post()
    async crearUsuario(@Body() user: CrearUsuarioDTO) {
        const tempUser = await this.svUsuario.crearUsuario(user);

        return {
            message: 'Usuario Creado',
            id: tempUser.id
        };
    }

    @Delete(':id')
    async deleteUsuario(@Param('id', ParseIntPipe) id: number){
        return await this.svUsuario.softDeleteUsuarioById(id); 
    }


}

