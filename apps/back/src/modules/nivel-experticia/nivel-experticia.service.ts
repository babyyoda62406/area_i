import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrearNivelExperticia } from './dto/CrearNivelExperticia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelExperticia } from './entities/nivel-experticia.entity';
import { Not, Repository } from 'typeorm';
import { nomenclador } from 'src/enums/nomenclador';
import { EditarNivelExperticia } from './dto/EditarNivelExperticia.dto';

@Injectable()
export class NivelExperticiaService {
    constructor(@InjectRepository(NivelExperticia) private dbNivelExperticia: Repository<NivelExperticia>) { }

    async crearNivelExpdrticia(nivelExperticia: CrearNivelExperticia) {
        const tempNivelExperticia = await this.dbNivelExperticia.findOne({
            where: {
                nombre: nivelExperticia.nombre
            }
        })

        if (tempNivelExperticia) throw new HttpException(`El nombre de nivel de experticia ${nivelExperticia.nombre} no está disponible`, HttpStatus.CONFLICT)

        const newNivelExperticia = this.dbNivelExperticia.create(nivelExperticia);
        await this.dbNivelExperticia.save(newNivelExperticia);
        return newNivelExperticia;
    }


    async obtenerNivelExperticia(id: number){
        const tempNivelEperticia = await this.dbNivelExperticia.findOne({
            where: {
                id, 
                estado: Not(nomenclador.Eliminado)
            }
        })

        if(!tempNivelEperticia) throw new HttpException(`No existe nivel de expelrticia con el id  ${id}`, HttpStatus.NOT_FOUND )

        return tempNivelEperticia ;

    }

    async obetenerNivelesExperticia() {

        const tempNivelExperticia = await this.dbNivelExperticia.find({
            where: {
                estado: Not(nomenclador.Eliminado)
            }
        })

        if (!tempNivelExperticia.length) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempNivelExperticia ; 
    }


    async eliminarNivelExperticia(id: number){
        const tempNivelExperticia = await this.obtenerNivelExperticia(id)

        tempNivelExperticia.estado = nomenclador.Eliminado

        return await this.dbNivelExperticia.save(tempNivelExperticia)
    }


    async editarNivelExperticia(id: number, nivelExperticia: EditarNivelExperticia){
        const tempNivelExperticia = await this.obtenerNivelExperticia(id)


        if(nivelExperticia.nombre){
            const tempNivelExperticia = await this.dbNivelExperticia.findOne({
                where: {
                    nombre: nivelExperticia.nombre
                }
            })

            if( tempNivelExperticia) throw new HttpException(`El nombre de nivel de experticia ${nivelExperticia.nombre} no esta disponible`, HttpStatus.CONFLICT)
        }
        
        const newNivelExperticia: NivelExperticia = Object.assign(tempNivelExperticia  , nivelExperticia); 

        await this.dbNivelExperticia.save(newNivelExperticia)

        return newNivelExperticia; 
    }
}
