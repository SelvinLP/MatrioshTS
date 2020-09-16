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
exports.Type = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var N_Error_1 = require("../Errores/N_Error");
var Type = /** @class */ (function (_super) {
    __extends(Type, _super);
    function Type(id, listaparametos, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.listaparametos = listaparametos;
        return _this;
    }
    Type.prototype.ejecutar = function (entorno) {
        if (entorno.anterior != null) {
            throw new N_Error_1.N_Error('Semantico', 'Los types solo se pueden definir global', '', this.linea, this.columna);
        }
        else {
            entorno.types.guardartype(this.id, this.listaparametos, this.linea, this.columna);
        }
    };
    Type.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Type\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        //Expresion
        result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return Type;
}(Instruccion_1.Instruccion));
exports.Type = Type;
