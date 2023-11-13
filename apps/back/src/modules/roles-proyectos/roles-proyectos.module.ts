import { Module } from '@nestjs/common';
import { RolesProyectosController } from './roles-proyectos.controller';
import { RolesProyectosService } from './roles-proyectos.service';

@Module({
  controllers: [RolesProyectosController],
  providers: [RolesProyectosService]
})
export class RolesProyectosModule {}
