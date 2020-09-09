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
exports.Dowhile = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var Dowhile = /** @class */ (function (_super) {
    __extends(Dowhile, _super);
    function Dowhile(condicion, codigo, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.condicion = condicion;
        _this.codigo = codigo;
        return _this;
    }
    Dowhile.prototype.ejecutar = function (entorno) {
        var condicion;
        do {
            this.codigo.ejecutar(entorno);
            condicion = this.condicion.ejecutar(entorno);
            if (condicion.tipo != Retorno_1.Tipo.BOOLEAN) {
                throw new N_Error_1.N_Error('Semantico', 'La operacion no es booleana en el do..while', this.linea, this.columna);
            }
        } while (condicion.valor == true);
    };
    return Dowhile;
}(Instruccion_1.Instruccion));
exports.Dowhile = Dowhile;
