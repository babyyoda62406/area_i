import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { nomencladorEstados } from "src/enums/nomenclador";

export class UpdateTarifaDto {

    @IsOptional()
    @IsNumber({}, { message: "El id  del rol   debe ser un número " })
    idRol: number

    @IsOptional()
    @IsNumber({}, { message: "El id  del  nivel de experticia debe ser un número " })
    idNivelExperticia: number
    
    @IsOptional()
    @IsNumber({}, { message: "El de  debe ser un número " })
    value: number

    @IsOptional()
    @IsEnum(nomencladorEstados, {
        message: "Ajústese al formato de estados permitidos (Activo | Inactivo | Eliminado) "
    })
    estado: nomencladorEstados

}
