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
exports.Funcion = exports.Parametrofunc = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Retorno_1 = require("../Abstracto/Retorno");
var Parametrofunc = /** @class */ (function () {
    function Parametrofunc(id, tipo, line, column) {
        this.id = id;
        this.tipo = tipo;
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
        Cadena += ast.posdes + " [label =\"Funcion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        return { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
    };
    return Funcion;
}(Instruccion_1.Instruccion));
exports.Funcion = Funcion;
