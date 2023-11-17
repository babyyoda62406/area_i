import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NivelExperticiaController } from './nivel-experticia.controller';
import { NivelExperticiaService } from './nivel-experticia.service';
import { JwtModule } from '../jwt/jwt.module';
import { ValidarToken } from '../security/ValidarToken.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelExperticia } from '../../entities/nivel-experticia.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([NivelExperticia]), JwtModule], 
  controllers: [NivelExperticiaController],
  providers: [NivelExperticiaService],
  exports:[NivelExperticiaService]
})
export class NivelExperticiaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidarToken)
      .forRoutes('nivel-experticia')
  }
}
