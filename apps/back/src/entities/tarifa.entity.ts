import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesProyectos } from "./roles-proyectos.entity";
import { NivelExperticia } from "./nivel-experticia.entity";
import { nomencladorEstados } from "src/enums/nomenclador";
import { ProyectoTarifa } from "./proyecto-tarifa.entity";

@Entity()
export class Tarifa {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne( ()=> RolesProyectos, rp=>rp.tarifa )
    Rol: RolesProyectos

    @ManyToOne(()=> NivelExperticia , np=>np.tarifa )
    NivelExperticia: NivelExperticia

    @OneToMany(()=> ProyectoTarifa , pyt=>pyt.tarifa)
    proyectoTarifas: ProyectoTarifa[]

    @Column({enum: nomencladorEstados , default: nomencladorEstados.Activo})
    estado: nomencladorEstados

    @Column({type: "decimal", precision: 4, scale:2})
    valor: number

    @Column({default: false})
    enUso: boolean

}
