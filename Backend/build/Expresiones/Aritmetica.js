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
exports.Aritmetica = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var Aritmetica = /** @class */ (function (_super) {
    __extends(Aritmetica, _super);
    function Aritmetica(left, right, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.left = left;
        _this.right = right;
        _this.type = type;
        return _this;
    }
    Aritmetica.prototype.ejecutar = function () {
        var valorizq = this.left.ejecutar();
        var valorder = this.right.ejecutar();
        var resultado;
        var tipoDominante = this.Tipo_dominante(valorizq.tipo, valorder.tipo);
        if (this.type == Retorno_1.TipoAritmetico.MAS) {
            if (tipoDominante == Retorno_1.Tipo.STRING)
                resultado = { valor: (valorizq.valor.toString() + valorder.valor.toString()), tipo: Retorno_1.Tipo.NUMBER };
            else if (tipoDominante == Retorno_1.Tipo.NUMBER)
                resultado = { valor: (valorizq.valor + valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
            else
                throw console.log("Error semantico no se puede operar +"); //falta poner error         
        }
        else if (this.type == Retorno_1.TipoAritmetico.MENOS) {
            if (tipoDominante == Retorno_1.Tipo.NUMBER)
                resultado = { valor: (valorizq.valor - valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
            else
                throw console.log("Error semantico no se puede operar -"); //falta poner error 
        }
        else if (this.type == Retorno_1.TipoAritmetico.MULT) {
            if (tipoDominante == Retorno_1.Tipo.NUMBER)
                resultado = { valor: (valorizq.valor * valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
            else
                throw console.log("Error semantico no se puede operar *"); //falta poner error
        }
        else {
            if (tipoDominante == Retorno_1.Tipo.NUMBER && valorder.valor != 0)
                resultado = { valor: (valorizq.valor / valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
            else
                throw console.log("Error semantico no se puede operar /"); //falta poner error  
        }
        ;
        return resultado;
    };
    return Aritmetica;
}(Expresion_1.Expresion));
exports.Aritmetica = Aritmetica;
