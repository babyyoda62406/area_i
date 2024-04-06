import { IsEnum, IsOptional, IsString } from "class-validator";

enum estadosPermitidos  {
    Activo   = "Activo",
    Inactivo = 'Inactivo',
}

export class EditarPersonaDTO{

   @IsOptional()
    @IsString({
        message: 'El CI debe ser un texto'
    })
    CI: string 

    @IsOptional()
    @IsString({
        message: 'El nombre debe ser un texto'
    })
    nombre: string

    @IsOptional()
    @IsString({
        message: 'El Primer apellido debe ser un texto'
    })
    primerApellido: string

    @IsOptional()
    @IsString({
        message: 'El Segundo Apellido  debe ser un texto'
    })
    segundoApellido: string

    @IsOptional()
    @IsEnum(estadosPermitidos,{
        message: 'Ajustese al formato de estados permitidos (Activo | Inactivo )'
    })
    estado: estadosPermitidos

}