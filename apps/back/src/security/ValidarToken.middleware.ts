import { HttpException, NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';


declare module 'express' {
    interface Request {
        payload: any; 
    }
}

/**
 * Middleware para corroborar el token.
 */
@Injectable()
export class ValidarToken implements NestMiddleware {
    constructor(private jwt: JwtService) {

    }
    async use(req: any, res: any, next: (error?: any) => void) {
        req.headers['userId'] = -1;
        if (!req.headers || !req.headers['token']) throw new HttpException('Es necesario su token para procesar esta petición ', HttpStatus.BAD_REQUEST);

        const token = req.headers['token'];

        await this.jwt.validarJwt(token)
            .then(data =>{
                req.payload = data
                next()
            })
            .catch(err => {
                throw new HttpException(`No dispone de un privilegio requerido  {${err}}`, HttpStatus.UNAUTHORIZED); 
            })

    }
}