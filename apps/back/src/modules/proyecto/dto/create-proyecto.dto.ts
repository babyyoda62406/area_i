import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProyectoDto {
    @IsNotEmpty({
        message:"El nombre del proyecto es obligatorio"
    })
    @IsString({
        message: "El nombre del proyecto debe ser un string"
    })
    nombre: string

    @IsNotEmpty({
        message:"El identificador del proyecto es obligatorio"
    })
    @IsString({
        message: "El identificador  del proyecto debe ser un string"
    })
    identificador: string

    @IsNotEmpty({
        message:"El id de la organización es obligatorio"
    })
    @IsNumber({}, { message: "El id de la organización debe ser un número" })
    idOrganizacion: number
}
