import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Indicador } from 'src/entities/indicador.entity';
import { Repository } from 'typeorm';
import { CrearIndicadorDTO } from './dto/crearIndicador.dto';

@Injectable()
export class IndicadoresService {
    constructor(@InjectRepository(Indicador) private dbIndicador: Repository<Indicador>){

    }

    async addIndicador(indicador: CrearIndicadorDTO){
        const tempIndicador = await this.dbIndicador.findOne({
            where:{
                nombre: indicador.nombre
            }
        })

        if(tempIndicador) throw new HttpException(`El nombre de indicador ${indicador.nombre} no está disponible`, HttpStatus.CONFLICT)

        const newIndicador = this.dbIndicador.create(indicador)

        return  await this.dbIndicador.save(newIndicador)
    }


}
