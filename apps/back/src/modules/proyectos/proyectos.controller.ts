import { Body, Controller,  Delete,  Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CrearProyectoDTO } from './dto/CrearProyecto.dto';
import { ProyectosService } from './proyectos.service';
import { HelpersService } from '../helpers/helpers.service';
import { EditarProyectoDTO } from './dto/EditarProyecto.dto';

/**
 * Clase agrupadora de controladores de la ruta .../proyectos
 */
@Controller('proyectos')
export class ProyectosController {
    constructor( private svProyectos: ProyectosService ,private svHelpers: HelpersService ){}

    /**
     * Controlador para obtener todos los proyectos 
     * @returns Proyecto[] | HttpException
     */
    @Get()
    async getProyectos(){
        return this.svProyectos.obtenerProyectos() ; 
    }


    /**
     * Controlador para obtener un proyecto por Id
     * @param id :number ID del proyecto que se desea obtener.
     * @returns Proyecto  | HttpException
     */
    @Get(':id')
    async getProyectoById(@Param('id' , ParseIntPipe) id: number){
        return await this.svProyectos.obtenerProyecto(id); 
    }


    /**
     * Controlador para obtener los proyectos "de"  un usuario.
     * @param ownerId :number id del usuario del cual se desea obtener los proyectos
     * @returns Proyecto[]  | HttpException
     */
    @Get('user/:ownerId')
    async getProyectosPorUsuario(@Param('ownerId' , ParseIntPipe) ownerId: number){
        return await this.svProyectos.ObtenerProyectosPorUsuario(ownerId) ;       
    }
    
    
    /**
     * Controlador para crear un proyecto 
     * @param proyecto :CrearProyectoDTO. 
     * @returns JSON | HttpException
     */
    @Post()
    async crearProyecto(@Body() proyecto: CrearProyectoDTO){
        const tempProyecto = await this.svProyectos.crearProyecto(proyecto);       
        return{message: 'Proyecto creado' , proyecto:this.svHelpers.filterObjet(tempProyecto, ['id', 'nombre', 'organizacion', "uid"])}; 
    }

    /**
     * Controlador para editar un proyecto
     * @param id :number ID del proyecto a editar
     * @param proyecto :EditarProyectoDTO
     * @returns JSON | HttpException
     */
    @Patch(':id')
    async editarProyecto(@Param('id', ParseIntPipe) id: number, @Body() proyecto:EditarProyectoDTO){
        return await this.svProyectos.editarProyecto(id , proyecto); 
    }

    /**
     * Controlador para Eliminar un proyecto
     * @param id :Id del proyecto que se desea eliminar
     * @returns 
     */
    @Delete(':id')
    async eliminarProyectos(@Param('id', ParseIntPipe) id: number){
        return await this.svProyectos.softDeleteProyecto(id); 
    }
    

}
