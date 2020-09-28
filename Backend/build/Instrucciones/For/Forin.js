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
exports.Forin = void 0;
var Instruccion_1 = require("../../Abstracto/Instruccion");
var Retorno_1 = require("../../Abstracto/Retorno");
var N_Error_1 = require("../../Errores/N_Error");
var N_Tipo_1 = require("../../Otros/N_Tipo");
var Forin = /** @class */ (function (_super) {
    __extends(Forin, _super);
    function Forin(letoconst, id, iddireccion, codigo, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.letoconst = letoconst;
        _this.id = id;
        _this.iddireccion = iddireccion;
        _this.codigo = codigo;
        return _this;
    }
    Forin.prototype.ejecutar = function (entorno) {
        var valorarray = entorno.obtenerarray(this.iddireccion);
        //ejecutamos el for
        if (valorarray != null) {
            if ((valorarray === null || valorarray === void 0 ? void 0 : valorarray.listaarray) != undefined) {
                entorno.guardarvar(Retorno_1.TipoDato.LET, this.id, 0, new N_Tipo_1.N_Tipo(Retorno_1.Tipo.NUMBER, ""), this.linea, this.columna);
                var variable = entorno.obtenervar(this.id);
                for (var pos = variable === null || variable === void 0 ? void 0 : variable.valor; pos < (valorarray === null || valorarray === void 0 ? void 0 : valorarray.listaarray.length) - 1; pos++) {
                    var valor = this.codigo.ejecutar(entorno);
                    //verificacion si viene un break o continue
                    if (valor != null || valor != undefined) {
                        if (valor.tipobyc == "continue") {
                            continue;
                        }
                        else if (valor.tipobyc == "break") {
                            break;
                        }
                    }
                    //incremento en el for
                    if (variable != null) {
                        variable.valor += 1;
                    }
                }
                entorno.eliminarvar(this.id);
            }
            else {
                throw new N_Error_1.N_Error('Semantico', 'El array no existe en el for in', '', this.linea, this.columna);
            }
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'El array no existe en el for in', '', this.linea, this.columna);
        }
    };
    Forin.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"For in\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        result.cadena += result.posdes + " [label =\"Id: " + this.id + "\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        result = { posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena };
        result.cadena += result.posdes + " [label =\"Array: " + this.iddireccion + "\"];\n";
        result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        //Seccion Codigo
        result = this.codigo.ejecutarast({ posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena });
        return result;
    };
    return Forin;
}(Instruccion_1.Instruccion));
exports.Forin = Forin;