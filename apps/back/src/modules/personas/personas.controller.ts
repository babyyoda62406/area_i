import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearPersonaDTO } from './dto/crearPersona.dto';
import { PersonasService } from './personas.service';

@Controller('personas')
export class PersonasController {

    constructor(private svPersonas: PersonasService ){

    }
    
    @Get()
    async obtenerPersonas(){
        return await this.svPersonas.getPersonas()
    }

    @Post()
    async crearPersona(@Body() persona: CrearPersonaDTO){
        const newPersona = await this.svPersonas.addPersona(persona); 

        return {message:'Persona creada' , id: newPersona.id}
    }
}
