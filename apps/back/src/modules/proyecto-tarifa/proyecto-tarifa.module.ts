import { Module } from '@nestjs/common';
import { ProyectoTarifaService } from './proyecto-tarifa.service';
import { ProyectoTarifaController } from './proyecto-tarifa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoTarifa } from 'src/entities/proyecto-tarifa.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProyectoTarifa])],
  controllers: [ProyectoTarifaController],
  providers: [ProyectoTarifaService],
})
export class ProyectoTarifaModule {}
