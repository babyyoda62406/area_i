import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesProyectos } from './entities/roles-proyectos.entity';
import { Not, Repository } from 'typeorm';
import { CrearRolProyectoDTO } from './dto/CrearRolProyecto.dto';
import { nomenclador } from 'src/enums/nomenclador';

@Injectable()
export class RolesProyectosService {
    constructor(@InjectRepository(RolesProyectos) private dbRolProyectos: Repository<RolesProyectos>){}

    async crearRolProyecto(rolProyecto: CrearRolProyectoDTO){

        const tempRolProyecto  = await  this.dbRolProyectos.findOne({
            where: {
                estado: Not(nomenclador.Eliminado), 
                nombre: rolProyecto.nombre
            }
        })

        if(tempRolProyecto) throw new HttpException('Ya existe un rol con este nombre' , HttpStatus.CONFLICT)

        const newRolProyecto  =  this.dbRolProyectos.create(rolProyecto)

        await this.dbRolProyectos.save(newRolProyecto)

        return {message: 'Rol Creado', id: newRolProyecto.id}
   
    }


    async obtenerRolesProyectos(){
        const tempRolesProyectos =  await this.dbRolProyectos.find({
            where: {
                estado: Not(nomenclador.Eliminado)
            }
        })

        if(!tempRolesProyectos.length) throw new HttpException('' , HttpStatus.NO_CONTENT); 

        return tempRolesProyectos; 
    }


}
