import { Body, Controller, Post} from '@nestjs/common';
import { CrearTarfiaDTO } from './dto/crearTarifa.dto';
import { TarifaService } from './tarifa.service';

@Controller('tarifa')
export class TarifaController {
    constructor(private svTarifa :TarifaService){

    }
    @Post()
    async addTarifa(@Body() tarfia: CrearTarfiaDTO){
        return await this.svTarifa.crearTarifa(tarfia)
    }
}
