import { nomencladorEstados } from 'src/enums/nomenclador';
import {Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidad Roles de Proyectos
 */
@Entity('rolProyecto')
export class RolesProyectos {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({default: nomencladorEstados.Activo})
    estado: nomencladorEstados


}