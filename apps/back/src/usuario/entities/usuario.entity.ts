import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    correo: string

    @Column()
    password: string

}


