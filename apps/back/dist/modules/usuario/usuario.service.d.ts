import { Usuario, estados_usuario } from '../../entities/usuario.entity';
import { Repository } from 'typeorm';
import { CrearUsuarioDTO } from './dto/CrearUsuario.dto';
import { EditarUsuarioDTO } from './dto/EditarUsuario.dto';
export declare class UsuarioService {
    private dbUsuario;
    constructor(dbUsuario: Repository<Usuario>);
    crearUsuario(user: CrearUsuarioDTO): Promise<Usuario>;
    getUsuarios(): Promise<Usuario[]>;
    getUsuario(id: number): Promise<Usuario>;
    getUsuarioByCorreo(correo: string): Promise<Usuario>;
    setUsuario(id: number, user: EditarUsuarioDTO): Promise<{
        id: number;
        correo: string;
        password: string;
        estado: estados_usuario;
    }>;
    softDeleteUsuarioById(id: number): Promise<Usuario>;
    hardDeleteUsuarioById(id: number): Promise<Usuario>;
}
