import { Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import { CrearTarfiaDTO } from './dto/crearTarifa.dto';
import { TarifaService } from './tarifa.service';

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

}
