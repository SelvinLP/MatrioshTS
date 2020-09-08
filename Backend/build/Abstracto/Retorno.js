"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoLogica = exports.TipoRelacional = exports.TipoAritmetico = exports.Tipo = void 0;
//Tipos de variables
var Tipo;
(function (Tipo) {
    Tipo[Tipo["NUMBER"] = 0] = "NUMBER";
    Tipo[Tipo["STRING"] = 1] = "STRING";
    Tipo[Tipo["BOOLEAN"] = 2] = "BOOLEAN";
    Tipo[Tipo["NULL"] = 3] = "NULL";
    Tipo[Tipo["ARRAY"] = 4] = "ARRAY";
})(Tipo = exports.Tipo || (exports.Tipo = {}));
//Tipos de operaciones Aritmeticas
var TipoAritmetico;
(function (TipoAritmetico) {
    TipoAritmetico[TipoAritmetico["MAS"] = 0] = "MAS";
    TipoAritmetico[TipoAritmetico["MENOS"] = 1] = "MENOS";
    TipoAritmetico[TipoAritmetico["MULT"] = 2] = "MULT";
    TipoAritmetico[TipoAritmetico["DIV"] = 3] = "DIV";
    TipoAritmetico[TipoAritmetico["POT"] = 4] = "POT";
    TipoAritmetico[TipoAritmetico["MOD"] = 5] = "MOD";
    TipoAritmetico[TipoAritmetico["INC"] = 6] = "INC";
    TipoAritmetico[TipoAritmetico["DEC"] = 7] = "DEC";
})(TipoAritmetico = exports.TipoAritmetico || (exports.TipoAritmetico = {}));
//Tipos de operaciones logicas
var TipoRelacional;
(function (TipoRelacional) {
    TipoRelacional[TipoRelacional["MAYORQUE"] = 0] = "MAYORQUE";
    TipoRelacional[TipoRelacional["MENORQUE"] = 1] = "MENORQUE";
    TipoRelacional[TipoRelacional["MAYORIGUAL"] = 2] = "MAYORIGUAL";
    TipoRelacional[TipoRelacional["MENORIGUAL"] = 3] = "MENORIGUAL";
    TipoRelacional[TipoRelacional["IGUAL"] = 4] = "IGUAL";
    TipoRelacional[TipoRelacional["DIFERENCIA"] = 5] = "DIFERENCIA";
})(TipoRelacional = exports.TipoRelacional || (exports.TipoRelacional = {}));
//Tipos de operaciones logicas
var TipoLogica;
(function (TipoLogica) {
    TipoLogica[TipoLogica["AND"] = 0] = "AND";
    TipoLogica[TipoLogica["OR"] = 1] = "OR";
    TipoLogica[TipoLogica["NOT"] = 2] = "NOT";
})(TipoLogica = exports.TipoLogica || (exports.TipoLogica = {}));
