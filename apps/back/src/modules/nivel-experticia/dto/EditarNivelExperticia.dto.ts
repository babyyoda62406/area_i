import { IsEnum, IsOptional, IsString } from "class-validator";

/**
 * Estados de edicion permitidos
 */
enum estadosPermitidos{
    Activo   = "Activo",
    Inactivo = 'Inactivo'
}

/**
 * Objeto de transferencia de Datos para editar nivel de Experticia
 */
export class EditarNivelExperticiaDTO{
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