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
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    function Literal(value, line, column, type) {
        var _this = _super.call(this, line, column) || this;
        _this.value = value;
        _this.type = type;
        return _this;
    }
    Literal.prototype.ejecutar = function () {
        if (this.type == 0) {
            return { valor: Number(this.value), tipo: Retorno_1.Tipo.NUMBER };
        }
        else if (this.type == 1) {
            return { valor: this.value, tipo: Retorno_1.Tipo.STRING };
        }
        else if (this.type == 2) {
            if (this.value == "true") {
                return { valor: true, tipo: Retorno_1.Tipo.BOOLEAN };
            }
            else {
                return { valor: false, tipo: Retorno_1.Tipo.BOOLEAN };
            }
        }
        else if (this.type == 3) {
            return { valor: null, tipo: Retorno_1.Tipo.NULL };
        }
        else {
            return { valor: this.value, tipo: Retorno_1.Tipo.ARRAY };
        }
    };
    Literal.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        Cadena += (ast.posdes + 1) + " [label =\"" + this.value + "\"];\n";
        Cadena += ast.posdes + " -> " + (ast.posdes + 1) + ";\n";
        return { posant: ast.posdes + 1, posdes: ast.posdes + 2, cadena: Cadena };
    };
    return Literal;
}(Expresion_1.Expresion));
exports.Literal = Literal;
