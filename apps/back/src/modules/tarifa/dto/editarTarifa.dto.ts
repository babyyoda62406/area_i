import { IsNumber, IsOptional, IsEnum } from 'class-validator';


enum estadosPermitidos{
    Activo   = "Activo",
    Inactivo = 'Inactivo',
}

/**
 * Objeto de transferencia de Datos para editar tarifa 
 */

export class EditarTarfiaDTO{
    @IsOptional()
    @IsNumber({} , {
        message:'El id del rol proyecto debe ser un número'
    })
    rolProyectoId: number

    @IsOptional()
    @IsNumber({}, {
        message:'El id del nivel de experticia debe ser un número'
    })
    nivelExperticiaId: number

    @IsOptional()
    @IsNumber({}, {
        message: 'El id del proyecto debe ser un numero '
    })
    proyectoId: number

    @IsOptional()
    @IsNumber({}, {
        message: 'El valor de la tarifa debe ser un número'
    })
    value: number

    @IsOptional()
    @IsEnum(estadosPermitidos , {
        message: 'Ajústese  al formato de estados permitidos (Activo | Inactivo)'
    })
    estado: estadosPermitidos



}