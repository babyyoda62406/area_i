import { IsNotEmpty, IsNumber } from "class-validator"

export class CrearTarfiaDTO{
    @IsNotEmpty({
        message: 'Debe proporcionar un rol de Proyecto'
    })
    @IsNumber({} , {
        message:'El id del rol proyecto debe ser un número'
    })
    rolProyectoId: number

    @IsNotEmpty({
        message:'Debe proporcionar un nivel de experticia'
    })
    @IsNumber({}, {
        message:'El id del nivel de experticia debe ser un número'
    })
    nivelExperticiaId: number
    
    @IsNotEmpty({
        message: 'Debe proporcionar un proyecto'
    })
    @IsNumber({}, {
        message: 'El id del proyecto debe ser un numero '
    })
    ownerId: number

    @IsNotEmpty({
        message: 'La tarifa debe tener un valor'
    })
    @IsNumber({}, {
        message: 'El valor de la tarifa debe ser un número'
    })
    value: number
}