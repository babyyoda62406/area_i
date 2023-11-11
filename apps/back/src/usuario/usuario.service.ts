import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CrearUsuarioDTO } from './dto/CrearUsuario.dto';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario) private dbUsuario: Repository<Usuario>) {
    }

    /**
     * Esta Funcion crea un usuario
     * @param user Este es el Skema del usuario  
     */
    async crearUsuario(user: CrearUsuarioDTO): Promise<Usuario> {
        const { correo, password } = user

        const userClon = await this.dbUsuario.findOne({
            where: {
                correo
            }
        })

        if (userClon) throw new HttpException(`EL correo ${user.correo} esta ocupado`, HttpStatus.BAD_REQUEST)

        const salt = bycrypt.genSaltSync(10);
        user.password = bycrypt.hashSync(password, salt)
        return await this.dbUsuario.save(this.dbUsuario.create(user));

    }

    async getUsuarioByCorreo(correo: string) {

        const tempUser =await  this.dbUsuario.findOne({
            where: {
                correo
            }
        })

        if(!tempUser) throw new HttpException(`No Existe usuario con el correo ${correo}` ,  HttpStatus.NOT_FOUND);

        return tempUser ; 
    }
}
