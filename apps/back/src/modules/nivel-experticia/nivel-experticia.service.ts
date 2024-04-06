import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrearNivelExperticia } from './dto/CrearNivelExperticia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelExperticia } from '../../entities/nivel-experticia.entity';
import { Not, Repository } from 'typeorm';
import { nomencladorEstados } from 'src/enums/nomenclador';
import { EditarNivelExperticiaDTO } from './dto/EditarNivelExperticia.dto';

/**
 * Servicio de gestion de niveles de experticia
 */
@Injectable()
export class NivelExperticiaService {
    constructor(@InjectRepository(NivelExperticia) private dbNivelExperticia: Repository<NivelExperticia>) { }

    /**
     * Servicio para crear nivel de experticia
     * @param nivelExperticia  :CrearNivelExperticia (DTO)
     * @returns NivelExperticia | HttpException
     */
    async crearNivelExpdrticia(nivelExperticia: CrearNivelExperticia) {
        const tempNivelExperticia = await this.dbNivelExperticia.findOne({
            where: {
                nombre: nivelExperticia.nombre
            }
        })

        if (tempNivelExperticia) throw new HttpException(`El nombre de nivel de experticia ${nivelExperticia.nombre} no está disponible`, HttpStatus.CONFLICT)

        const newNivelExperticia = this.dbNivelExperticia.create(nivelExperticia);
        await this.dbNivelExperticia.save(newNivelExperticia);
        return newNivelExperticia;
    }

    /**
     * Servicio para Obtener un nivel de experticia por ID
     * @param id :number Número del nivel de experticia que se quiere obtener
     * @returns NivelExperticia | HTTPException
     */
    async obtenerNivelExperticia(id: number){
        const tempNivelEperticia = await this.dbNivelExperticia.findOne({
            where: {
                id, 
                estado: Not(nomencladorEstados.Eliminado)
            }
        })

        if(!tempNivelEperticia) throw new HttpException(`No existe nivel de expelrticia con el id  ${id}`, HttpStatus.NOT_FOUND )

        return tempNivelEperticia ;

    }

    /**
     *Servicio para  Obtener niveles de experticia
     * @returns NivelExperticia | HttpException
     */
    async obetenerNivelesExperticia() {

        const tempNivelExperticia = await this.dbNivelExperticia.find({
            where: {
                estado: Not(nomencladorEstados.Eliminado)
            }
        })

        if (!tempNivelExperticia.length) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempNivelExperticia ; 
    }

    /**
     * Servicio para eliminar nivel de experticia por ID 
     * @param id :number Numero del nivel de experticia que se desea obtener.
     * @returns NivelExperticia | HttpException
     */
    async eliminarNivelExperticia(id: number){
        const tempNivelExperticia = await this.obtenerNivelExperticia(id)

        tempNivelExperticia.estado = nomencladorEstados.Eliminado

        return await this.dbNivelExperticia.save(tempNivelExperticia)
    }

    /**
     * Servicio para editar nivel de experticia 
     * @param id :id Id del nivel de experticia que se desea editar 
     * @param nivelExperticia : EditarNivelExperticiaDTO
     * @returns NivelExperticia | HttpException
     */
    async editarNivelExperticia(id: number, nivelExperticia: EditarNivelExperticiaDTO){
        const tempNivelExperticia = await this.obtenerNivelExperticia(id)


        if(nivelExperticia.nombre){
            const tempNivelExperticia = await this.dbNivelExperticia.findOne({
                where: {
                    nombre: nivelExperticia.nombre
                }
            })

            if( tempNivelExperticia) throw new HttpException(`El nombre de nivel de experticia ${nivelExperticia.nombre} no esta disponible`, HttpStatus.CONFLICT)
        }
        
        const newNivelExperticia: NivelExperticia = Object.assign(tempNivelExperticia  , nivelExperticia); 

        await this.dbNivelExperticia.save(newNivelExperticia)

        return newNivelExperticia; 
    }
}
