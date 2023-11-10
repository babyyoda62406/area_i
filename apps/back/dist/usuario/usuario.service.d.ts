import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CrearUsuarioDTO } from './dto/CrearUsuario.dto';
export declare class UsuarioService {
    private dbUsuario;
    constructor(dbUsuario: Repository<Usuario>);
    crearUsuario(user: CrearUsuarioDTO): Promise<Usuario>;
    getUsuarioByCorreo(correo: string): Promise<Usuario>;
}
