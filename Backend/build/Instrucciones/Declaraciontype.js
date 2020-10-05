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
exports.Declaraciontype = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Declaraciontype = /** @class */ (function (_super) {
    __extends(Declaraciontype, _super);
    function Declaraciontype(letoconst, id, idtype, valores, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.letoconst = letoconst;
        _this.id = id;
        _this.idtype = idtype;
        _this.valores = valores;
        return _this;
    }
    Declaraciontype.prototype.ejecutar = function (entorno) {
    };
    Declaraciontype.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Declaracion type: " + this.id + "\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return Declaraciontype;
}(Instruccion_1.Instruccion));
exports.Declaraciontype = Declaraciontype;
