import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
/**
 * Clase para manejar JSON WEB TOKENS
 */
@Injectable()
export class JwtService {

  /**
   * Metodo para generar JSON WEB TOKEN, 
   * @param arg Carga util adjuntada al JSON WEB Token, De preferencia un JSON {[key in string]: any}
   * @returns Promise<string | undefined>
   */
  generarJwt(arg: any): Promise<string | undefined> {
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

  /**
   * Metodo para validar JSON WEB TOKEN,
   * @param token JSON WEB TOKEN a validar
   * @returns Promise<any> 
   */
  validarJwt(token: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        resolve(payload);
      }
      catch (err) {
        reject(err);
      }
    });

  }

}


