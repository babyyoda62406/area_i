import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProyectoTarifaDto } from './dto/create-proyecto-tarifa.dto';
// import { UpdateProyectoTarifaDto } from './dto/update-proyecto-tarifa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoTarifa } from 'src/entities/proyecto-tarifa.entity';
import { Repository } from 'typeorm';
import { ProyectoService } from '../proyecto/proyecto.service';
import { TarifaService } from '../tarifa/tarifa.service';

@Injectable()
export class ProyectoTarifaService {
	constructor(
		@InjectRepository(ProyectoTarifa) private dbProyectoTarifa: Repository<ProyectoTarifa>,
		private svProyecto: ProyectoService,
		private svTarifa: TarifaService
	) { }

	async create(createProyectoTarifaDto: CreateProyectoTarifaDto) {
		const { idProyecto, idTarifa } = createProyectoTarifaDto

		const tempTarifa = await this.svTarifa.findOne(idTarifa)
		const tempProyecto = await this.svProyecto.findOne(idProyecto)

		const tempProyectoTarifa = await this.dbProyectoTarifa.find({
			relations:['proyecto', 'tarifa']
		})

		if(tempProyectoTarifa.findIndex(arg => (arg.proyecto.id == idProyecto && arg.tarifa.id == idTarifa )) != -1) throw new HttpException(`La tarifa con id ${idTarifa} ya existe en el proyecto`, HttpStatus.CONFLICT)

		const newProyectoTarifa = this.dbProyectoTarifa.create({ proyecto: tempProyecto, tarifa: tempTarifa })

		await this.dbProyectoTarifa.save(newProyectoTarifa)
		await this.svProyecto.useProyecto(tempProyecto.id)
		await this.svTarifa.useTarifa(tempTarifa.id)

		return { message: "Tarifa Asignada al proyecto" };
	}

	async findAll() {
		const tempProyectoTarifas = await this.dbProyectoTarifa.find({
			order: {
				id: 'ASC'
			}
		})

		if (!tempProyectoTarifas.length) throw new HttpException(``, HttpStatus.NO_CONTENT)

		return tempProyectoTarifas
	}

	async findOne(id: number) {
		const tempProyectoTarifa  = await this.dbProyectoTarifa.findOne({
			where:{
				id
			},
			relations:['proyecto', 'tarifa']
		})

		if(!tempProyectoTarifa) throw new HttpException(`No existe asociación proyecto-tarifa con id ${id}`,HttpStatus.NOT_FOUND )

		return tempProyectoTarifa
	}


	async useProyectoTarifa(id: number){
		const tempProyectoTarifa = await this.findOne(id)
		tempProyectoTarifa.enUso = true 

		await this.dbProyectoTarifa.save(tempProyectoTarifa)
		
		return true 
	}

	async deUseProyectoTarifa(id: number){
		const tempProyectoTarifa = await this.findOne(id)
		
		// Condición de asociacion proyecto tarifa en uso 
		if(false) return false

		tempProyectoTarifa.enUso  = false 

		await this.dbProyectoTarifa.save(tempProyectoTarifa)

		return true  ; 
	}

	async remove(id: number) {
		const temprProyectoTarifa = await this.findOne(id)

		if(temprProyectoTarifa.enUso) throw new HttpException(`No se puede eliminar la asociación proyecto-tarifa con id ${id} porque está en uso `, HttpStatus.FORBIDDEN )

		await this.dbProyectoTarifa.remove( temprProyectoTarifa)

		return {message:"Asociación proyecto tarifa eliminada"}
	}
}
