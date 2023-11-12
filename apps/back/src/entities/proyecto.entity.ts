import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity()
export class Proyecto{ 
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string  

    @Column()
    organizacion: string

    @Column()
    ownerId: number

    @ManyToOne(()=> Usuario  , user=> user.proyectos)
    owner: Usuario
}