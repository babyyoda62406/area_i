import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service';
import { CrearIndicadorDTO } from './dto/crearIndicador.dto';

@Controller('indicadores')
export class IndicadoresController {

    constructor(private svIndicador: IndicadoresService){

    }

    @Post()
    async crearIdnicador(@Body() indicador: CrearIndicadorDTO){
        const newIndicador = await this.svIndicador.addIndicador(indicador);

        return {message:"Indicador Creado" , id: newIndicador.id}
    }

    @Get()
    async obtenerIndicadores(){
        return await  this.svIndicador.getIdnicadores();
    }

    @Get(':id')
    async obtenerIndicador(@Param('id', ParseIntPipe) id: number){
        return await this.svIndicador.getIdnicador(id)
    }

    @Delete(':id')
    async eliminarIndicador(@Param('id', ParseIntPipe) id: number){
        return await this.svIndicador.deleteIndicador(id)
    }


}
