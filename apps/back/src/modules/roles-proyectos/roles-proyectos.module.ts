import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RolesProyectosController } from './roles-proyectos.controller';
import { RolesProyectosService } from './roles-proyectos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesProyectos } from '../../entities/roles-proyectos.entity';
import { ValidarToken } from '../security/ValidarToken.middleware';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolesProyectos]), JwtModule], 
  controllers: [RolesProyectosController],
  providers: [RolesProyectosService]
})
export class RolesProyectosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidarToken)
      .forRoutes('roles-proyectos')
  }
}
