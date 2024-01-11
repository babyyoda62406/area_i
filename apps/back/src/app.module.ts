import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from './modules/jwt/jwt.module';
import { SecurityModule } from './modules/security/security.module';
import * as dotenv from "dotenv";
import { HelpersModule } from './modules/helpers/helpers.module';
import { RolesProyectosModule } from './modules/roles-proyectos/roles-proyectos.module';
import { RolesProyectos } from './entities/roles-proyectos.entity';
import { NivelExperticiaModule } from './modules/nivel-experticia/nivel-experticia.module';
import { NivelExperticia } from './entities/nivel-experticia.entity';
import {  APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './CustomValidationPipe';
import { IndicadoresModule } from './modules/indicadores/indicadores.module';
import { Indicador } from './entities/indicador.entity';
import { PersonasModule } from './modules/personas/personas.module';
import { Persona } from './entities/persona.entity';
import { OrganizacionModule } from './modules/organizacion/organizacion.module';
import { Organizacion } from './entities/organizacion.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      database: process.env.DATABASE,
      username: process.env.USERNAME,
      port: Number(process.env.PORT_DB),
      password: process.env.PASSWORD,
      synchronize: true,
      entities: [Usuario, RolesProyectos, NivelExperticia,  Indicador,Persona, Organizacion]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../front/dist'),
    }),
    AuthModule,
    UsuarioModule,
    JwtModule,
    SecurityModule,
    HelpersModule,
    RolesProyectosModule,
    NivelExperticiaModule,
    IndicadoresModule,
    PersonasModule,
    OrganizacionModule
  ],
  controllers: [AppController],
  providers: [AppService, 
  {
    provide: APP_PIPE, 
    useClass: CustomValidationPipe
  }],
})
export class AppModule {}
