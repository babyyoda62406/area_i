import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrearNivelExperticia } from './dto/CrearNivelExperticia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelExperticia } from './entities/nivel-experticia.entity';
import { Not, Repository } from 'typeorm';
import { nomenclador } from 'src/enums/nomenclador';

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



    async obetenerNivelesDeExperticia() {

        const tempNivelExperticia = await this.dbNivelExperticia.find({
            where: {
                estado: Not(nomenclador.Eliminado)
            }
        })

        if (!tempNivelExperticia.length) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempNivelExperticia ; 
    }
}
