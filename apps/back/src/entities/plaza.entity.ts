import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Proyecto } from './proyecto.entity';
import { ProyectoTarifa } from './proyecto-tarifa.entity';
@Entity()
export class Plaza {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: false})
    cubierta: boolean

    @ManyToOne(()=> Proyecto , pyt => pyt.plazas)
    proyecto: Proyecto

    @ManyToOne(()=> ProyectoTarifa , pytt=>pytt.plazas )
    proyectoTarifa: ProyectoTarifa

}
