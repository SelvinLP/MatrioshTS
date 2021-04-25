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
var BreakContinue = /** @class */ (function (_super) {
    __extends(BreakContinue, _super);
    function BreakContinue(id, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        return _this;
    }
    BreakContinue.prototype.ejecutar = function (entorno) {
        var retorn = null;
        if (this.id == "break") { //break
            retorn = { tipobyc: "break", linea: this.linea, columna: this.columna };
        }
        else { //continue
            retorn = { tipobyc: "continue", linea: this.linea, columna: this.columna };
        }
        return retorn;
    };
    BreakContinue.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"" + this.id + "\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return BreakContinue;
}(Instruccion_1.Instruccion));
exports.BreakContinue = BreakContinue;
