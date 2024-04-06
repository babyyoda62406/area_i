import { IsNumber, IsOptional, IsEnum } from 'class-validator';
import { nomencladorEstados } from "src/enums/nomenclador";

export class UpdateProyectoDto {
    @IsOptional()
    nombre: string

    @IsOptional()
    identificador: string

    @IsOptional()
    @IsNumber({}, {
        message: 'El id de la organización debe ser un número.'
    })
    organizacionId: number

    @IsOptional()
    @IsEnum(nomencladorEstados , {
        message: 'Ajústese al formato de estados permitidos.'
    })
    estado: nomencladorEstados

}
