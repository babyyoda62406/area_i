import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarifa } from 'src/entities/tarifa.entity';
import { Repository } from 'typeorm';
import { RolesProyectosService } from '../roles-proyectos/roles-proyectos.service';
import { NivelExperticiaService } from '../nivel-experticia/nivel-experticia.service';

@Injectable()
export class TarifaService {
  constructor(
    @InjectRepository(Tarifa) private dbTarifa: Repository<Tarifa>,
    private svRol: RolesProyectosService,
    private svNivelExperticia: NivelExperticiaService
  ) { }

  async create(createTarifaDto: CreateTarifaDto) {
    const { idNivelExperticia, idRol, value } = createTarifaDto
    const tempNivelExperticia = await this.svNivelExperticia.obtenerNivelExperticia(idNivelExperticia)
    const tempRol = await this.svRol.obtenerRolPRoyectos(idRol)

    const newTarifa = this.dbTarifa.create(
      {
        NivelExperticia: tempNivelExperticia, 
        Rol: tempRol, 
        valor: value
      }
    )
    await this.dbTarifa.save(newTarifa)
    return {message: "Tarifa Creada", newTarifa}
  }

  async findAll() {
    const tempTarifas = await this.dbTarifa.find({
        order:{
            id: 'ASC'
        },
        relations:['Rol', 'NivelExperticia']
    })

    if(!tempTarifas.length) throw new HttpException(`` , HttpStatus.NO_CONTENT)

    return tempTarifas
    
  }

  async findOne(id: number) {
    const tempTarifa  = await this.dbTarifa.findOne({
        where: {
            id
        },
        relations:['Rol', 'NivelExperticia']
    })

    if( !tempTarifa) throw new HttpException(`No existe tarifa con id ${id}` , HttpStatus.NOT_FOUND)

    return tempTarifa
  }

  update(id: number, updateTarifaDto: UpdateTarifaDto) {
    return `This action updates a #${id} tarifa`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarifa`;
  }
}
