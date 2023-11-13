import { Body, Controller,  Delete,  Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CrearProyectoDTO } from './dto/CrearProyecto.dto';
import { ProyectosService } from './proyectos.service';
import { HelpersService } from '../helpers/helpers.service';
import { EditarProyectoDTO } from './dto/EditarProyecto.dto';


@Controller('proyectos')
export class ProyectosController {
    constructor( private svProyectos: ProyectosService ,private svHelpers: HelpersService ){}


    @Get()
    async getProyectos(){
        return this.svProyectos.obtenerProyectos() ; 
    }

    @Get(':id')
    async getProyectoById(@Param('id' , ParseIntPipe) id: number){
        return await this.svProyectos.obtenerProyecto(id); 
    }


    @Get('user/:ownerId')
    async getProyectosPorUsuario(@Param('ownerId' , ParseIntPipe) ownerId: number){
        return await this.svProyectos.ObtenerProyectosPorUsuario(ownerId) ;       
    }
    
    
    @Post()
    async crearProyecto(@Body() proyecto: CrearProyectoDTO){
        const tempProyecto = await this.svProyectos.crearProyecto(proyecto);       
        return{message: 'Proyecto creado' , proyecto:this.svHelpers.filterObjet(tempProyecto, ['id', 'nombre', 'organizacion'])}; 
    }

    @Patch(':id')
    async editarProyecto(@Param('id', ParseIntPipe) id: number, @Body() proyecto:EditarProyectoDTO){
        return await this.svProyectos.editarProyecto(id , proyecto); 
    }

    @Delete(':id')
    async eliminarProyectos(@Param('id', ParseIntPipe) id: number){
        return await this.svProyectos.softDeleteProyecto(id); 
    }
    

}
