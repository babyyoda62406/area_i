import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolesProyectos } from "./roles-proyectos.entity";
import { NivelExperticia } from "./nivel-experticia.entity";
import { Proyecto } from "./proyecto.entity";
import { nomenclador } from "src/enums/nomenclador";

@Entity()
export class Tarifa{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(()=> RolesProyectos)
    @JoinColumn()
    rolProyecto: RolesProyectos

    @OneToOne(()=> NivelExperticia)
    @JoinColumn()
    nivelExperticia: NivelExperticia

    @Column()
    ownerId: number

    @ManyToOne(()=>Proyecto, proyecto=>proyecto.tarifas)
    owner: Proyecto

    @Column()
    value: number
    
    @Column({default: nomenclador.Activo})
    estado: nomenclador
    
}