import { IsNotEmpty, IsString } from "class-validator";

export class CrearPersonaDTO{

    @IsNotEmpty({
        message:'El CI es obligatorio'
    })
    @IsString({
        message: 'El CI debe ser un texto'
    })
    CI: string 

    @IsNotEmpty({
        message:'El nombre es obligatorio'
    })
    @IsString({
        message: 'El nombre debe ser un texto'
    })
    nombre: string

    @IsNotEmpty({
        message:'El Primer apellido es obligatorio'
    })
    @IsString({
        message: 'El Primer apellido debe ser un texto'
    })
    primerApellido: string

    @IsNotEmpty({
        message:'El Segundo Apellido es obligatorio'
    })
    @IsString({
        message: 'El Segundo Apellido  debe ser un texto'
    })
    segundoApellido: string

}