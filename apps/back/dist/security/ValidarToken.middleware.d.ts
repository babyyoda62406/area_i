import { NestMiddleware } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
declare module 'express' {
    interface Request {
        payload: any;
    }
}
export declare class ValidarToken implements NestMiddleware {
    private jwt;
    constructor(jwt: JwtService);
    use(req: any, res: any, next: (error?: any) => void): Promise<void>;
}
