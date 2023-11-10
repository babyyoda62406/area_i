import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum estados_usuario {
    Activo   = "Activo",
    Inactivo = 'Inactivo',
    Eliminado = 'Eliminado'
}
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


