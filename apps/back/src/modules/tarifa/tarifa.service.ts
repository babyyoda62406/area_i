import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarifa } from 'src/entities/tarifa.entity';
import { Repository } from 'typeorm';
import { RolesProyectosService } from '../roles-proyectos/roles-proyectos.service';
import { NivelExperticiaService } from '../nivel-experticia/nivel-experticia.service';

@Injectable()
export class TarifaService {
    constructor(
        @InjectRepository(Tarifa) private dbTarifa: Repository<Tarifa>,
        private svRol: RolesProyectosService,
        private svNivelExperticia: NivelExperticiaService
    ) { }

    async create(createTarifaDto: CreateTarifaDto) {
        const { idNivelExperticia, idRol, value } = createTarifaDto
        const tempNivelExperticia = await this.svNivelExperticia.obtenerNivelExperticia(idNivelExperticia)
        const tempRol = await this.svRol.obtenerRolPRoyectos(idRol)

        const newTarifa = this.dbTarifa.create(
            {
                NivelExperticia: tempNivelExperticia,
                Rol: tempRol,
                valor: value
            }
        )
        await this.dbTarifa.save(newTarifa)
        return { message: "Tarifa Creada", newTarifa }
    }

    async findAll() {
        const tempTarifas = await this.dbTarifa.find({
            order: {
                id: 'ASC'
            },
            relations: ['Rol', 'NivelExperticia']
        })

        if (!tempTarifas.length) throw new HttpException(``, HttpStatus.NO_CONTENT)

        return tempTarifas

    }

    async findOne(id: number) {
        const tempTarifa = await this.dbTarifa.findOne({
            where: {
                id
            },
            relations: ['Rol', 'NivelExperticia']
        })

        if (!tempTarifa) throw new HttpException(`No existe tarifa con id ${id}`, HttpStatus.NOT_FOUND)

        return tempTarifa
    }

    async update(id: number, updateTarifaDto: UpdateTarifaDto) {
        if(!Object.keys(updateTarifaDto).length) throw new HttpException(`Debe enviar al menos una propiedad a editar `, HttpStatus.BAD_REQUEST)

        const {idNivelExperticia, idRol, estado, value} = updateTarifaDto
        const tempTarifa = await this.findOne(id)


        if(idRol){
            const tempRol = await this.svRol.obtenerRolPRoyectos(idRol)
            tempTarifa.Rol = tempRol
        }

        if(idNivelExperticia){
            const tempNivelExperticia = await this.svNivelExperticia.obtenerNivelExperticia(idNivelExperticia)
            tempTarifa.NivelExperticia = tempNivelExperticia
        }


        if(estado){
            tempTarifa.estado = estado
        }

        if(value){ 
            tempTarifa.valor  = value
        }

        const results  = await this.dbTarifa.save(tempTarifa)

        return { message:" Tarifa editada?" , id: tempTarifa.id, results}
    }


    async remove(id: number) {
        const tempTarifa = await this.findOne(id)

        if (!tempTarifa) throw new HttpException(`No existe tarifa con el id ${id}`, HttpStatus.NOT_FOUND)

        if (tempTarifa.enUso) throw new HttpException(`La tarifa con id ${id} no se puede eliminar porque esta en uso`, HttpStatus.FORBIDDEN)

        const results  = await this.dbTarifa.remove(tempTarifa)

        return {message:  "Tarifa Eliminada" , results };
    }

}
