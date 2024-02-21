import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TarifaService } from './tarifa.service';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';

@Controller('tarifa')
export class TarifaController {
  constructor(private readonly tarifaService: TarifaService) {}

  @Post()
  async create(@Body() createTarifaDto: CreateTarifaDto) {
    return  await this.tarifaService.create(createTarifaDto);
  }

  @Get()
  async findAll() {
    return await  this.tarifaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tarifaService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id',  ParseIntPipe) id: number, @Body() updateTarifaDto: UpdateTarifaDto) {
    return await  this.tarifaService.update(+id, updateTarifaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await  this.tarifaService.remove(id);
  }
}
