import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrearTarfiaDTO } from './dto/crearTarifa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarifa } from 'src/entities/tarifa.entity';
import { Repository } from 'typeorm';
import { NivelExperticiaService } from '../nivel-experticia/nivel-experticia.service';
import { ProyectosService } from '../proyectos/proyectos.service';
import { RolesProyectosService } from '../roles-proyectos/roles-proyectos.service';
import { nomenclador } from 'src/enums/nomenclador';

@Injectable()
export class TarifaService {
    constructor(
        @InjectRepository(Tarifa) private  dbTarifa : Repository<Tarifa>,
        private svNivelExperticia :NivelExperticiaService,
        private svProyectos: ProyectosService,
        private svRolProyectos: RolesProyectosService
    ){}

    async crearTarifa(tarifa: CrearTarfiaDTO){
        const {nivelExperticiaId , proyectoId , rolProyectoId , value  } = tarifa

        const tempNivelExperticia = await this.svNivelExperticia.obtenerNivelExperticia(nivelExperticiaId); 
        const tempProyecto        = await this.svProyectos.obtenerProyecto(proyectoId); 
        const tempRolProyecto     = await this.svRolProyectos.obtenerRolPRoyectos(rolProyectoId); 

        const existeIgualTarifaActiva = await this.dbTarifa.findOne({
            where: {
                proyecto: tempProyecto,
                nivelExperticia: tempNivelExperticia , 
                rolProyecto: tempRolProyecto, 
                estado: nomenclador.Activo
            }
        })

        if(existeIgualTarifaActiva) throw new HttpException('Ya existe una tarifa igual activa' , HttpStatus.CONFLICT)

        const tempTarifa  =  this.dbTarifa.create({
            value
        })
        
        tempTarifa.proyecto = tempProyecto
        tempTarifa.nivelExperticia = tempNivelExperticia
        tempTarifa.rolProyecto = tempRolProyecto

        return await this.dbTarifa.save(tempTarifa)
    }
}
