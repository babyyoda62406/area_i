import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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

    @Get()
    async getNivelesExperticia(){
        return this.svNivelExperticia.obetenerNivelesExperticia(); 
    }


    @Delete(':id')
    async deleteNivelExperticia(@Param('id', ParseIntPipe) id: number){
        const tempNivelExperticia =await  this.svNivelExperticia.eliminarNivelExperticia(id);        
        return {message: 'Nivel de experticia eliminado',  id: tempNivelExperticia.id}
    }

    

    
}

