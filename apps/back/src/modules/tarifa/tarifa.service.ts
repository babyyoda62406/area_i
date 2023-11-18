import { Injectable } from '@nestjs/common';
import { CrearTarfiaDTO } from './dto/crearTarifa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarifa } from 'src/entities/tarifa.entity';
import { Repository } from 'typeorm';
import { NivelExperticiaService } from '../nivel-experticia/nivel-experticia.service';
import { ProyectosService } from '../proyectos/proyectos.service';
import { RolesProyectosService } from '../roles-proyectos/roles-proyectos.service';

@Injectable()
export class TarifaService {
    constructor(
        @InjectRepository(Tarifa) private  dbTarifa : Repository<Tarifa>,
        private svNivelExperticia :NivelExperticiaService,
        private svProyectos: ProyectosService,
        private svRolProyectos: RolesProyectosService
    ){}

    async crearTarifa(tarifa: CrearTarfiaDTO){
        const {nivelExperticiaId , ownerId , rolProyectoId , value } = tarifa

        const tempNivelExperticia = await this.svNivelExperticia.obtenerNivelExperticia(nivelExperticiaId); 
        const tempProyecto        = await this.svProyectos.obtenerProyecto(ownerId); 
        const tempRolProyecto     = await this.svRolProyectos.obtenerRolPRoyectos(rolProyectoId); 

        tempNivelExperticia
        tempProyecto
        tempRolProyecto

        // Validacion de que ese proyecto no exista otra tarifa activa con esas característca

        const tempTarifa  =  this.dbTarifa.create({
            owner: tempProyecto, 
            nivelExperticia: tempNivelExperticia, 
            rolProyecto: tempProyecto,
            value
        })

        return await this.dbTarifa.save(tempTarifa)
    }
}
