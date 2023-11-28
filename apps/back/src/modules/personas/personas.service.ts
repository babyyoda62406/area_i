import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/entities/persona.entity';
import { Not, Repository } from 'typeorm';
import { CrearPersonaDTO } from './dto/crearPersona.dto';
import { nomenclador } from 'src/enums/nomenclador';

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

    async getPersonas(){
        const tempPersonas = await this.dbPersona.find({
            where:{
                estado: Not(nomenclador.Eliminado)
            }
        })

        if(!tempPersonas.length) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempPersonas
    }

    async getPersona(id: number){
        const tempPersona = await this.dbPersona.findOne({
            where: {
                id, 
                estado: Not(nomenclador.Eliminado)
            }
        })

        if(!tempPersona) throw new HttpException(`No existe persona con el id ${id}`, HttpStatus.NOT_FOUND)

        return tempPersona
    }

    async deletePersona(id: number){
        const tempPersona = await  this.getPersona(id)

        tempPersona.estado = nomenclador.Eliminado

        await this.dbPersona.save(tempPersona)

        return {message: 'Persona eliminada', id: tempPersona.id}
    }


}
