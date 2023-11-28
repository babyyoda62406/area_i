import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/entities/persona.entity';
import { Not, Repository } from 'typeorm';
import { CrearPersonaDTO } from './dto/crearPersona.dto';
import { nomenclador } from 'src/enums/nomenclador';
import { EditarPersonaDTO } from './dto/editarPersona.dto';
import { IndicadoresService } from '../indicadores/indicadores.service';


@Injectable()
export class PersonasService {
    constructor(@InjectRepository(Persona) private dbPersona: Repository<Persona>, private svIndicador: IndicadoresService){

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
            },
            relations: ['Indicadores']
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


    async setPersona(id: number, persona: EditarPersonaDTO){
        if(!Object.keys(persona).length) throw new HttpException('Es necesario al menos un campo a editar', HttpStatus.BAD_REQUEST)

        const tempPersona = await this.getPersona(id)
        if(persona.CI){
            const existePersona  = await this.dbPersona.findOne({
                where:{
                    CI: persona.CI,
                    estado: Not(nomenclador.Eliminado)
                }
            })

            if( existePersona) throw new HttpException(`El CI ${persona.CI} no esta disponible` , HttpStatus.CONFLICT)
        }

        const newPersona: Persona = Object.assign(tempPersona, persona)
              
        await this.dbPersona.save(newPersona)

        return newPersona
    }

    async addIndicador(personaId: number, indicadorId: number){
        const tempPersona  = await this.getPersona(personaId)
        const tempIndicador  = await this.svIndicador.getIdnicador(indicadorId)

        const indicadorDuplicado = tempPersona.Indicadores.some(
            (indicador) => indicador.id === tempIndicador.id
          );
        

        if(indicadorDuplicado) throw new HttpException(`El indicador ${tempIndicador.nombre} ya esta asociado a esta persona`, HttpStatus.CONFLICT)
        
        tempPersona.Indicadores.push(tempIndicador)

        await this.dbPersona.save(tempPersona)
        
        return {message: "Indicador agregado" , personaId , indicadorId}
    }
}
