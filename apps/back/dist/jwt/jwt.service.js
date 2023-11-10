"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let JwtService = class JwtService {
    generarJwt(arg) {
        return new Promise((resolve, reject) => {
            const payload = arg;
            jwt.sign(payload, String(process.env.SECRETORPRIVATEKEY), {
                expiresIn: String(process.env.TOKEN_EXPIRED_IN),
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el JWT");
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    ;
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)()
], JwtService);
//# sourceMappingURL=jwt.service.js.map