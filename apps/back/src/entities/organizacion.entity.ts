import { nomencladorEstados } from "src/enums/nomenclador";
import { Column, Entity,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Proyecto } from "./proyecto.entity";

@Entity()
export class Organizacion {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    nombre: string

    @OneToMany(()=> Proyecto , pry => pry.organizacion)
    proyectos: Proyecto[]
    

    @Column({enum: nomencladorEstados, default: nomencladorEstados.Activo})
    estado: nomencladorEstados

    @Column({default: false})
    enUso: boolean
}
