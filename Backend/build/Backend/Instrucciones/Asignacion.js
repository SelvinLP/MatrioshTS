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
exports.Asignacion = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var N_Error_1 = require("../Errores/N_Error");
var Retorno_1 = require("../Abstracto/Retorno");
var Asignacion = /** @class */ (function (_super) {
    __extends(Asignacion, _super);
    function Asignacion(id, value, tipo, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.value = value;
        _this.tipo = tipo;
        return _this;
    }
    Asignacion.prototype.ejecutar = function (entorno) {
        var resultado = entorno.obtenervar(this.id);
        if (resultado == null) {
            throw new N_Error_1.N_Error('Semantico', 'La variable no existe: ' + this.id, '', this.linea, this.columna);
        }
        if (resultado.letoconst == Retorno_1.TipoDato.CONST) {
            throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + ' no se puede modificar', '', this.linea, this.columna);
        }
        if (this.value == null) {
            //Es incremento o decremento
            if (resultado.tipo == Retorno_1.Tipo.NUMBER) {
                if (this.tipo == Retorno_1.TipoAritmetico.INC) {
                    resultado.valor = resultado.valor + 1;
                }
                else if (this.tipo == Retorno_1.TipoAritmetico.DEC) {
                    resultado.valor = resultado.valor - 1;
                }
                else {
                    throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " no es de tipo compatible para incr o decr", '', this.linea, this.columna);
                }
            }
        }
        else {
            var exp = this.value.ejecutar(entorno);
            //Definicion de tipo sino tiene
            if (resultado.tipo == null) {
                resultado.tipo = exp.tipo;
                resultado.valor = exp.valor;
            }
            else {
                //comprobacion de compatibilidad de datos
                if (resultado.tipo == exp.tipo) {
                    resultado.tipo = exp.tipo;
                    resultado.valor = exp.valor;
                }
                else {
                    throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " no es de tipo compatible con la asignacion", '', this.linea, this.columna);
                }
            }
        }
    };
    return Asignacion;
}(Instruccion_1.Instruccion));
exports.Asignacion = Asignacion;
