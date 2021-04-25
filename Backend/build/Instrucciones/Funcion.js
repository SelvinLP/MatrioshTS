"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Instruccion_1 = require("../Abstracto/Instruccion");
var Retorno_1 = require("../Abstracto/Retorno");
var Parametrofunc = /** @class */ (function () {
    function Parametrofunc(id, tipo, posibearray, line, column) {
        this.id = id;
        this.tipo = tipo;
        this.posibearray = posibearray;
        if (this.tipo == "number") {
            this.tipo = Retorno_1.Tipo.NUMBER;
        }
        else if (this.tipo == "string") {
            this.tipo = Retorno_1.Tipo.STRING;
        }
        else if (this.tipo == "boolean") {
            this.tipo = Retorno_1.Tipo.BOOLEAN;
        }
        else if (this.tipo == "void") {
            this.tipo = Retorno_1.Tipo.NULL;
        }
    }
    return Parametrofunc;
}());
exports.Parametrofunc = Parametrofunc;
var Funcion = /** @class */ (function (_super) {
    __extends(Funcion, _super);
    function Funcion(id, parametros, tiporetorno, codigo, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.parametros = parametros;
        _this.tiporetorno = tiporetorno;
        _this.codigo = codigo;
        return _this;
    }
    Funcion.prototype.ejecutar = function (entorno) {
        if (typeof this.tiporetorno == "string") {
            if (this.tiporetorno == "number") {
                this.tiporetorno = Retorno_1.Tipo.NUMBER;
            }
            else if (this.tiporetorno == "string") {
                this.tiporetorno = Retorno_1.Tipo.STRING;
            }
            else if (this.tiporetorno == "boolean") {
                this.tiporetorno = Retorno_1.Tipo.BOOLEAN;
            }
            else if (this.tiporetorno == "void") {
                this.tiporetorno = Retorno_1.Tipo.NULL;
            }
        }
        entorno.guardarfuncion(this.id, this, this.linea, this.columna);
    };
    Funcion.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Funcion: " + this.id + "\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var retorno = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        //Instrucciones
        retorno.cadena += retorno.posdes + " [label =\"Instrucciones\"];\n";
        retorno.cadena += retorno.posant + " -> " + retorno.posdes + ";\n";
        //Seccion de items de array
        retorno = { posant: retorno.posdes, posdes: retorno.posdes + 1, cadena: retorno.cadena };
        for (var _i = 0, _a = this.codigo; _i < _a.length; _i++) {
            var instr = _a[_i];
            var temresult = instr.ejecutarast(retorno);
            retorno.posdes = temresult.posdes;
            retorno.cadena = temresult.cadena;
        }
        return retorno;
    };
    return Funcion;
}(Instruccion_1.Instruccion));
exports.Funcion = Funcion;
