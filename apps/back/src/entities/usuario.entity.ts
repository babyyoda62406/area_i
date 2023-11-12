import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Proyecto } from "./proyecto.entity";

/**
 * Enum de los estados del usuario
 */
export enum estados_usuario {
    Activo   = "Activo",
    Inactivo = 'Inactivo',
    Eliminado = 'Eliminado'
}

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


    @OneToMany(()=>Proyecto , proyecto=> proyecto.ownerId)
    proyectos: Proyecto[]

    @Column({default: estados_usuario.Activo})
    estado: estados_usuario


}


