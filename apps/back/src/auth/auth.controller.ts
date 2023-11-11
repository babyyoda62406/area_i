import { Body, Controller,  Post, HttpException, HttpStatus, Res } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import * as bycrypt from 'bcrypt';

import { CrearUsuarioDTO } from 'src/usuario/dto/CrearUsuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AutenticarUsuarioDTO } from './dto/AutenticarUsuario.dto';
import { estados_usuario } from 'src/usuario/entities/usuario.entity';

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


    @Post('login')
    async autenticarUsuario(@Body() user: AutenticarUsuarioDTO,  @Res({passthrough: true}) res ){
        const {correo, password} = user 
        

        const tempUser = await this.userService.getUsuarioByCorreo(correo);


        if(!bycrypt.compareSync(password , tempUser.password)) throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED); 

        if(tempUser.estado != estados_usuario.Activo) throw new HttpException('Su usuario está pendiente de aprobación' , HttpStatus.FORBIDDEN); 

        const token = await this.jwt.generarJwt({id: tempUser.id})

        res.status(200).json({message: 'Usuario logeado' , token});
        

    }
}
