import { CrearUsuarioDTO } from './dto/CrearUsuario.dto';
import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private svUsuario;
    constructor(svUsuario: UsuarioService);
    getAllUsuarios(): string;
    crearUsuario(user: CrearUsuarioDTO): Promise<{
        message: string;
        id: number;
    }>;
}
