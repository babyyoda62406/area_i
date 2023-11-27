import { nomenclador } from 'src/enums/nomenclador';
import { Column, Entity,  JoinTable,  ManyToMany,  PrimaryGeneratedColumn } from 'typeorm';
import { Indicador } from './indicador.entity';

@Entity()
export class Persona{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    CI: string

    @Column()
    nombre: string

    @Column()
    primerApellido: string

    @Column()
    segundoApellido: string

    @Column({default: nomenclador.Activo})
    estado: nomenclador;

    @ManyToMany(()=> Indicador)
    @JoinTable()
    Indicadores: Indicador[]
}