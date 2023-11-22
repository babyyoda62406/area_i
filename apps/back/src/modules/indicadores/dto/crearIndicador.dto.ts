import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CrearIndicadorDTO{

    @IsNotEmpty({
        message: 'El nombre del indicador es obligatorio'
    })
    @IsString({
        message: 'El nombre del indicador debe ser un texto'
    })
    nombre: string

    @IsNotEmpty({
        message: 'El valor del indicador es obligatorio'
    })
    @IsNumber({}, {
        message: 'El valor del indicador debe ser un número'
    })
    value: number
}