import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from 'src/entities/persona.entity';
import { JwtModule } from '../jwt/jwt.module';
import { ValidarToken } from '../security/ValidarToken.middleware';
import { IndicadoresModule } from '../indicadores/indicadores.module';

@Module({
  imports: [TypeOrmModule.forFeature([Persona]), JwtModule, IndicadoresModule],
  controllers: [PersonasController],
  providers: [PersonasService]
})
export class PersonasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidarToken)
      .forRoutes('personas')
  }
}
