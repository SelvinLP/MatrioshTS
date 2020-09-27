"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N_Simbolo = exports.L_Simbs = void 0;
//Definimos y exportamos el array
exports.L_Simbs = new Array();
var N_Simbolo = /** @class */ (function () {
    function N_Simbolo(letoconst, id, tipo, valor, entorno) {
        this.letoconst = letoconst;
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
        this.entorno = entorno;
    }
    return N_Simbolo;
}());
exports.N_Simbolo = N_Simbolo;
