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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../jwt/jwt.service");
const bycrypt = require("bcrypt");
const CrearUsuario_dto_1 = require("../usuario/dto/CrearUsuario.dto");
const usuario_service_1 = require("../usuario/usuario.service");
const AutenticarUsuario_dto_1 = require("./dto/AutenticarUsuario.dto");
const usuario_entity_1 = require("../usuario/entities/usuario.entity");
let AuthController = class AuthController {
    constructor(userService, jwt) {
        this.userService = userService;
        this.jwt = jwt;
    }
    async registrarUsuario(user) {
        const { id } = await this.userService.crearUsuario(user);
        const token = await this.jwt.generarJwt({ id });
        return { msg: 'Usuario Creado', token };
    }
    async autenticarUsuario(user, res) {
        const { correo, password } = user;
        const tempUser = await this.userService.getUsuarioByCorreo(correo);
        if (!bycrypt.compareSync(password, tempUser.password))
            throw new common_1.HttpException('Contraseña incorrecta', common_1.HttpStatus.UNAUTHORIZED);
        if (tempUser.estado != usuario_entity_1.estados_usuario.Activo)
            throw new common_1.HttpException('Su usuario está pendiente de aprobación', common_1.HttpStatus.FORBIDDEN);
        const token = await this.jwt.generarJwt({ id: tempUser.id });
        return res.status(200).json({ message: 'Usuario logeado', token });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CrearUsuario_dto_1.CrearUsuarioDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registrarUsuario", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AutenticarUsuario_dto_1.AutenticarUsuarioDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "autenticarUsuario", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService, jwt_service_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map