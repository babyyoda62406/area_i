import { IsEnum, IsOptional, IsString } from "class-validator";
import { nomencladorEstados } from "src/enums/nomenclador";

export class UpdateOrganizacionDto {
    @IsOptional()
    @IsString({
        message: 'El nombre de la organización debe ser un texto'
    })
    nombre: string

    @IsOptional()
    @IsEnum(nomencladorEstados)
    estado: nomencladorEstados

}
