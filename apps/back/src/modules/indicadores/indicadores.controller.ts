import { Body, Controller, Post } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service';
import { CrearIndicadorDTO } from './dto/crearIndicador.dto';

@Controller('indicadores')
export class IndicadoresController {

    constructor(private svIndicador: IndicadoresService){

    }

    @Post()
    async obtenerIdnicadores(@Body() indicador: CrearIndicadorDTO){
        return await this.svIndicador.addIndicador(indicador);
    }
}
