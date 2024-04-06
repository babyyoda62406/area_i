import { nomencladorEstados } from "src/enums/nomenclador";
import { Column, Entity, OneToMany,   PrimaryGeneratedColumn } from 'typeorm';
import { Tarifa } from './tarifa.entity';


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

    @OneToMany(()=> Tarifa , trf => trf.NivelExperticia)
    tarifa: Tarifa

    @Column({default: false})
    enUso: boolean

}