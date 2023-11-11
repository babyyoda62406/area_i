import {  IsNotEmpty, IsString } from "class-validator";

/**
 * Objeto de Transferencia de Datos para controladores de Autenticar Usuarios
 */
export class AutenticarUsuarioDTO{
    @IsNotEmpty({
        message:'El correo no puede estar vacio'
    })
    @IsString({
        message:'El correo es obligatorio'
    })
    correo: string; 

    @IsNotEmpty({
        message: 'La contraseña es obligatoria'
    })    
    password: string; 

}