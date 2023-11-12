import { Body, Controller, Post, HttpException, HttpStatus, Res } from '@nestjs/common';
import { JwtService } from 'src/modules/jwt/jwt.service';
import * as bycrypt from 'bcrypt';

import { CrearUsuarioDTO } from 'src/modules/usuario/dto/CrearUsuario.dto';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { AutenticarUsuarioDTO } from './dto/AutenticarUsuario.dto';
import { estados_usuario } from 'src/entities/usuario.entity';

/**
 * Clase q agrupa los controladores de la ruta /auth
 */
@Controller('auth')
export class AuthController {

    // Injeccion de dependencias....
    constructor(private userService: UsuarioService, private jwt: JwtService) {
    }

    /**
     * Controlador de registro de Usuario.
     * @param user Recibe un objeto de tipo CrearUsuarioDTO
     * @returns JSON | HttpException :(
     */
    @Post('register')
    async registrarUsuario(@Body() user: CrearUsuarioDTO) {
        
        const { id } = await this.userService.crearUsuario(user);

        const token = await this.jwt.generarJwt({ id })

        return { msg: 'Usuario Creado', token }
    }


    /**
     * Controlador de login de usuario (Autenticar)
     * @param user Objeto tipo AutenticarUsuarioDTO  
     * @param res Ineccion del Res de Express, para bajar al nivel de controlar la respuesta via res.status(#).json({...})
     */
    @Post('login')
    async autenticarUsuario(@Body() user: AutenticarUsuarioDTO, @Res({ passthrough: true }) res) {
        const { correo, password } = user


        const tempUser = await this.userService.getUsuarioByCorreo(correo);


        if (!bycrypt.compareSync(password, tempUser.password)) throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);

        if (tempUser.estado != estados_usuario.Activo) throw new HttpException('Su usuario está pendiente de aprobación', HttpStatus.FORBIDDEN);

        const token = await this.jwt.generarJwt({ id: tempUser.id })

        res.status(200).json({ message: 'Usuario logeado', token });


    }
}
