import { IsEnum, IsOptional, IsString } from "class-validator";

enum estadosPermitidos{
    Activo   = "Activo",
    Inactivo = 'Inactivo'
}

export class EditarNivelExperticia{
    @IsString({
        message: 'El nivel de experticia debe ser un texto'
    })
    @IsOptional()
    nombre: string

    @IsEnum(estadosPermitidos , {
        message: 'Ajústese a los estados permitidos ( Activo | Inactivo )'
    } )
    @IsOptional()
    estado: estadosPermitidos
}