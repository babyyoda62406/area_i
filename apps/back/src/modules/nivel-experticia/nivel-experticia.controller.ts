import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CrearNivelExperticia } from './dto/CrearNivelExperticia.dto';
import { NivelExperticiaService } from './nivel-experticia.service';
import { EditarNivelExperticiaDTO } from './dto/EditarNivelExperticia.dto';

/**
 * Controladores de la ruta nivel-experticia
 */
@Controller('nivel-experticia')
export class NivelExperticiaController {
    constructor(private svNivelExperticia: NivelExperticiaService) {

    }

    /**
     * Controlador de la ruta para crear nivel de experticia
     * @param nivelExperticia : Objeto de transfencia de datos para Crear Nivel de Experticia
     * @returns JSON | HttpException
     */
    @Post()
    async crearNivelExperticia(@Body() nivelExperticia: CrearNivelExperticia) {
        const tempNivelExperticia = await this.svNivelExperticia.crearNivelExpdrticia(nivelExperticia);
        return { message: 'Nivel de experticia creado', id: tempNivelExperticia.id }
    }

    /**
     * Controlador de la ruta para obtener niveles de experticia
     * @returns NivelExperticia[]
     */
    @Get()
    async getNivelesExperticia() {
        return this.svNivelExperticia.obetenerNivelesExperticia();
    }
    
    /**
     * Controlador de la ruta para obtener un nivel de experticia por Id
     * @param id :number Id del nivel de experticia que se desea obtener
     * @returns 
     */
    @Get(':id')
    async getNivelExperticia(@Param('id', ParseIntPipe) id: number) {
        return await this.svNivelExperticia.obtenerNivelExperticia(id)
    }

    /**
     * Controlador de la ruta para eliminar nivel de experticia
     * @param id :number Id del nivel de experticia que se desea eliminar
     * @returns JSON | HttpException
     */
    @Delete(':id')
    async deleteNivelExperticia(@Param('id', ParseIntPipe) id: number) {
        const tempNivelExperticia = await this.svNivelExperticia.eliminarNivelExperticia(id);
        return { message: 'Nivel de experticia eliminado', id: tempNivelExperticia.id }
    }

    /**
     * Controlador de la ruta para editar un rol de proyecto
     * @param id :number id del nivel de experticia que se desea editar
     * @param nivelExperticia : Objeto de Trasnferencia de datos del Nivel de experticia que se desea editar 
     * @returns 
     */
    @Patch(':id')
    async setNivelExperticia(@Param('id', ParseIntPipe) id: number, @Body() nivelExperticia: EditarNivelExperticiaDTO) {
        const newNivelExperticia = await this.svNivelExperticia.editarNivelExperticia(id, nivelExperticia);
        return { message: 'Nivel de experticia editado', id: newNivelExperticia.id }
    }

}

