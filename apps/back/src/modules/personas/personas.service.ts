import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/entities/persona.entity';
import { Repository } from 'typeorm';
import { CrearPersonaDTO } from './dto/crearPersona.dto';

@Injectable()
export class PersonasService {
    constructor(@InjectRepository(Persona) private dbPersona: Repository<Persona>){

    }


    async addPersona(persona: CrearPersonaDTO){
        const existePersona =  await this.dbPersona.findOne({
            where: {
                CI: persona.CI
            }
        })

        if(existePersona) throw new HttpException(`El CI ${persona.CI} no está disponible`, HttpStatus.CONFLICT)

        const newPersona  = this.dbPersona.create(persona)

        await this.dbPersona.save(newPersona)

        return newPersona
    }
}
