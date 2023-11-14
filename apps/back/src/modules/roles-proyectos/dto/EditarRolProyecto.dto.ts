import { IsOptional, IsEnum} from 'class-validator';



enum estadosPermitidos {
    Activo = "Activo",
    Inactivo = 'Inactivo'
}
export class EditarRolProyecto {
    @IsOptional()
    nombre: string

    @IsOptional()
    @IsEnum(estadosPermitidos , {
        message: 'Ajustese al formato de estados permitidos: Activo |  Inactivo '
    })
    estado: estadosPermitidos
}