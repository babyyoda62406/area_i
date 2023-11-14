import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CrearRolProyectoDTO } from './dto/CrearRolProyecto.dto';
import { RolesProyectosService } from './roles-proyectos.service';
import { EditarRolProyecto } from './dto/EditarRolProyecto.dto';

/**
 * Clase Agrupadora de los controladores de la ruta .../roles-proyectos
 */
@Controller('roles-proyectos')
export class RolesProyectosController {
    constructor(private svRolProyectos: RolesProyectosService){}

    /**
     * Controlador para crear Rol de Proyecto
     * @param rolProyecto :CrearRolProyectoDTO
     * @returns JSON | HttpException
     */
    @Post()
    async crearRolPRoyecto(@Body() rolProyecto: CrearRolProyectoDTO){
         return await this.svRolProyectos.crearRolProyecto(rolProyecto);         
    }

    /**
     * Controlador de la ruta para obtener Roles de  proyectos
     * @returns RolProyecto[] | HttpException
     */
    @Get()
    async getRolesProyectos(){
        return await this.svRolProyectos.obtenerRolesProyectos();
    }

    /**
     * Controlador de la ruta para eliminar Roles de Proyecto
     * @param id :number Id del proyecto que se desea eliminar
     * @returns JSON | HttpStatus
     */
    @Delete(':id')
    async deleteRolesProyectos(@Param('id' , ParseIntPipe) id: number){
        return  await this.svRolProyectos.eliminarRolesProyectos(id); 
    }

    /**
     * Controlador de la ruta para Editar Roles de Proyectos
     * @param id :number número correspondiente al rol de proyecto que se desea editar.
     * @param RolProyecto Rol de Proyecto.
     * @returns JSON | HttpException 
     */
    @Patch(':id')
    async editarRolesProyecto(@Param('id', ParseIntPipe) id: number  ,@Body() RolProyecto: EditarRolProyecto){
        const rolEditado =  await this.svRolProyectos.editarRolProyecto( id , RolProyecto ); 

        return {message: "Rol de proyecto editado" , id: rolEditado.id }
    }

}
