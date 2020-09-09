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
exports.Logica = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var Logica = /** @class */ (function (_super) {
    __extends(Logica, _super);
    function Logica(left, right, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.left = left;
        _this.right = right;
        _this.type = type;
        return _this;
    }
    Logica.prototype.ejecutar = function (entorno) {
        if (this.right != null) {
            var valorizq = this.left.ejecutar(entorno);
            var valorder = this.right.ejecutar(entorno);
            if (this.type == Retorno_1.TipoLogica.AND) {
                if (valorizq.tipo != Retorno_1.Tipo.BOOLEAN || valorder.tipo != Retorno_1.Tipo.BOOLEAN) {
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " && " + valorder.valor, this.linea, this.columna);
                }
                else {
                    var resultado = valorizq.valor && valorder.valor;
                    return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
                }
            }
            else {
                if (valorizq.tipo != Retorno_1.Tipo.BOOLEAN || valorder.tipo != Retorno_1.Tipo.BOOLEAN) {
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " || " + valorder.valor, this.linea, this.columna);
                }
                else {
                    var resultado = valorizq.valor || valorder.valor;
                    return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
                }
            }
        }
        else {
            //Validamos el not
            var valorizq = this.left.ejecutar(entorno);
            if (valorizq.tipo != Retorno_1.Tipo.BOOLEAN) {
                throw new N_Error_1.N_Error('Semantico', 'No se puede operar: !' + valorizq.valor, this.linea, this.columna);
            }
            else {
                var resultado = !valorizq.valor;
                return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
            }
        }
    };
    return Logica;
}(Expresion_1.Expresion));
exports.Logica = Logica;
