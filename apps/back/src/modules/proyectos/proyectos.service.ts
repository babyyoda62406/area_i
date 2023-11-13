import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrearProyectoDTO } from './dto/CrearProyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from 'src/entities/proyecto.entity';
import { Not, Repository } from 'typeorm';
import { UsuarioService } from '../usuario/usuario.service';
import { nomenclador } from 'src/enums/nomenclador';

@Injectable()
export class ProyectosService {

    constructor(@InjectRepository(Proyecto) private dbProyecto: Repository<Proyecto> , private svUsuario: UsuarioService){}

    // --Test !!!
    async obtenerProyectos(){
        const tempProyectos =  await this.dbProyecto.find({
            where:{
                estado: Not(nomenclador.Eliminado)
            }
        })

        if(!tempProyectos) throw new HttpException('' , HttpStatus.NO_CONTENT)

        return tempProyectos; 
    }

    // --Test !!!
    async obtenerProyecto(id: number){
        const tempProyecto = await this.dbProyecto.findOne({
            where: {
                id, 
                estado: Not(nomenclador.Eliminado)
            }
        })

        if(!tempProyecto) throw new HttpException(`No existe Proyecto con el id ${id}`, HttpStatus.NOT_FOUND)

        return tempProyecto; 
    }

    // --Test
    async ObtenerProyectosPorUsuario(ownerId: number){

        await this.svUsuario.getUsuario(ownerId)

        const tempProyectos = await this.dbProyecto.find({
            where:{
                ownerId, 
                estado: Not(nomenclador.Eliminado)
            }
        })

        if(!tempProyectos.length) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempProyectos ; 
    }

    async eliminarProyecto(id: number){
        const tempProyecto  = await this.obtenerProyecto(id)
        tempProyecto.estado = nomenclador.Eliminado

        await this.dbProyecto.save(tempProyecto)

        return {message: 'Proyecto eliminado' , id: tempProyecto.id}
    }


    async crearProyecto(proyecto: CrearProyectoDTO){

        const {ownerId} = proyecto
        const tempUser = await this.svUsuario.getUsuario(ownerId); 

        const tempProyecto  = await this.dbProyecto.findOne({
            where: {
                nombre: proyecto.nombre, 
                ownerId
            }
        })

        if(tempProyecto) throw new HttpException('Este nombre de proyecto no está disponible para este usuario' , HttpStatus.BAD_REQUEST) ; 
        
        const newProyecto   =  this.dbProyecto.create(proyecto)
        newProyecto.owner = tempUser
        await this.dbProyecto.save(newProyecto)
        
        return newProyecto 
    }


    

}
