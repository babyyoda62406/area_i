import { Injectable } from '@nestjs/common';
import { CrearProyectoDTO } from './dto/CrearProyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from 'src/entities/proyecto.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable()
export class ProyectosService {

    constructor(@InjectRepository(Proyecto) private dbProyecto: Repository<Proyecto> , private svUsuario: UsuarioService){}


    async crearProyecto(proyecto: CrearProyectoDTO){
        const {ownerId} = proyecto
        const tempUser = await this.svUsuario.getUsuario(ownerId); 
        
        const newProyecto   =  this.dbProyecto.create(proyecto)
        newProyecto.owner = tempUser
        await this.dbProyecto.save(newProyecto)

        

        return newProyecto 
    }

}
