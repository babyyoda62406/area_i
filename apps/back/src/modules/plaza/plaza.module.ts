import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PlazaService } from './plaza.service';
import { PlazaController } from './plaza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plaza } from 'src/entities/plaza.entity';
import { JwtModule } from '../jwt/jwt.module';
import { ValidarToken } from '../security/ValidarToken.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([Plaza]), JwtModule], 
  controllers: [PlazaController],
  providers: [PlazaService],
})
export class PlazaModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidarToken).forRoutes('/plaza')
  }

}
