import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { ValidarToken } from 'src/modules/security/ValidarToken.middleware';
import { JwtModule } from 'src/modules/jwt/jwt.module';

@Module({
  imports:[ JwtModule, TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ValidarToken)
    .forRoutes('usuarios/')
  }
}

// export class UsuarioModule {
// }