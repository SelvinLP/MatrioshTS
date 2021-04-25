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
var L_Print_1 = require("../Otros/L_Print");
var L_Simb_1 = require("../Otros/L_Simb");
var Graficarts = /** @class */ (function (_super) {
    __extends(Graficarts, _super);
    function Graficarts(line, column) {
        return _super.call(this, line, column) || this;
    }
    Graficarts.prototype.ejecutar = function (entorno) {
        console.log("pidio tabla de simbolos");
        L_Print_1.L_Print.push("-------------- TABLA DE SIMBOLOS --------------------");
        L_Print_1.L_Print.push('#\tModo\tId\tTipo\tValor\tEntorno');
        var pos = 0;
        for (var _i = 0, L_Simbs_1 = L_Simb_1.L_Simbs; _i < L_Simbs_1.length; _i++) {
            var nodo = L_Simbs_1[_i];
            L_Print_1.L_Print.push(pos + '\t' + nodo.letoconst + '\t' + nodo.id + '\t' + nodo.tipo + '\t' + nodo.valor + '\t' + nodo.entorno);
            pos += 1;
        }
        L_Print_1.L_Print.push("-----------------------------------------------------");
    };
    Graficarts.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Graficar TS\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return Graficarts;
}(Instruccion_1.Instruccion));
exports.Graficarts = Graficarts;
