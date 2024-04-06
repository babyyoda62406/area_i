import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesProyectos } from '../../entities/roles-proyectos.entity';
import { Not, Repository } from 'typeorm';
import { CrearRolProyectoDTO } from './dto/CrearRolProyecto.dto';
import { nomencladorEstados } from 'src/enums/nomenclador';
import { EditarRolProyecto } from './dto/EditarRolProyecto.dto';

/**
 * Servicio de roles de proyectos
 */
@Injectable()
export class RolesProyectosService {
    constructor(@InjectRepository(RolesProyectos) private dbRolProyectos: Repository<RolesProyectos>) { }

    /**
     * Servicio para crear roles de proyectos
     * @param rolProyecto :CrearRolProyectoDTO
     * @returns RolProyecto | HttpException
     */
    async crearRolProyecto(rolProyecto: CrearRolProyectoDTO) {

        const tempRolProyecto = await this.dbRolProyectos.findOne({
            where: {
                estado: Not(nomencladorEstados.Eliminado),
                nombre: rolProyecto.nombre
            }
        })

        if (tempRolProyecto) throw new HttpException('Ya existe un rol con este nombre', HttpStatus.CONFLICT)

        const newRolProyecto = this.dbRolProyectos.create(rolProyecto)

        await this.dbRolProyectos.save(newRolProyecto)

        return { message: 'Rol Creado', id: newRolProyecto.id }

    }

    /**
     * Servicio para obtener un nivel de experticia por id
     * @param id :number Id del rol de proyecto que se desea obtener. 
     * @returns RolesProyectos | HttpException
     */
    async obtenerRolPRoyectos(id: number) {
        const tempRolProyecto = await this.dbRolProyectos.findOne({
            where: {
                id,
                estado: Not(nomencladorEstados.Eliminado)
            }
        })

        if (!tempRolProyecto) throw new HttpException(`No existe rol de proyecto con el id ${id}`, HttpStatus.NOT_FOUND)

        return tempRolProyecto
    }

    /**
     * Servicio para obtener roles de proyectos
     * @returns RolesProyectos[]
     */
    async obtenerRolesProyectos() {
        const tempRolesProyectos = await this.dbRolProyectos.find({
            where: {
                estado: Not(nomencladorEstados.Eliminado)
            }
        })

        if (!tempRolesProyectos.length) throw new HttpException('', HttpStatus.NO_CONTENT);

        return tempRolesProyectos;
    }

    /**
     * Servicio para eliminar un  rol de proyectos 
     * @param id :number Id del rol de proyecto que se desea eliminar.
     * @returns 
     */
    async eliminarRolesProyectos(id: number) {
        const tempRolesProyecto = await this.obtenerRolPRoyectos(id)

        tempRolesProyecto.estado = nomencladorEstados.Eliminado

        await this.dbRolProyectos.save(tempRolesProyecto)

        return { message: 'Rol eliminado' }


    }

    /**
     * Servicio para editar proyecto por id
     * @param id :number Id del rol de proyecto que se desea editar
     * @param rolProyecto 
     * @returns 
     */
    async editarRolProyecto(id: number, rolProyecto: EditarRolProyecto) {
        if (!Object.keys(rolProyecto).length) throw new HttpException('Debe intentar editar al menos un campo ', HttpStatus.BAD_REQUEST)

        const tempRolProyect = await this.obtenerRolPRoyectos(id)

        if (rolProyecto.nombre) {
            const existNombre = await this.dbRolProyectos.findOne({
                where: {
                    nombre: rolProyecto.nombre
                }
            })

            if (existNombre) throw new HttpException(`El nombre de rol ${rolProyecto.nombre} no esta disponible`, HttpStatus.CONFLICT)
        }

        const newRolProyecto: RolesProyectos = Object.assign(tempRolProyect, rolProyecto);


        await this.dbRolProyectos.save(newRolProyecto)

        return newRolProyecto;


    }

}
