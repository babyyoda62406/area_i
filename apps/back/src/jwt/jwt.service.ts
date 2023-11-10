import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class JwtService {

    generarJwt(arg: any): Promise<string | undefined>{
        return new Promise((resolve, reject) => {
          const payload = arg;
      
          jwt.sign(payload, String(process.env.SECRETORPRIVATEKEY), {
            expiresIn: String(process.env.TOKEN_EXPIRED_IN),
          }, (err, token) => {
            if (err) {
              console.log(err);
              reject("No se pudo generar el JWT");
            } else {
              resolve(token);
            }
          });
        });
      };
      
}


