import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Proyecto } from "./proyecto.entity";
import { Tarifa } from "./tarifa.entity";
import { Plaza } from "./plaza.entity";

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

    @OneToMany(()=> Plaza , plz=> plz.proyectoTarifa)
    plazas: Plaza[]
}
