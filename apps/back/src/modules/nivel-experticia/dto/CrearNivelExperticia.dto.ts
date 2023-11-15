import { IsNotEmpty, IsString } from "class-validator";

export class CrearNivelExperticia{
    @IsString({
        message: 'El nombre del nivel de experticia debe ser un texto'
    })
    @IsNotEmpty({
        message: 'El nivel de experticia es obligatorio'
    })
    nombre: string; 
}