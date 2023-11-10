import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports:[UsuarioModule , JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
