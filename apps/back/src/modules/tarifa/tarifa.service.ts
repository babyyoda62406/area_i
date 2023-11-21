import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrearTarfiaDTO } from './dto/crearTarifa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarifa } from 'src/entities/tarifa.entity';
import { Not, Repository } from 'typeorm';
import { NivelExperticiaService } from '../nivel-experticia/nivel-experticia.service';
import { ProyectosService } from '../proyectos/proyectos.service';
import { RolesProyectosService } from '../roles-proyectos/roles-proyectos.service';
import { nomenclador } from 'src/enums/nomenclador';
import { EditarTarfiaDTO } from './dto/editarTarifa.dto';

/**
 * Servicio de Gestion de Tarifa
 */
@Injectable()
export class TarifaService {
    constructor(
        @InjectRepository(Tarifa) private dbTarifa: Repository<Tarifa>,
        private svNivelExperticia: NivelExperticiaService,
        private svProyectos: ProyectosService,
        private svRolProyectos: RolesProyectosService
    ) { }

    /**
     * Servicio para crear tarifa 
     * @param tarifa :CrearTarifaDTO
     * @returns Tarifa | HttpException 
     */
    async crearTarifa(tarifa: CrearTarfiaDTO) {
        const { nivelExperticiaId, proyectoId, rolProyectoId, value } = tarifa

        const tempNivelExperticia = await this.svNivelExperticia.obtenerNivelExperticia(nivelExperticiaId);
        const tempProyecto = await this.svProyectos.obtenerProyecto(proyectoId);
        const tempRolProyecto = await this.svRolProyectos.obtenerRolPRoyectos(rolProyectoId);

        const existeIgualTarifaActiva = await this.dbTarifa.findOne({
            where: {
                proyecto: tempProyecto,
                nivelExperticia: tempNivelExperticia,
                rolProyecto: tempRolProyecto,
                estado: nomenclador.Activo
            }
        })

        if (existeIgualTarifaActiva) throw new HttpException('Ya existe una tarifa igual activa', HttpStatus.CONFLICT)

        const tempTarifa = this.dbTarifa.create({
            value
        })

        tempTarifa.proyecto = tempProyecto
        tempTarifa.nivelExperticia = tempNivelExperticia
        tempTarifa.rolProyecto = tempRolProyecto

        return await this.dbTarifa.save(tempTarifa)
    }

    /**
     * Servicio para obtener tarifas
     * @returns Tarifa[] | HttpException
     */
    async obtenerTarifas() {
        const tempTarifas = await this.dbTarifa.find({
            where: {
                estado: Not(nomenclador.Eliminado)
            },
            relations: ['proyecto', 'rolProyecto', 'nivelExperticia']
        })

        if (!tempTarifas.length) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempTarifas
    }

    /**
     * Servicio para obtener tarfia por Id
     * @param id :number Id de la tarifa que se desea obtener 
     * @returns Tarifa | HttpException
     */
    async obtenerTarifaById(id: number) {
        const tempTarifa = await this.dbTarifa.findOne({
            where: {
                id,
                estado: Not(nomenclador.Eliminado)
            },
            relations: ['proyecto', 'rolProyecto', 'nivelExperticia']
        })

        if (!tempTarifa) throw new HttpException(`No existe tarifa con el id ${id}`, HttpStatus.NOT_FOUND)

        return tempTarifa
    }


    /**
     * Servicio para obtener las tarifas asociadas a un proyecto
     * @param id :number Id del proyecto del cual se dean obtener las tarifas
     * @returns Tarifa[]
     */
    async obtenerTarifaByproyectId(id: number) {
        const tempProyecto = await this.svProyectos.obtenerProyecto(id)

        const tempTarifas = await this.dbTarifa.find({
            where: {
                estado: Not(nomenclador.Eliminado),
                proyecto: tempProyecto
            },
            relations: ['proyecto', 'rolProyecto', 'nivelExperticia']
        })

        if (!tempTarifas.length) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempTarifas

    }

    /**
     * Servicio para eliminar una tarifa
     * @param id :number Id de la tarifa que desea eliminar 
     * @returns Tarifa
     */
    async eliminarTarifa(id: number) {
        const tempTarfia = await this.obtenerTarifaById(id)

        tempTarfia.estado = nomenclador.Eliminado

        await this.dbTarifa.save(tempTarfia)

        return tempTarfia;
    }

    /**
     * Servicio para editar tarifa
     * @param id :number Id de la tarifa que se desea eliminar
     * @param tarifa :EditarTarifa
     * @returns Tarifa[]
     */
    async editarTarifa(id: number, tarifa: EditarTarfiaDTO) {
        if (!Object.keys(tarifa).length) throw new HttpException('Debe proveer al menos un campo a  editar', HttpStatus.BAD_REQUEST)

        const tempTarifa = await this.obtenerTarifaById(id);

        if (tarifa.proyectoId) {
            const tempProyecto = await this.svProyectos.obtenerProyecto(tarifa.proyectoId)
            const { nivelExperticia, rolProyecto } = tempTarifa

            const existeNuevaTarifa = await this.dbTarifa.findOne({
                where: {
                    proyecto: tempProyecto,
                    nivelExperticia,
                    rolProyecto,
                    estado: nomenclador.Activo
                }
            })

            if (existeNuevaTarifa) throw new HttpException(`Ya existe en el proyecto ${tempProyecto.nombre} una tarfia activa con las mismas carcterísticas`, HttpStatus.CONFLICT)

            tempTarifa.proyecto = tempProyecto
        }

        if (tarifa.nivelExperticiaId) {
            const tempNivelExperticia = await this.svNivelExperticia.obtenerNivelExperticia(tarifa.nivelExperticiaId)
            const { proyecto, rolProyecto } = tempTarifa

            const existeNuevaTarifa = await this.dbTarifa.findOne({
                where: {
                    nivelExperticia: tempNivelExperticia,
                    proyecto,
                    rolProyecto,
                    estado: nomenclador.Activo
                }
            })

            if (existeNuevaTarifa) throw new HttpException(`Ya existe una tarfia activa con el nivel de experticia ${tempNivelExperticia.nombre} que comparte el mismo rol de Proyecto en este proyecto `, HttpStatus.CONFLICT)

            tempTarifa.nivelExperticia = tempNivelExperticia
        }

        if (tarifa.rolProyectoId) {
            const tempRolProyecto = await this.svRolProyectos.obtenerRolPRoyectos(tarifa.rolProyectoId)

            const { proyecto, nivelExperticia } = tempTarifa

            const existeNuevaTarifa = await this.dbTarifa.findOne({
                where: {
                    rolProyecto: tempRolProyecto,
                    proyecto,
                    nivelExperticia,
                    estado: nomenclador.Activo
                }
            })

            if(existeNuevaTarifa) throw new HttpException(`Ya existe una tarifa activa con el rol de proyecto ${tempRolProyecto.nombre} que además comparten el proyecto y nivel de experticia actual`, HttpStatus.CONFLICT)

            tempTarifa.rolProyecto = tempRolProyecto

        }

        if(tarifa.estado){
            if(tarifa.estado === "Activo"){
                const {proyecto , nivelExperticia, rolProyecto} = tempTarifa
                const existeNuevaTarifa = await this.dbTarifa.findOne({
                    where:{
                        estado: nomenclador.Activo,
                        nivelExperticia, 
                        proyecto , 
                        rolProyecto
                    }
                })

                if(existeNuevaTarifa) throw new HttpException('No se puede activar la tarifa porque viola las restricciones cardinalidad entre tarifa , proyecto ,  rol de proyecto, y nivel de experticia ' , HttpStatus.CONFLICT)
                tempTarifa.estado  = nomenclador.Activo
            }else{
                tempTarifa.estado  = nomenclador.Inactivo
            }
        }

        if(tarifa.value){
            tempTarifa.value = tarifa.value
        }

        return await this.dbTarifa.save(tempTarifa)

    }
}