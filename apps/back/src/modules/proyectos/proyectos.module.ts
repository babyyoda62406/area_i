import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProyectosController } from './proyectos.controller';
import { ProyectosService } from './proyectos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from 'src/entities/proyecto.entity';
import { ValidarToken } from '../security/ValidarToken.middleware';
import { JwtModule } from '../jwt/jwt.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto]), JwtModule , UsuarioModule, HelpersModule],
  controllers: [ProyectosController],
  providers: [ProyectosService]
})
export class ProyectosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidarToken)
      .forRoutes('proyectos/')
  }

}
