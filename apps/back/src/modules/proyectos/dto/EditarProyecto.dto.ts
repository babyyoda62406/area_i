import { IsEnum, IsOptional, IsString } from "class-validator";
import { nomenclador } from "src/enums/nomenclador";

enum estadosPermitidos {
    Activo   = "Activo",
    Inactivo = 'Inactivo',
}
export class EditarProyectoDTO{
    
    @IsOptional()
    @IsString({
        message: 'El nombre debe ser un string'
    })
    nombre: string

    @IsOptional()
    @IsString({
        message: 'La organizacion es un string'
    })
    organizacion: string

    @IsOptional()
    @IsEnum(estadosPermitidos , {
        message: 'Ajústese al formato de estados permitidos (Activo | Inactio)'
    })
    estado: nomenclador

}