import { PartialType } from '@nestjs/mapped-types';
import { CreateProyectoTarifaDto } from './create-proyecto-tarifa.dto';

export class UpdateProyectoTarifaDto extends PartialType(CreateProyectoTarifaDto) {
    
}
