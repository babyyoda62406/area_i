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
  update(@Param('id') id: string, @Body() updateTarifaDto: UpdateTarifaDto) {
    return this.tarifaService.update(+id, updateTarifaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarifaService.remove(+id);
  }
}
