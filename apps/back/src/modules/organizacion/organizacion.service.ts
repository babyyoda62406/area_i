import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacion } from 'src/entities/organizacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizacionService {
    constructor (@InjectRepository(Organizacion) private dbOrganizacion: Repository<Organizacion>){

    }

    async create(createOrganizacionDto: CreateOrganizacionDto) {
        const {nombre} = createOrganizacionDto
        const nombreOcupado  = await this.dbOrganizacion.findOne({
            where: {
                nombre
            }
        })

        if(nombreOcupado) throw new  HttpException(`El nombre de organización ${nombre} no está disponible` , HttpStatus.CONFLICT)


        const tempOrganizacion  = this.dbOrganizacion.create(createOrganizacionDto)

        await this.dbOrganizacion.save(tempOrganizacion)

        return {message: `Organizacion creada` , id: tempOrganizacion.id}
    }

    async findAll() {
        const tempOrganizaciones  = await this.dbOrganizacion.find()
        
        if(!tempOrganizaciones.length) throw new HttpException( ``, HttpStatus.NO_CONTENT)

        return tempOrganizaciones
    }

    async findOne(id: number) {
        const tempOrganizacion = await this.dbOrganizacion.findOne({
            where: {id}
        })

        if(!tempOrganizacion) throw new HttpException(`No existe organización con id ${id}`, HttpStatus.NOT_FOUND)

        return tempOrganizacion
    }

    async update(id: number, updateOrganizacionDto: UpdateOrganizacionDto) {
        const tempOrganizacion = await this.findOne(id)

        if(!Object.keys(updateOrganizacionDto).length) throw new HttpException(`Debe proporcionar al menos una propiedad para editar` , HttpStatus.BAD_REQUEST)

        if( updateOrganizacionDto.nombre){
            const nombreEnUso = await this.dbOrganizacion.findOne({
                where: {nombre: updateOrganizacionDto.nombre}
            })

            if(nombreEnUso) throw new HttpException(`El nombre ${updateOrganizacionDto.nombre} no esta disponible`, HttpStatus.CONFLICT)
        }


        const newOrganizacion   =  Object.assign(tempOrganizacion , updateOrganizacionDto)

        const results =  await this.dbOrganizacion.save(newOrganizacion)


        return { message: `Organización editada`, results}
    }

    async remove(id: number) {
        const tempOrganizacion = await this.findOne(id)

        if(tempOrganizacion.enUso) throw new HttpException(`La roganizacion ${tempOrganizacion.nombre} esta en uso`, HttpStatus.FORBIDDEN)
        
        const results = await this.dbOrganizacion.remove(tempOrganizacion)

        return {message: 'Organización eliminada' , results}
    }
}
