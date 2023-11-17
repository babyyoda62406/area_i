import { nomenclador } from "src/enums/nomenclador";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}