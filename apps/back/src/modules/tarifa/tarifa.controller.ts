import { Body, Controller, Post} from '@nestjs/common';
import { CrearTarfiaDTO } from './dto/crearTarifa.dto';

@Controller('tarifa')
export class TarifaController {
    @Post()
    addTarifa(@Body() tarfia: CrearTarfiaDTO){
        return tarfia
    }
}
