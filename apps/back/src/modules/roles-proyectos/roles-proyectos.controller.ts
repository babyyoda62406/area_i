import { Body, Controller, Post } from '@nestjs/common';
import { CrearRolProyectoDTO } from './dto/CrearRolProyecto.dto';
import { RolesProyectosService } from './roles-proyectos.service';

@Controller('roles-proyectos')
export class RolesProyectosController {
    constructor(private svRolProyectos: RolesProyectosService){}

    @Post()
    async crearRolPRoyecto(@Body() rolProyecto: CrearRolProyectoDTO){
         return await this.svRolProyectos.crearRolProyecto(rolProyecto);         
        
    }
}
