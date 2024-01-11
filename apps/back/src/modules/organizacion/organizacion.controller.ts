import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrganizacionService } from './organizacion.service';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';

@Controller('organizacion')
export class OrganizacionController {
  constructor(private readonly organizacionService: OrganizacionService) {}

  @Post()
  async create(@Body() createOrganizacionDto: CreateOrganizacionDto) {
    return await this.organizacionService.create(createOrganizacionDto);
  }

  @Get()
  async findAll() {
    return await  this.organizacionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await  this.organizacionService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id',  ParseIntPipe) id: number, @Body() updateOrganizacionDto: UpdateOrganizacionDto) {
    return await  this.organizacionService.update(id, updateOrganizacionDto);
  }

  @Delete(':id')
  async remove(@Param('id' , ParseIntPipe) id: number) {
    return await  this.organizacionService.remove(id);
  }
}
