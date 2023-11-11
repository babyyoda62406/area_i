import { JwtService } from 'src/jwt/jwt.service';
import { CrearUsuarioDTO } from 'src/usuario/dto/CrearUsuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AutenticarUsuarioDTO } from './dto/AutenticarUsuario.dto';
export declare class AuthController {
    private userService;
    private jwt;
    constructor(userService: UsuarioService, jwt: JwtService);
    registrarUsuario(user: CrearUsuarioDTO): Promise<{
        msg: string;
        token: string;
    }>;
    autenticarUsuario(user: AutenticarUsuarioDTO, res: any): Promise<void>;
}
