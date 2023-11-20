import { Injectable } from "@nestjs/common";

@Injectable()
export class HelpersService {

    /**
     * Metodo para "Limpiar" las propiedades de un JSON
     * con vista a eliminar de la Response.JSON propiedades que no deben llegar al frontEnd.
     * @param objeto Objeto sin tratar, al cual se le desean quitar los pares Key => value no especificados en el skema. 
     * @param skema  :string[] Skema Utilizado para la interseccion con el Objeto
     * @returns Devuelve la interseccion de las claves del Objeto, y sus respectivos valores con  los valores del Skema
     */
    filterObjet(objeto: any , skema: string[]){
        const resultado  = {}; 

        skema.forEach(key =>{
            resultado[key] = objeto[key]?objeto[key]:null
        })

        return resultado ; 
        
    }
}