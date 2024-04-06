import { IsNumber, IsString } from "class-validator";

export class CreateProyectoDto {
    @IsString({
        message: "El nombre del proyecto debe ser un string"
    })
    nombre: string

    @IsString({
        message: "El indicador del proyecto debe ser un string"
    })
    identificador: string

    @IsNumber({}, { message: "El id de la organización debe ser un número" })
    idOrganizacion: number
}
