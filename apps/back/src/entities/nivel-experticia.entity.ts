import { nomenclador } from "src/enums/nomenclador";
import { Column, Entity,   OneToMany,  PrimaryGeneratedColumn } from 'typeorm';
import { Tarifa } from "./tarifa.entity";


/**
 * Entidad Nivel de experticia
 */
@Entity()
export class NivelExperticia{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({enum: nomenclador, default: nomenclador.Activo})
    estado: nomenclador

    @OneToMany(()=>Tarifa , tarifa => tarifa.nivelExperticia )
    tarifas: Tarifa[]

}