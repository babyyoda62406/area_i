import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProyectoTarifaService } from './proyecto-tarifa.service';
import { CreateProyectoTarifaDto } from './dto/create-proyecto-tarifa.dto';

@Controller('proyecto-tarifa')
export class ProyectoTarifaController {
  constructor(private readonly proyectoTarifaService: ProyectoTarifaService) {}

  @Post()
  async create(@Body() createProyectoTarifaDto: CreateProyectoTarifaDto) {
    return await this.proyectoTarifaService.create(createProyectoTarifaDto);
  }

  @Get()
  async findAll() {
    return await this.proyectoTarifaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.proyectoTarifaService.findOne(id);
  }

  
  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    return await this.proyectoTarifaService.remove(id);
  }
}
