import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CrearRolProyectoDTO } from './dto/CrearRolProyecto.dto';
import { RolesProyectosService } from './roles-proyectos.service';
import { EditarRolProyecto } from './dto/EditarRolProyecto.dto';

@Controller('roles-proyectos')
export class RolesProyectosController {
    constructor(private svRolProyectos: RolesProyectosService){}

    @Post()
    async crearRolPRoyecto(@Body() rolProyecto: CrearRolProyectoDTO){
         return await this.svRolProyectos.crearRolProyecto(rolProyecto);         
    }

    @Get()
    async getRolesProyectos(){
        return await this.svRolProyectos.obtenerRolesProyectos();
    }


    @Delete(':id')
    async deleteRolesProyectos(@Param('id' , ParseIntPipe) id: number){
        return  await this.svRolProyectos.eliminarRolesProyectos(id); 
    }

    @Patch(':id')
    async editarRolesProyecto(@Param('id', ParseIntPipe) id: number  ,@Body() RolProyecto: EditarRolProyecto){
        const rolEditado =  await this.svRolProyectos.editarRolProyecto( id , RolProyecto ); 

        return {message: "Rol de proyecto editado" , id: rolEditado.id }
    }

}
