import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

enum estadosPermitidos { 
    Activo   = "Activo",
    Inactivo = 'Inactivo'
}

export class EditarIndicadorDTO{
    
    @IsOptional()
    @IsString({
        message: 'El nombre del indicador deber ser un texto'
    })
    nombre:string
    @IsOptional()
    @IsNumber({}, {
        message:'El valor del indicador debe ser un número'
    })
    value: number
    @IsOptional()
    @IsEnum(estadosPermitidos , {
        message: 'Ajústese al formato de estados permitidos (Activo | Inactivo)'
    })
    estado: estadosPermitidos
}