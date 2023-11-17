import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { nomenclador } from "src/enums/nomenclador";
import { Tarifa } from "./tarifa.entity";

/**
 * Entidad que reprecenta los proyectos
 */
@Entity()
export class Proyecto{ 
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string  

    @Column()
    organizacion: string

    @Column()
    ownerId: number

    @ManyToOne(()=> Usuario  , user=> user.proyectos)
    owner: Usuario

    @OneToMany(()=> Tarifa , tarifa=> tarifa.ownerId)
    tarifas: Tarifa[]

    @Column({default: nomenclador.Activo})
    estado: nomenclador


}