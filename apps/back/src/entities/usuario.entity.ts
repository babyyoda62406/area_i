import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Proyecto } from "./proyecto.entity";
import { nomenclador } from "src/enums/nomenclador";


/**
 * Entidad Usuario (Se refleja en postrgeSQL )
 */
@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number
    @Column({unique: true})
    correo: string


    @Column()
    password: string


    @OneToMany(()=>Proyecto , proyecto=> proyecto.owner)
    proyectos: Proyecto[]

    @Column({default: nomenclador.Activo})
    estado: nomenclador


}


