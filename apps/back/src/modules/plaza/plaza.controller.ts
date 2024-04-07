import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlazaService } from './plaza.service';
import { CreatePlazaDto } from './dto/create-plaza.dto';
import { UpdatePlazaDto } from './dto/update-plaza.dto';

@Controller('plaza')
export class PlazaController {
  constructor(private readonly plazaService: PlazaService) {}

  @Post()
  create(@Body() createPlazaDto: CreatePlazaDto) {
    return this.plazaService.create(createPlazaDto);
  }

  @Get()
  findAll() {
    return this.plazaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plazaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlazaDto: UpdatePlazaDto) {
    return this.plazaService.update(+id, updatePlazaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plazaService.remove(+id);
  }
}
