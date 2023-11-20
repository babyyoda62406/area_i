import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { CrearTarfiaDTO } from './dto/crearTarifa.dto';
import { TarifaService } from './tarifa.service';
import { EditarTarfiaDTO } from './dto/editarTarifa.dto';


@Controller('tarifa')
export class TarifaController {
    constructor(private svTarifa :TarifaService){

    }
    @Post()
    async addTarifa(@Body() tarfia: CrearTarfiaDTO){
        const newTarifa = await this.svTarifa.crearTarifa(tarfia); 
        return {message:'Tarifa Creada' , id: newTarifa.id}
    }

    @Get()
    async getAllTarfias(){
        return  await this.svTarifa.obtenerTarifas()
    }

    @Get(':id')
    async getTarfiaById(@Param('id', ParseIntPipe) id: number){
        return await this.svTarifa.obtenerTarifaById(id)
    }


    @Get('proyecto/:id')
    async getTarifasPorProyetos(@Param('id', ParseIntPipe) id: number){
        return await this.svTarifa.obtenerTarifaByproyectId(id); 
    }

    @Delete(':id')
    async deleteTarifa(@Param('id',ParseIntPipe) id:number ){
        const tempTarifa = await  this.svTarifa.eliminarTarifa(id)
        return {message: 'Tarifa eliminada' , id: tempTarifa.id}
    }

    @Patch(':id')
    async setTarfia(@Param('id', ParseIntPipe) id:number ,@Body() tarifa:EditarTarfiaDTO){
        return await this.svTarifa.editarTarifa(id , tarifa) ; 
    }

}
