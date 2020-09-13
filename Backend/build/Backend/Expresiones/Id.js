"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var N_Error_1 = require("../Errores/N_Error");
var Id = /** @class */ (function (_super) {
    __extends(Id, _super);
    function Id(id, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        return _this;
    }
    Id.prototype.ejecutar = function (entorno) {
        var resultado = entorno.obtenervar(this.id);
        if (resultado == null) {
            throw new N_Error_1.N_Error('Semantico', 'La variable no existe: ' + this.id, '', this.linea, this.columna);
        }
        if (resultado.valor == null) {
            throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + ' no contiene valor ', '', this.linea, this.columna);
        }
        return { valor: resultado.valor, tipo: resultado.tipo };
    };
    return Id;
}(Expresion_1.Expresion));
exports.Id = Id;
