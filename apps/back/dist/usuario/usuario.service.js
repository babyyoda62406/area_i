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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const typeorm_2 = require("typeorm");
const bycrypt = require("bcrypt");
let UsuarioService = class UsuarioService {
    constructor(dbUsuario) {
        this.dbUsuario = dbUsuario;
    }
    async crearUsuario(user) {
        const { correo, password } = user;
        const userClon = await this.dbUsuario.findOne({
            where: {
                correo
            }
        });
        if (userClon)
            throw new common_1.HttpException(`EL correo ${user.correo} esta ocupado`, common_1.HttpStatus.BAD_REQUEST);
        const salt = bycrypt.genSaltSync(10);
        user.password = bycrypt.hashSync(password, salt);
        return await this.dbUsuario.save(this.dbUsuario.create(user));
    }
    async getUsuarioByCorreo(correo) {
        const tempUser = await this.dbUsuario.findOne({
            where: {
                correo
            }
        });
        if (!tempUser)
            throw new common_1.HttpException(`No Existe usuario con el correo ${correo}`, common_1.HttpStatus.NOT_FOUND);
        return tempUser;
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map