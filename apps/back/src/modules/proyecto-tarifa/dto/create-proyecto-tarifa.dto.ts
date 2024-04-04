import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProyectoTarifaDto {
    @IsNotEmpty({message: "El id del proyecto es obligatorio"})    
    @IsNumber({}, {message: "El id del proyecto debe ser un número"})
    idProyecto: number

    @IsNotEmpty({message: "El id de la tarifa es obligatorio"})    
    @IsNumber({}, {message: "El id de la tarifa debe ser un número"})
    idTarifa: number
}
