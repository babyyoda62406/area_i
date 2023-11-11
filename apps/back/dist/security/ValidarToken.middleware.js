"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidarToken = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../jwt/jwt.service");
let ValidarToken = class ValidarToken {
    constructor(jwt) {
        this.jwt = jwt;
    }
    async use(req, res, next) {
        req.headers['userId'] = -1;
        if (!req.headers || !req.headers['token'])
            throw new common_1.HttpException('Es necesario su token para procesar esta petición ', common_1.HttpStatus.BAD_REQUEST);
        const token = req.headers['token'];
        await this.jwt.validarJwt(token)
            .then(data => {
            req.payload = data;
            next();
        })
            .catch(err => {
            throw new common_1.HttpException(`No dispone de un privilegio requerido  {${err}}`, common_1.HttpStatus.UNAUTHORIZED);
        });
    }
};
exports.ValidarToken = ValidarToken;
exports.ValidarToken = ValidarToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], ValidarToken);
//# sourceMappingURL=ValidarToken.middleware.js.map