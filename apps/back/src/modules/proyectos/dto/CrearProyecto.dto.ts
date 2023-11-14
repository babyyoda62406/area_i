import {IsNotEmpty, IsNumber } from 'class-validator';

/**
 * Objeto de Trasferencia de Datos para crear proyectos
 */
export class CrearProyectoDTO {

    @IsNotEmpty({
        message: 'El ownerId es obligatorio'
    })
    @IsNumber({
        
    }, {
        message: 'El ownerId debe ser un número'
    })
    ownerId: number
    
    @IsNotEmpty({
        message: 'El nombre del proyecto es obligatorio'
    })
    nombre: string 
    @IsNotEmpty({
        message: 'El nombre de la organización es obligatorio'
    })
    organizacion: string 
    
}