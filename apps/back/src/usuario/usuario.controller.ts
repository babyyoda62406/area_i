import { Controller, Get, Req } from '@nestjs/common';


@Controller('usuarios')
export class UsuarioController {

    @Get()
    getAllUsuarios(@Req() req){
        console.log(req.payload)
        return 'Todos los usuarios'; 
    }
}

