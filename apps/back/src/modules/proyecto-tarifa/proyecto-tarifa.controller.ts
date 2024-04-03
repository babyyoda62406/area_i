import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectoTarifaService } from './proyecto-tarifa.service';
import { CreateProyectoTarifaDto } from './dto/create-proyecto-tarifa.dto';
import { UpdateProyectoTarifaDto } from './dto/update-proyecto-tarifa.dto';

@Controller('proyecto-tarifa')
export class ProyectoTarifaController {
  constructor(private readonly proyectoTarifaService: ProyectoTarifaService) {}

  @Post()
  create(@Body() createProyectoTarifaDto: CreateProyectoTarifaDto) {
    return this.proyectoTarifaService.create(createProyectoTarifaDto);
  }

  @Get()
  findAll() {
    return this.proyectoTarifaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoTarifaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoTarifaDto: UpdateProyectoTarifaDto) {
    return this.proyectoTarifaService.update(+id, updateProyectoTarifaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoTarifaService.remove(+id);
  }
}
