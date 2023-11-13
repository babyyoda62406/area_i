import { Body, Controller,  Get, Post } from '@nestjs/common';
import { CrearProyectoDTO } from './dto/CrearProyecto.dto';
import { ProyectosService } from './proyectos.service';
import { HelpersService } from '../helpers/helpers.service';

@Controller('proyectos')
export class ProyectosController {
    constructor( private svProyectos: ProyectosService ,private svHelpers: HelpersService ){}


    @Get()
    async getProyectos(){
        return this.svProyectos.obtenerProyectos() ; 
    }

    
    
    @Post()
    async crearProyecto(@Body() proyecto: CrearProyectoDTO){
        const tempProyecto = await this.svProyectos.crearProyecto(proyecto);       
        return{message: 'Proyecto creado' , proyecto:this.svHelpers.filterObjet(tempProyecto, ['id', 'nombre', 'organizacion'])}; 
    }

    

}
