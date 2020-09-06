"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
var Tb_Tipos_1 = require("../Otros/Tb_Tipos");
var Expresion = /** @class */ (function () {
    function Expresion(line, column) {
        this.linea = line;
        this.columna = column;
    }
    //Definimos que tipo es el que predomina entre esos dos
    Expresion.prototype.Tipo_dominante = function (tipoIzq, tipoDer) {
        var tipo = Tb_Tipos_1.L_tipos[tipoIzq][tipoDer];
        return tipo;
    };
    return Expresion;
}());
exports.Expresion = Expresion;
