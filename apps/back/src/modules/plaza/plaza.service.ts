import { Injectable } from '@nestjs/common';
import { CreatePlazaDto } from './dto/create-plaza.dto';
import { UpdatePlazaDto } from './dto/update-plaza.dto';

@Injectable()
export class PlazaService {
  create(createPlazaDto: CreatePlazaDto) {
    return 'This action adds a new plaza';
  }

  findAll() {
    return `This action returns all plaza`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plaza`;
  }

  update(id: number, updatePlazaDto: UpdatePlazaDto) {
    return `This action updates a #${id} plaza`;
  }

  remove(id: number) {
    return `This action removes a #${id} plaza`;
  }
}
