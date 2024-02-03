import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from 'src/entities/proyecto.entity';
import { Repository } from 'typeorm';
import { OrganizacionService } from '../organizacion/organizacion.service';

@Injectable()
export class ProyectoService {
    constructor(@InjectRepository(Proyecto) private dbProyecto: Repository<Proyecto>, private svOrganizacion: OrganizacionService) {

    }

    async create(createProyectoDto: CreateProyectoDto) {
        const { idOrganizacion, nombre, identificador } = createProyectoDto

        const tempOrganizacion = await this.svOrganizacion.findOne(idOrganizacion)

        const existeProyecto = await this.dbProyecto.findOne({
            where: [
                {nombre},
                {identificador}
            ]
        })

        if(existeProyecto) throw new HttpException(`El ${existeProyecto.nombre==nombre?`nombre ${nombre} `:` identificador ${identificador}`}  no está disponible`, HttpStatus.CONFLICT)

        const tempProyecto = this.dbProyecto.create({...createProyectoDto, organizacion: tempOrganizacion})

        await this.dbProyecto.save(tempProyecto)

        return {message: "Proyecto Creado" , id: tempProyecto.id}
    }

    async findAll() {
        const tempProyectos = await this.dbProyecto.find({
            order: {
                id: 'ASC'
            },
            relations:['organizacion']
        })


        if(tempProyectos.length==0) throw new HttpException('', HttpStatus.NO_CONTENT)

        return tempProyectos
        
    }

    async findOne(id: number) {
        const tempProyecto  = await this.dbProyecto.findOne({
            where:{
                id
            }, 
            relations:['organizacion']
        })

        if(!tempProyecto) throw new HttpException(`No existe proyecto con id ${id}`, HttpStatus.NOT_FOUND)

        return tempProyecto
    }

    async update(id: number, updateProyectoDto: UpdateProyectoDto) {
        const tempProyecto = await this.findOne(id)
        if(Object.keys(updateProyectoDto).length==0) throw new HttpException(`Debe proporcionar al menos una propiedad para editar`, HttpStatus.BAD_REQUEST)

        const {nombre, identificador, estado , organizacionId} = updateProyectoDto

        if(nombre){
            const nombreEnUso = await this.dbProyecto.findOne({
                where: {
                    nombre
                }
            })

            if(nombreEnUso) throw new HttpException(`El nombre  ${nombre} no esta disponible`, HttpStatus.CONFLICT)

            tempProyecto.nombre = nombre
        }


        if(identificador){
            const identificadorEnUso = await this.dbProyecto.findOne({
                where: {
                    identificador
                }
            })

            if(identificadorEnUso) throw new HttpException(`El identificador ${identificador} no esta disponible`, HttpStatus.CONFLICT)

            tempProyecto.identificador = identificador

        }

        if(estado) {
            tempProyecto.estado  = estado
        }

        if(organizacionId){
            const tempOrganizacion  = await this.svOrganizacion.findOne(organizacionId)
            tempProyecto.organizacion = tempOrganizacion
        }


        await this.dbProyecto.save(tempProyecto)
        return {message: 'Proyecto editado', id: tempProyecto.id}
    }



    async remove(id: number) {
        return `This action removes a #${id} proyecto`;
    }
}
