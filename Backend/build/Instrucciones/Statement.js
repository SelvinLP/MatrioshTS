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
exports.Statement = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var L_Error_1 = require("../Errores/L_Error");
var Entorno_1 = require("../Entorno/Entorno");
var Statement = /** @class */ (function (_super) {
    __extends(Statement, _super);
    function Statement(code, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.code = code;
        return _this;
    }
    Statement.prototype.ejecutar = function (entorno) {
        var nuevoentorno = new Entorno_1.Entorno(entorno);
        for (var _i = 0, _a = this.code; _i < _a.length; _i++) {
            var instr = _a[_i];
            try {
                var result = instr.ejecutar(nuevoentorno);
                if (result != undefined || result != null)
                    return result;
            }
            catch (err) {
                L_Error_1.L_Errores.push(err);
            }
        }
    };
    Statement.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Instrucciones\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        //Seccion de items de array
        var result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        for (var _i = 0, _a = this.code; _i < _a.length; _i++) {
            var instr = _a[_i];
            var temresult = instr.ejecutarast(result);
            result.posdes = temresult.posdes;
            result.cadena = temresult.cadena;
        }
        return result;
    };
    return Statement;
}(Instruccion_1.Instruccion));
exports.Statement = Statement;
