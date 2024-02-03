import { nomencladorEstados } from 'src/enums/nomenclador';
import { Column, Entity, PrimaryGeneratedColumn,  ManyToOne } from 'typeorm';
import { Organizacion } from './organizacion.entity';



@Entity()
export class Proyecto {
    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    identificador: string

    @Column()
    nombre: string

    @ManyToOne(()=> Organizacion , org => org.proyectos)
    organizacion: Organizacion

    @Column({enum: nomencladorEstados, default: nomencladorEstados.Activo})
    estado: nomencladorEstados


    @Column({default: false})
    enUso: boolean

}
