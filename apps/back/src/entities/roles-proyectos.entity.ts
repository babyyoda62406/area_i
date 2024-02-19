import { nomencladorEstados } from 'src/enums/nomenclador';
import {Column, Entity,  OneToMany,  PrimaryGeneratedColumn } from 'typeorm';
import { Tarifa } from './tarifa.entity';

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

    @OneToMany(()=> Tarifa , trf=> trf.Rol)
    tarifa: Tarifa

    @Column({default: false})
    enUso: boolean

}