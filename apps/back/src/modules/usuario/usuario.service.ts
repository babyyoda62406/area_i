import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario} from '../../entities/usuario.entity';
import { Not, Repository } from 'typeorm';
import { CrearUsuarioDTO } from './dto/CrearUsuario.dto';
import * as bycrypt from 'bcrypt';
import { EditarUsuarioDTO } from './dto/EditarUsuario.dto';
import { nomenclador } from 'src/enums/nomenclador';


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


    /**
     * Obtener usuarios
     * @returns usuarios[]
     */
    async getUsuarios() {
        return await this.dbUsuario.find({
            where: {
                estado: Not(nomenclador.Eliminado)
            }
        });
    }

    /**
     * Obtener un usuario por su ID
     * @param id :number id del usuario a buscar
     * @return Usuario | HttpException
     */
    async getUsuario(id: number) {
        const tempUser = await this.dbUsuario.findOne({
            where: {
                id,
                estado: Not(nomenclador.Eliminado)
            },
            relations: ['proyectos'] 
        })

        if (!tempUser) throw new HttpException(`No existe el usuario con el id ${id}`, HttpStatus.NOT_FOUND);
        return tempUser;
    }

    /**
     * Obtener un usuario por el correo
     * @param correo :string correo del usuario
     * @returns Usuario | HttpException
     */
    async getUsuarioByCorreo(correo: string) {

        const tempUser = await this.dbUsuario.findOne({
            where: {
                correo,
                estado: Not(nomenclador.Eliminado)
            }
        })

        if (!tempUser) throw new HttpException(`No Existe usuario con el correo ${correo}`, HttpStatus.NOT_FOUND);

        return tempUser;
    }


    /**
     * Metodo para editar usuarios
     * @param id :number Id del usuario que se desea editar.
     * @param user :EditarUsuarioDTO Parámetros del usuario editar.
     * @returns Usuario | HttpException
     */
    async setUsuario(id: number, user: EditarUsuarioDTO) {
        let tempUsuario:Usuario ; 

        if (user.correo) {
            tempUsuario = await this.dbUsuario.findOne({
                where: {
                    correo: user.correo
                }
            })
        }

        if(tempUsuario) throw new HttpException(`El correo ${user.correo} no esta disponible`, HttpStatus.BAD_REQUEST);

        tempUsuario = await this.getUsuario(id);

        if(user.password){
            user.password = bycrypt.hashSync( user.password ,  bycrypt.genSaltSync(10)); 
        }

        const newUsuario = Object.assign(tempUsuario, user);

        await this.dbUsuario.save(newUsuario);
        return { id: newUsuario.id, correo: newUsuario.correo, password: newUsuario.password, estado: newUsuario.estado };
    }



    /**
     * Marcar usuario como eliminado
     * @param id Id del usuario
     * @returns Usuario | HTTPException
     */
    async softDeleteUsuarioById(id: number) {
        const tempUser = await this.getUsuario(id);
        tempUser.estado = nomenclador.Eliminado

        await this.dbUsuario.save(tempUser)
        return tempUser;
    }


    /**
     * Eliminar Usuario de Forma permanente en la base de datos
     * @param id :number id del usuarios
     * @returns Usuario  | HttpException
     */
    async hardDeleteUsuarioById(id: number) {
        const tempUser = await this.getUsuario(id);
        await this.dbUsuario.delete(tempUser);
        return tempUser;
    }


}
