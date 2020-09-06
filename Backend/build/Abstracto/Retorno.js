"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAritmetico = exports.Tipo = void 0;
//Tipos de variables
var Tipo;
(function (Tipo) {
    Tipo[Tipo["STRING"] = 0] = "STRING";
    Tipo[Tipo["NUMBER"] = 1] = "NUMBER";
    Tipo[Tipo["BOOLEAN"] = 2] = "BOOLEAN";
    Tipo[Tipo["NULL"] = 3] = "NULL";
    Tipo[Tipo["ARRAY"] = 4] = "ARRAY";
})(Tipo = exports.Tipo || (exports.Tipo = {}));
//Tipos de operaciones
var TipoAritmetico;
(function (TipoAritmetico) {
    TipoAritmetico[TipoAritmetico["MAS"] = 0] = "MAS";
    TipoAritmetico[TipoAritmetico["MENOS"] = 1] = "MENOS";
    TipoAritmetico[TipoAritmetico["MULT"] = 2] = "MULT";
    TipoAritmetico[TipoAritmetico["DIV"] = 3] = "DIV";
})(TipoAritmetico = exports.TipoAritmetico || (exports.TipoAritmetico = {}));
