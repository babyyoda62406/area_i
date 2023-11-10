import {  IsNotEmpty, IsString } from "class-validator";

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