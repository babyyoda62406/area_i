import { CrearUsuarioDTO } from './dto/CrearUsuario.dto';
import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private svUsuario;
    constructor(svUsuario: UsuarioService);
    getAllUsuarios(): Promise<import("./entities/usuario.entity").Usuario[]>;
    getUsuario(id: number): Promise<{
        message: string;
        usuario: import("./entities/usuario.entity").Usuario & {
            password: string;
        };
    }>;
    crearUsuario(user: CrearUsuarioDTO): Promise<{
        message: string;
        id: number;
    }>;
}
