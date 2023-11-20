import { Column, Entity,  ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { nomenclador } from "src/enums/nomenclador";
import { Proyecto } from "./proyecto.entity";
import { NivelExperticia } from "./nivel-experticia.entity";
import { RolesProyectos } from "./roles-proyectos.entity";



@Entity()
export class Tarifa{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'decimal' , precision:  10 , scale: 3})
    value: number
    
    @Column({default: nomenclador.Activo})
    estado: nomenclador

    @ManyToOne(()=> Proyecto, proyecto=>proyecto.tarifas)
    proyecto: Proyecto


    @ManyToOne(()=> NivelExperticia , nivelExperticia => nivelExperticia.tarifas)
    nivelExperticia: NivelExperticia

    @ManyToOne(()=> RolesProyectos , rolProyectos => rolProyectos.tarifas)
    rolProyecto: RolesProyectos

}