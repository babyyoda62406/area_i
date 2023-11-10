import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';

import { CrearUsuarioDTO } from 'src/usuario/dto/CrearUsuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UsuarioService , private jwt: JwtService){
    }

    @Post('register')
    async registrarUsuario(@Body() user: CrearUsuarioDTO){
        const {id } =  await this.userService.crearUsuario(user); 
        const token =  await this.jwt.generarJwt({id})
        return {msg: 'Usuario Creado', token}
    }

}
