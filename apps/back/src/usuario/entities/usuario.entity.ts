import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({default: estados_usuario.Activo})
    estado: estados_usuario

}


