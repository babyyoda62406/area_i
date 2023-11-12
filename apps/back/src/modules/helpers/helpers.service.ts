import { Injectable } from "@nestjs/common";

@Injectable()
export class HelpersService {

    filterObjet(objeto: any , skema: string[]){
        const resultado  = {}; 

        skema.forEach(key =>{
            resultado[key] = objeto[key]?objeto[key]:null
        })

        return resultado ; 
        
    }
}