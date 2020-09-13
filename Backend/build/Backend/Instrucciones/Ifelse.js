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
exports.Ifelse = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var Ifelse = /** @class */ (function (_super) {
    __extends(Ifelse, _super);
    function Ifelse(condicion, codigo, elsest, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.condicion = condicion;
        _this.codigo = codigo;
        _this.elsest = elsest;
        return _this;
    }
    Ifelse.prototype.ejecutar = function (entorno) {
        var condicion = this.condicion.ejecutar(entorno);
        if (condicion.tipo == Retorno_1.Tipo.BOOLEAN) {
            if (condicion.valor == true) {
                return this.codigo.ejecutar(entorno);
            }
            else {
                if (this.elsest != null)
                    this.elsest.ejecutar(entorno);
            }
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'La operacion no es booleana en el If ' + condicion.valor, '', this.linea, this.columna);
        }
    };
    return Ifelse;
}(Instruccion_1.Instruccion));
exports.Ifelse = Ifelse;
