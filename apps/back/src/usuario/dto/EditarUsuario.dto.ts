import { IsEnum, IsOptional, IsString } from "class-validator";
import { estados_usuario } from "../entities/usuario.entity";


/**
 * Objeto Para la validacion de Estados de Usuario
 */
enum estados_usuarioPermitidos {
    Activo = "Activo", 
    Inactivo = "Inactivo"
}


/**
 * Objeto de Transferencia de Datos para editar usuario
 */
export class EditarUsuarioDTO{
    @IsString({
        message:'El correo debe ser un string'
    })
    @IsOptional()
    correo: string ; 

    @IsString({
        message:'La contraseña debe ser un string'
    })
    @IsOptional()
    password: string;     

    @IsOptional()
    @IsEnum(estados_usuarioPermitidos , {
        message: `Debe ajsutarse a los estados permitidos Activo | Inactivo`
    } )
    estado: estados_usuario
}