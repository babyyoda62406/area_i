import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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


    @Column({default: nomenclador.Activo})
    estado: nomenclador


}


