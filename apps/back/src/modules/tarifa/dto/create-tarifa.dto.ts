import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTarifaDto {
    @IsNumber({}, {
        message: "El id  de rol debe ser un número"
    })
    @IsNotEmpty({
        message: "Debe asignar un rol a la tarifa"
    })
    idRol: number

    @IsNotEmpty({
        message: "Debe asignar un nivel de experticia a la tarifa"
    })
    @IsNumber({}, {message:"El id del nivel de experticia debe ser un número "})
    idNivelExperticia: number

    @IsNotEmpty({message:"Debe proporcionar un valor a la nueva tarifa"})
    @IsNumber({},{message:"El valor de la tarifa debe ser un número"})
    value: number
}
