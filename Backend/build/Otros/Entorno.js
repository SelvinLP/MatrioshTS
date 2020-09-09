"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
var Vaiable_1 = require("../Abstracto/Vaiable");
var Entorno = /** @class */ (function () {
    function Entorno(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
    }
    Entorno.prototype.guardarVar = function (id, valor, tipo) {
        this.variables.set(id, new Vaiable_1.Variable(id, valor, tipo));
    };
    return Entorno;
}());
exports.Entorno = Entorno;
