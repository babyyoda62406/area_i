import { JwtService } from 'src/jwt/jwt.service';
import { CrearUsuarioDTO } from 'src/usuario/dto/CrearUsuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
export declare class AuthController {
    private userService;
    private jwt;
    constructor(userService: UsuarioService, jwt: JwtService);
    registrarUsuario(user: CrearUsuarioDTO): Promise<{
        msg: string;
        token: string;
    }>;
}
