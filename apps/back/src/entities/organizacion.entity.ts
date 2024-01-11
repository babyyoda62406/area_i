import { nomencladorEstados } from "src/enums/nomenclador";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organizacion {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    nombre: string

    // Aqui relacionar el proyecto

    @Column({enum: nomencladorEstados, default: nomencladorEstados.Activo})
    estado: nomencladorEstados

    @Column({default: false})
    enUso: boolean
}
