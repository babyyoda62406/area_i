import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { CrearTarfiaDTO } from './dto/crearTarifa.dto';
import { TarifaService } from './tarifa.service';
import { EditarTarfiaDTO } from './dto/editarTarifa.dto';

/**
 * Controlador para /tarifas
 */
@Controller('tarifa')
export class TarifaController {
    constructor(private svTarifa :TarifaService){

    }

    /**
     * Controlador para crear tarifa 
     * @param tarfia :CrearTarifaDTO
     * @returns Tarifa | HttpException
     */
    @Post()
    async addTarifa(@Body() tarfia: CrearTarfiaDTO){
        const newTarifa = await this.svTarifa.crearTarifa(tarfia); 
        return {message:'Tarifa Creada' , id: newTarifa.id}
    }

    /**
     * Controlador para obtener tarifas
     * @returns Tarifa[] | HttpException
     */
    @Get()
    async getAllTarfias(){
        return  await this.svTarifa.obtenerTarifas()
    }
    
    /**
     * Controlador para obtener una tarifa  por ID
     * @param id :number Id de la taria q se desea obtener s
     * @returns Tarifa | HttpException
     */
    @Get(':id')
    async getTarfiaById(@Param('id', ParseIntPipe) id: number){
        return await this.svTarifa.obtenerTarifaById(id)
    }


    /**
     * Controlador para obtener las tarfias asociadas a un proyecto
     * @param id :number Id del proyecto del cual se desean obtener las tarifas.
     * @returns Tarifa[] | HttpException
     */
    @Get('proyecto/:id')
    async getTarifasPorProyetos(@Param('id', ParseIntPipe) id: number){
        return await this.svTarifa.obtenerTarifaByproyectId(id); 
    }

    /**
     * Controlador para eliminar tarifa
     * @param id :number Id de la tarifa que se desea eliminar.
     * @returns Tarifa | HttpException
     */
    @Delete(':id')
    async deleteTarifa(@Param('id',ParseIntPipe) id:number ){
        const tempTarifa = await  this.svTarifa.eliminarTarifa(id)
        return {message: 'Tarifa eliminada' , id: tempTarifa.id}
    }

    /**
     * Controlador para editar tarifas 
     * @param id :number ID de la tarifa que se desea editar 
     * @param tarifa :EditarTarifaDTO
     * @returns Tarifa | HttpException
     */
    @Patch(':id')
    async setTarfia(@Param('id', ParseIntPipe) id:number ,@Body() tarifa:EditarTarfiaDTO){
        return await this.svTarifa.editarTarifa(id , tarifa) ; 
    }

}
