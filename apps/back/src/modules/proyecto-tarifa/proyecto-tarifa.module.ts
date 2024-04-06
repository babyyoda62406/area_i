import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProyectoTarifaService } from './proyecto-tarifa.service';
import { ProyectoTarifaController } from './proyecto-tarifa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoTarifa } from 'src/entities/proyecto-tarifa.entity';
import { TarifaModule } from '../tarifa/tarifa.module';
import { ProyectoModule } from '../proyecto/proyecto.module';
import { JwtModule } from '../jwt/jwt.module';
import { ValidarToken } from '../security/ValidarToken.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([ProyectoTarifa]), TarifaModule , ProyectoModule, JwtModule],
  controllers: [ProyectoTarifaController],
  providers: [ProyectoTarifaService],
})
export class ProyectoTarifaModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidarToken).forRoutes('/proyecto-tarifa')
  }
}
