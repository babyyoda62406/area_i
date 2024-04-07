import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Indicador } from 'src/entities/indicador.entity';
import { Not, Repository } from 'typeorm';
import { CrearIndicadorDTO } from './dto/crearIndicador.dto';
import { nomencladorEstados } from 'src/enums/nomenclador';
import { EditarIndicadorDTO } from './dto/editarIndicador.dto';

@Injectable()
export class IndicadoresService {
    constructor(@InjectRepository(Indicador) private dbIndicador: Repository<Indicador>){

    }

    async addIndicador(indicador: CrearIndicadorDTO){
        const tempIndicador = await this.dbIndicador.findOne({
            where:{
                nombre: indicador.nombre
            }
        })

        if(tempIndicador) throw new HttpException(`El nombre de indicador ${indicador.nombre} no está disponible`, HttpStatus.CONFLICT)

        const newIndicador = this.dbIndicador.create(indicador)

        return  await this.dbIndicador.save(newIndicador)
    }

    async getIdnicadores(){
        const tempIndicadores = await this.dbIndicador.find({
            where: {
                estado: Not(nomencladorEstados.Eliminado)
            }
        })

        if(!tempIndicadores.length) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempIndicadores
    }

    async getIdnicador(id: number){
        const tempIndicador = await this.dbIndicador.findOne({
            where:{
                id , 
                estado: Not(nomencladorEstados.Eliminado)
            }
        })

        if(!tempIndicador) throw new HttpException(`No existe indicador con el id ${id}` , HttpStatus.NOT_FOUND)

        return tempIndicador
    }

    async deleteIndicador(id: number){
        const tempIndicador = await this.getIdnicador(id)

        tempIndicador.estado = nomencladorEstados.Eliminado
        
        await this.dbIndicador.save(tempIndicador)

        return {message:"Indicador Eliminado" , id: tempIndicador.id}
    }

    async pathIndicador( id: number , indicador: EditarIndicadorDTO){
        const tempIndicador  = await this.getIdnicador(id);
        

        if(indicador.nombre){
            const existeIndicador  =  await this.dbIndicador.findOne({
                where:{
                    nombre: indicador.nombre,
                    estado: nomencladorEstados.Activo
                }
            })    

            if(existeIndicador) throw new HttpException(`El nombre de indicador ${indicador.nombre} no está disponible` , HttpStatus.CONFLICT)
        }

        const newIndicador: Indicador = Object.assign(tempIndicador , indicador)
        
        await this.dbIndicador.save(newIndicador)


        return {message: 'Indicador editado' , id: newIndicador.id}
        
    }


}