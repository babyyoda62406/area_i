import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@Controller('proyecto')
export class ProyectoController {
	constructor(private readonly proyectoService: ProyectoService) { }

	@Post()
	async create(@Body() createProyectoDto: CreateProyectoDto) {
		return await this.proyectoService.create(createProyectoDto);
	}

	@Get()
	async findAll() {
		return await this.proyectoService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.proyectoService.findOne(id);
	}

	@Patch(':id')
	async update(@Param('id', ParseIntPipe) id: number, @Body() updateProyectoDto: UpdateProyectoDto) {
		return await this.proyectoService.update(id, updateProyectoDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.proyectoService.remove(+id);
	}
}
