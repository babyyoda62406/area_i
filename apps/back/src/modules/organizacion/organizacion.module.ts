import { MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { OrganizacionService } from './organizacion.service';
import { OrganizacionController } from './organizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizacion } from 'src/entities/organizacion.entity';
import { ValidarToken } from '../security/ValidarToken.middleware';
import { JwtModule } from '../jwt/jwt.module';


@Module({
  imports: [TypeOrmModule.forFeature([Organizacion]) , JwtModule], 
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
  exports: [OrganizacionService]
})
export class OrganizacionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidarToken).forRoutes('organizacion')
  }
}
