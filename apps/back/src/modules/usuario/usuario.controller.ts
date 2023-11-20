import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CrearUsuarioDTO } from './dto/CrearUsuario.dto';
import { UsuarioService } from './usuario.service';
import { EditarUsuarioDTO } from './dto/EditarUsuario.dto';

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
        return { message: 'Usuario obtenido', usuario: Object.assign(tempUser, { password: '****' }) }
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


    /**
     * Controlador para editar Usuairos
     * @param id :number ID del usuario a editar
     * @param user :  EditarUsuarioDTO 
     * @returns JSON | HttpException
     */
    @Patch(':id')
    async setUsuario(@Param('id', ParseIntPipe) id: number,@Body() user: EditarUsuarioDTO) {
        if(!Object.keys(user).length) throw new HttpException('Debe enviar al menos un campo para editar :|', HttpStatus.BAD_REQUEST)
        return {user}
        // return {menssage: "Usuario editado" , id: (await this.svUsuario.setUsuario(id, user)).id};
    }

    /**
     * Eliminar usuario 
     * @param id :number --> Get /:id
     * @returns id del usuario Eliminado | HttpException
     */
    @Delete(':id')
    async deleteUsuario(@Param('id', ParseIntPipe) id: number) {
        const tempUser = await this.svUsuario.softDeleteUsuarioById(id);

        return {
            message: 'Usuario Eliminado',
            id: tempUser.id
        }
    }


}

