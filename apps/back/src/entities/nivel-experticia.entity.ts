import { nomencladorEstados } from "src/enums/nomenclador";
import { Column, Entity,   PrimaryGeneratedColumn } from 'typeorm';


/**
 * Entidad Nivel de experticia
 */
@Entity('nivelExperticia')
export class NivelExperticia{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({enum: nomencladorEstados, default: nomencladorEstados.Activo})
    estado: nomencladorEstados

    // @OneToMany(()=>Tarifa , tarifa => tarifa.nivelExperticia )
    // tarifas: Tarifa[]

}