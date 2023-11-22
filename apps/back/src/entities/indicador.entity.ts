import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { nomenclador } from 'src/enums/nomenclador';

@Entity()
export class Indicador{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({ type:'decimal', precision:10,  scale: 3 })
    value: number


    @Column({default: nomenclador.Activo})
    estado: nomenclador
}