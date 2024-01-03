import { nomenclador } from "src/enums/nomenclador";
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

    @Column({enum: nomenclador, default: nomenclador.Activo})
    estado: nomenclador

    // @OneToMany(()=>Tarifa , tarifa => tarifa.nivelExperticia )
    // tarifas: Tarifa[]

}