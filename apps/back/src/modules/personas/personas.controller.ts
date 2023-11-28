import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CrearPersonaDTO } from './dto/crearPersona.dto';
import { PersonasService } from './personas.service';
import { EditarPersonaDTO } from './dto/editarPersona.dto';


@Controller('personas')
export class PersonasController {

    constructor(private svPersonas: PersonasService ){

    }

    @Post()
    async crearPersona(@Body() persona: CrearPersonaDTO){
        const newPersona = await this.svPersonas.addPersona(persona); 
        return {message:'Persona creada' , id: newPersona.id}
    }

    @Get()
    async obtenerPersonas(){
        return await this.svPersonas.getPersonas()
    }

    @Get(':id')
    async obtenerPersona(@Param('id', ParseIntPipe) id: number){
        return await this.svPersonas.getPersona(id)
    }

    @Delete(':id')
    async eliminarPersona(@Param('id' , ParseIntPipe) id:number){
        return await this.svPersonas.deletePersona(id)
    }

    @Patch(':id')
    async editarPersona(@Param('id', ParseIntPipe) id: number , @Body() persona: EditarPersonaDTO){
        const personaEditada =  await this.svPersonas.setPersona(id, persona)

        return {message: 'Persona editada', id: personaEditada.id}
    }
    


}
