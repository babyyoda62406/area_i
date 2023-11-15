import { Body, Controller, Post } from '@nestjs/common';
import { CrearNivelExperticia } from './dto/CrearNivelExperticia.dto';
import { NivelExperticiaService } from './nivel-experticia.service';

@Controller('nivel-experticia')
export class NivelExperticiaController {
    constructor(private svNivelExperticia: NivelExperticiaService){

    }

    @Post()
    async crearNivelExperticia(@Body() nivelExperticia: CrearNivelExperticia){
        const tempNivelExperticia = await this.svNivelExperticia.crearNivelExpdrticia(nivelExperticia);         
        return {message: 'Nivel de experticia creado' , id: tempNivelExperticia.id}
    }
    
}

