import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Proyecto } from "./proyecto.entity";
import { Tarifa } from "./tarifa.entity";

@Entity()
export class ProyectoTarifa {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne( ()=> Proyecto , pry=> pry.proyectoTarifas )
    proyecto: Proyecto

    @ManyToOne(()=> Tarifa , trf => trf.proyectoTarifas)
    tarifa: Tarifa

    @Column({default: false})
    enUso: boolean
}
