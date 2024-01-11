import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrganizacionDto {
    @IsNotEmpty({
        message: 'El nombre de la organización es obligatorio'
    })
    @IsString({
        message: 'El nombre de la organización debe ser un texto'
    })
    nombre: string 
}
