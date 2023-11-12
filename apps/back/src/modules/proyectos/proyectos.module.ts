import { Module } from '@nestjs/common';
import { ProyectosController } from './proyectos.controller';
import { ProyectosService } from './proyectos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from 'src/entities/proyecto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Proyecto])],
  controllers: [ProyectosController],
  providers: [ProyectosService]
})
export class ProyectosModule {}
