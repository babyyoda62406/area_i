import { IsNotEmpty, IsString } from "class-validator";

/**
 * Objeto de Trasnferencia de Datos para crear usuario.
 */
export class CrearUsuarioDTO {
    @IsNotEmpty({
        message: 'El correo es obligatorio', context: 'correo'
    })
    @IsString({
        message: 'El correo debe ser un texto'
    })
    // Pendiente validar mediante exprecion regular q se trate de un correo válido
    correo: string;

    @IsNotEmpty({
        message: 'La contraseña es obligatoria'
    })
    // Pendiente validar mediante expresion regular la fortaleza de la contraseña
    password: string;

}