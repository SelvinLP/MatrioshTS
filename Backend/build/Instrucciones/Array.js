"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C_Array = /** @class */ (function () {
    function C_Array(tipo, listaarray) {
        this.tipo = tipo;
        this.listaarray = listaarray;
    }
    return C_Array;
}());
exports.C_Array = C_Array;
var L_Array = /** @class */ (function () {
    function L_Array(valor, lista) {
        this.valor = valor;
        this.lista = lista;
    }
    L_Array.prototype.agregardimension = function (dimension) {
        this.lista = dimension;
    };
    return L_Array;
}());
exports.L_Array = L_Array;
