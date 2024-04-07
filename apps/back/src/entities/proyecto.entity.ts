import { nomencladorEstados } from 'src/enums/nomenclador';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Organizacion } from './organizacion.entity';
import { ProyectoTarifa } from './proyecto-tarifa.entity';
import { Plaza } from './plaza.entity';



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

    @OneToMany(()=> ProyectoTarifa , pyt => pyt.proyecto)
    proyectoTarifas: ProyectoTarifa[]

    @OneToMany(()=> Plaza , plz=> plz.proyecto)
    plazas: Plaza[]

    @Column({enum: nomencladorEstados, default: nomencladorEstados.Activo})
    estado: nomencladorEstados


    @Column({default: false})
    enUso: boolean

}
