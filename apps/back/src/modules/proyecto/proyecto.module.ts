import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from 'src/entities/proyecto.entity';
import { OrganizacionModule } from '../organizacion/organizacion.module';
import { ValidarToken } from '../security/ValidarToken.middleware';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto]), OrganizacionModule, JwtModule],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports:[ProyectoService]
})
export class ProyectoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidarToken).forRoutes('/proyecto')
  }
}
