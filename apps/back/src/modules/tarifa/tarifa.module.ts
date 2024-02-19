import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TarifaService } from './tarifa.service';
import { TarifaController } from './tarifa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarifa } from 'src/entities/tarifa.entity';
import { JwtModule } from '../jwt/jwt.module';
import { RolesProyectosModule } from '../roles-proyectos/roles-proyectos.module';
import { NivelExperticiaModule } from '../nivel-experticia/nivel-experticia.module';
import { ValidarToken } from '../security/ValidarToken.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Tarifa]), JwtModule, RolesProyectosModule, NivelExperticiaModule],
  controllers: [TarifaController],
  providers: [TarifaService],
})
export class TarifaModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidarToken).forRoutes('/tarifa')
  }

}
