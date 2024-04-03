import { Injectable } from '@nestjs/common';
import { CreateProyectoTarifaDto } from './dto/create-proyecto-tarifa.dto';
import { UpdateProyectoTarifaDto } from './dto/update-proyecto-tarifa.dto';

@Injectable()
export class ProyectoTarifaService {
  create(createProyectoTarifaDto: CreateProyectoTarifaDto) {
    return 'This action adds a new proyectoTarifa';
  }

  findAll() {
    return `This action returns all proyectoTarifa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proyectoTarifa`;
  }

  update(id: number, updateProyectoTarifaDto: UpdateProyectoTarifaDto) {
    return `This action updates a #${id} proyectoTarifa`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyectoTarifa`;
  }
}
