import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrearProyectoDTO } from './dto/CrearProyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from 'src/entities/proyecto.entity';
import { Not, Repository } from 'typeorm';
import { UsuarioService } from '../usuario/usuario.service';
import { nomenclador } from 'src/enums/nomenclador';
import { EditarProyectoDTO } from './dto/EditarProyecto.dto';

@Injectable()
export class ProyectosService {

    constructor(@InjectRepository(Proyecto) private dbProyecto: Repository<Proyecto>, private svUsuario: UsuarioService) { }

    /**
     * Servicio para Obtener Proyectos
     * @returns  Devuelve Proyecto[] | HttpException
     */
    async obtenerProyectos() {
        const tempProyectos = await this.dbProyecto.find({
            where: {
                estado: Not(nomenclador.Eliminado)
            }
        })

        if (!tempProyectos) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempProyectos;
    }

    /**
     * Servicio para obtener un pryecto por id
     * @param id :number Id del proyecto que se desea obtener
     * @returns Proyecto  | HttpException
     */
    async obtenerProyecto(id: number) {
        const tempProyecto = await this.dbProyecto.findOne({
            where: {
                id,
                estado: Not(nomenclador.Eliminado)
            }
        })

        if (!tempProyecto) throw new HttpException(`No existe Proyecto con el id ${id}`, HttpStatus.NOT_FOUND)

        return tempProyecto;
    }
  
    /**
     * Servicio para obtener proyectos "de" un usuario determinado
     * @param ownerId :number Id del usuario 
     * @returns Proyecto[] | HttpException 
     */
    async ObtenerProyectosPorUsuario(ownerId: number) {

        await this.svUsuario.getUsuario(ownerId)

        const tempProyectos = await this.dbProyecto.find({
            where: {
                ownerId,
                estado: Not(nomenclador.Eliminado)
            }
        })

        if (!tempProyectos.length) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempProyectos;
    }

    /**
     * Servicio para marcar un Proyecto como eliminado 
     * @param id :number Id del proyecto  se desea marcar como eliminado.
     * @returns JSON 
     */
    async softDeleteProyecto(id: number) {
        const tempProyecto = await this.obtenerProyecto(id)
        tempProyecto.estado = nomenclador.Eliminado

        await this.dbProyecto.save(tempProyecto)

        return { message: 'Proyecto eliminado', id: tempProyecto.id }
    }

    /**
     * Servicio para crear proyecto 
     * @param proyecto :CrearProyectoDTO
     * @returns Proyecto | HttpException
     */
    async crearProyecto(proyecto: CrearProyectoDTO) {

        const { ownerId } = proyecto
        const tempUser = await this.svUsuario.getUsuario(ownerId);

        const tempProyecto = await this.dbProyecto.findOne({
            where: {
                nombre: proyecto.nombre,
                ownerId
            }
        })

        if (tempProyecto) throw new HttpException('Este nombre de proyecto no está disponible para este usuario', HttpStatus.BAD_REQUEST);

        const newProyecto = this.dbProyecto.create(proyecto)
        newProyecto.owner = tempUser
        await this.dbProyecto.save(newProyecto)

        return newProyecto
    }

    /**
     * Servicio para Editar un proyecto 
     * @param id :number Id del proyecto que se desea editar.
     * @param proyecto EditarProyectoDTO
     * @returns JSON | HttpException 
     */
    async editarProyecto(id: number, proyecto: EditarProyectoDTO) {

        const tempProyect = await this.obtenerProyecto(id);

        if (proyecto.nombre) {
            const { ownerId } = tempProyect;
            const NombreEnUso = await this.dbProyecto.findOne({
                where: {
                    nombre: proyecto.nombre,
                    ownerId, 
                    estado: Not(nomenclador.Eliminado)
                }
            })

            if(NombreEnUso) throw new HttpException( 'Nombre de proyecto no disonible' , HttpStatus.BAD_REQUEST)

        }

        const newProyecto = Object.assign(tempProyect, proyecto);

        await this.dbProyecto.save(newProyecto);

        return { message: 'Proyecto editado', newProyecto }
    }

}
