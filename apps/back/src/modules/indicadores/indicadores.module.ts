import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service';
import { IndicadoresController } from './indicadores.controller';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { ValidarToken } from 'src/modules/security/ValidarToken.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indicador } from 'src/entities/indicador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Indicador
  ]), JwtModule],
  providers: [IndicadoresService],
  controllers: [IndicadoresController],
  exports: [IndicadoresService]
})
export class IndicadoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidarToken)
      .forRoutes('indicadores')
  }
} 
