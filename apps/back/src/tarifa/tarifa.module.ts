import { Module } from '@nestjs/common';
import { TarifaController } from './tarifa.controller';
import { TarifaService } from './tarifa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarifa } from 'src/entities/tarifa.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tarifa])],
  controllers: [TarifaController],
  providers: [TarifaService]
})
export class TarifaModule {}
