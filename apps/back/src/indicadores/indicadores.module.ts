import { Module } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service';
import { IndicadoresController } from './indicadores.controller';

@Module({
  providers: [IndicadoresService],
  controllers: [IndicadoresController]
})
export class IndicadoresModule {}
