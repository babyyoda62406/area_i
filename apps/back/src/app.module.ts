import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { JwtModule } from './jwt/jwt.module';
import * as dotenv from "dotenv";

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
      entities: [Usuario]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../front/dist'),
    }),
    AuthModule,
    UsuarioModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
