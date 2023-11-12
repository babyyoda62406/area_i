"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamposPermitidos = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let CamposPermitidos = class CamposPermitidos {
    validate(value, args) {
        console.log(args);
        const allowedFields = ['correo', 'password'];
        for (const field in value) {
            if (!allowedFields.includes(field)) {
                return false;
            }
        }
        return true;
    }
    defaultMessage(args) {
        args;
        return 'Solo se permiten los campos: correo, password';
    }
};
exports.CamposPermitidos = CamposPermitidos;
exports.CamposPermitidos = CamposPermitidos = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'customValidation', async: false }),
    (0, common_1.Injectable)()
], CamposPermitidos);
//# sourceMappingURL=helpers.service.js.map