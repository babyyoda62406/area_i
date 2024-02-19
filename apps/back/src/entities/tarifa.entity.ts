import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolesProyectos } from "./roles-proyectos.entity";
import { NivelExperticia } from "./nivel-experticia.entity";
import { nomencladorEstados } from "src/enums/nomenclador";

@Entity()
export class Tarifa {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne( ()=> RolesProyectos, rp=>rp.tarifa )
    Rol: RolesProyectos

    @ManyToOne(()=> NivelExperticia , np=>np.tarifa )
    NivelExperticia: NivelExperticia

    @Column({enum: nomencladorEstados , default: nomencladorEstados.Activo})
    estado: nomencladorEstados

    @Column({type: "decimal", precision: 4, scale:2})
    valor: number

    @Column({default: false})
    enUso: boolean

}
