import { IsOptional, IsEnum} from 'class-validator';



/**
 * Enumerador de estados permitidos En la edición del Roles de Proyecto
 */
enum estadosPermitidos {
    Activo = "Activo",
    Inactivo = 'Inactivo'
}
/**
 * Objeto de transferencia de datos para Editar  Roles de Proyectos
 */
export class EditarRolProyecto {
    @IsOptional()
    nombre: string

    @IsOptional()
    @IsEnum(estadosPermitidos , {
        message: 'Ajustese al formato de estados permitidos: Activo |  Inactivo '
    })
    estado: estadosPermitidos
}