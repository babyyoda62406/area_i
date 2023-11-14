import { Module } from '@nestjs/common';
import { NivelExperticiaController } from './nivel-experticia.controller';
import { NivelExperticiaService } from './nivel-experticia.service';

@Module({
  controllers: [NivelExperticiaController],
  providers: [NivelExperticiaService]
})
export class NivelExperticiaModule {}
