import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { nomencladorEstados } from 'src/enums/nomenclador';

@Entity()
export class Indicador{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({ type:'decimal', precision:10,  scale: 3 })
    value: number


    @Column({default: nomencladorEstados.Activo})
    estado: nomencladorEstados
}