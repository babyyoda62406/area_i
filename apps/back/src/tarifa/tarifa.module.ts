import { Module } from '@nestjs/common';
import { TarifaController } from './tarifa.controller';
import { TarifaService } from './tarifa.service';

@Module({
  controllers: [TarifaController],
  providers: [TarifaService]
})
export class TarifaModule {}
