import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TarifaController } from './tarifa.controller';
import { TarifaService } from './tarifa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarifa } from 'src/entities/tarifa.entity';
import { ValidarToken } from 'src/modules/security/ValidarToken.middleware';
import { JwtModule } from 'src/modules/jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tarifa]), JwtModule],
  controllers: [TarifaController],
  providers: [TarifaService]
})
export class TarifaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidarToken)
      .forRoutes('tarifa')
  }
}
