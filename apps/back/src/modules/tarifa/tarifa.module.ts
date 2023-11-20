import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TarifaController } from './tarifa.controller';
import { TarifaService } from './tarifa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarifa } from 'src/entities/tarifa.entity';
import { ValidarToken } from 'src/modules/security/ValidarToken.middleware';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { ProyectosModule } from '../proyectos/proyectos.module';
import { NivelExperticiaModule } from '../nivel-experticia/nivel-experticia.module';
import { RolesProyectosModule } from '../roles-proyectos/roles-proyectos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tarifa]), JwtModule, ProyectosModule , NivelExperticiaModule , RolesProyectosModule],
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
