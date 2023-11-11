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
exports.EditarUsuarioDTO = void 0;
const class_validator_1 = require("class-validator");
const usuario_entity_1 = require("../entities/usuario.entity");
var estados_usuarioPermitidos;
(function (estados_usuarioPermitidos) {
    estados_usuarioPermitidos["Activo"] = "Activo";
    estados_usuarioPermitidos["Inactivo"] = "Inactivo";
})(estados_usuarioPermitidos || (estados_usuarioPermitidos = {}));
class EditarUsuarioDTO {
}
exports.EditarUsuarioDTO = EditarUsuarioDTO;
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El correo debe ser un string'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditarUsuarioDTO.prototype, "correo", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'La contraseña debe ser un string'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditarUsuarioDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(estados_usuarioPermitidos, {
        message: `Debe ajsutarse a los estados permitidos Activo | Inactivo`
    }),
    __metadata("design:type", String)
], EditarUsuarioDTO.prototype, "estado", void 0);
//# sourceMappingURL=EditarUsuario.dto.js.map