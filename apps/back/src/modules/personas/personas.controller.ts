import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CrearPersonaDTO } from './dto/crearPersona.dto';
import { PersonasService } from './personas.service';

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

    


}
