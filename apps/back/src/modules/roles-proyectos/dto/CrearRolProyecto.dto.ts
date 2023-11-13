import { IsNotEmpty, IsString } from "class-validator";

export class CrearRolProyectoDTO{
    @IsString({
        message: "El nombre del rol debe ser un string"
    })
    @IsNotEmpty({
        message: "El nombre del rol es obligatorio"
    })
    nombre: string
}