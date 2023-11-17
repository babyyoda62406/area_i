import { Body, Controller, Post} from '@nestjs/common';

@Controller('tarifa')
export class TarifaController {
    @Post()
    addTarifa(@Body() tarfia){
        return tarfia
    }
}
