import { nomenclador } from 'src/enums/nomenclador';
import {Column, Entity,  OneToMany,  PrimaryGeneratedColumn } from 'typeorm';
import { Tarifa } from './tarifa.entity';

/**
 * Entidad Roles de Proyectos
 */
@Entity()
export class RolesProyectos {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({default: nomenclador.Activo})
    estado: nomenclador

    @OneToMany(()=> Tarifa , tarifa=> tarifa.rolProyecto )
    tarifas: Tarifa[]

}