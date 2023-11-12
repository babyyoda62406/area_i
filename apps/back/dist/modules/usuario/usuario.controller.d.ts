import { CrearUsuarioDTO } from './dto/CrearUsuario.dto';
import { UsuarioService } from './usuario.service';
import { EditarUsuarioDTO } from './dto/EditarUsuario.dto';
export declare class UsuarioController {
    private svUsuario;
    constructor(svUsuario: UsuarioService);
    getAllUsuarios(): Promise<import("../../entities/usuario.entity").Usuario[]>;
    getUsuario(id: number): Promise<{
        message: string;
        usuario: import("../../entities/usuario.entity").Usuario & {
            password: string;
        };
    }>;
    crearUsuario(user: CrearUsuarioDTO): Promise<{
        message: string;
        id: number;
    }>;
    setUsuario(id: number, user: EditarUsuarioDTO): Promise<{
        menssage: string;
        id: number;
    }>;
    deleteUsuario(id: number): Promise<{
        message: string;
        id: number;
    }>;
}
