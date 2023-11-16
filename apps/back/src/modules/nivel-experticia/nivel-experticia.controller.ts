import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CrearNivelExperticia } from './dto/CrearNivelExperticia.dto';
import { NivelExperticiaService } from './nivel-experticia.service';
import { EditarNivelExperticia } from './dto/EditarNivelExperticia.dto';

@Controller('nivel-experticia')
export class NivelExperticiaController {
    constructor(private svNivelExperticia: NivelExperticiaService) {

    }

    @Post()
    async crearNivelExperticia(@Body() nivelExperticia: CrearNivelExperticia) {
        const tempNivelExperticia = await this.svNivelExperticia.crearNivelExpdrticia(nivelExperticia);
        return { message: 'Nivel de experticia creado', id: tempNivelExperticia.id }
    }

    @Get()
    async getNivelesExperticia() {
        return this.svNivelExperticia.obetenerNivelesExperticia();
    }

    @Get(':id')
    async getNivelExperticia(@Param('id', ParseIntPipe) id: number) {
        return await this.svNivelExperticia.obtenerNivelExperticia(id)
    }

    @Delete(':id')
    async deleteNivelExperticia(@Param('id', ParseIntPipe) id: number) {
        const tempNivelExperticia = await this.svNivelExperticia.eliminarNivelExperticia(id);
        return { message: 'Nivel de experticia eliminado', id: tempNivelExperticia.id }
    }

    @Patch(':id')
    async setNivelExperticia(@Param('id', ParseIntPipe) id: number, @Body() nivelExperticia: EditarNivelExperticia) {
        const newNivelExperticia = await this.svNivelExperticia.editarNivelExperticia(id, nivelExperticia);
        return { message: 'Nivel de experticia editado', id: newNivelExperticia.id }
    }

}

