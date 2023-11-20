import { IsNotEmpty, IsString } from "class-validator";

/**
 * Objeto de transferencia de datos para Crear Rol de Proyectos
 */
export class CrearRolProyectoDTO{
    @IsString({
        message: "El nombre del rol debe ser un string"
    })
    @IsNotEmpty({
        message: "El nombre del rol es obligatorio"
    })
    nombre: string
}