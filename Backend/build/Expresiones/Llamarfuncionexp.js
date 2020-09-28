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
exports.Llamarfuncionexp = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var N_Error_1 = require("../Errores/N_Error");
var Entorno_1 = require("../Entorno/Entorno");
var L_Error_1 = require("../Errores/L_Error");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Tipo_1 = require("../Otros/N_Tipo");
var Llamarfuncionexp = /** @class */ (function (_super) {
    __extends(Llamarfuncionexp, _super);
    function Llamarfuncionexp(id, expresiones, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.expresiones = expresiones;
        return _this;
    }
    Llamarfuncionexp.prototype.ejecutar = function (entorno) {
        var funcion = entorno.obtenerfuncion(this.id);
        if (funcion == null) {
            throw new N_Error_1.N_Error('Semantico', 'La funcion ' + this.id + " no existe", '', this.linea, this.columna);
        }
        //si la funcion existe
        var nuevoentorno = new Entorno_1.Entorno(entorno);
        //creamos los parametros y les asignamos su valor
        var variables = funcion.parametros;
        if (variables != null || variables != undefined) {
            var posvalorasignar = 0;
            while (true) {
                //valor a agregar
                var vlar = this.expresiones[posvalorasignar].ejecutar(entorno);
                nuevoentorno.guardarvar(Retorno_1.TipoDato.LET, variables[0].id, vlar.valor, new N_Tipo_1.N_Tipo(vlar.tipo, ""), this.linea, this.columna);
                if (variables[1] == undefined || variables[1] == null) {
                    break;
                }
                variables = variables[1];
                posvalorasignar++;
            }
        }
        //recorremos todas las demas instrucciones
        if (funcion.codigo != null || funcion.codigo != undefined) {
            for (var _i = 0, _a = funcion.codigo; _i < _a.length; _i++) {
                var instr = _a[_i];
                try {
                    var result = instr.ejecutar(nuevoentorno);
                    if (result != undefined || result != null) {
                        if (result.tipobyc == "retornonulo") {
                            return { valor: "", tipo: Retorno_1.Tipo.NULL };
                        }
                        else if (result.tipobyc = "retornovalor") {
                            return { valor: result.valor, tipo: result.tipo };
                        }
                    }
                }
                catch (err) {
                    L_Error_1.L_Errores.push(err);
                }
            }
        }
        if (typeof funcion.tiporetorno == "string") {
            if (funcion.tiporetorno == "number") {
                return { valor: "resultado", tipo: Retorno_1.Tipo.NUMBER };
            }
            else if (funcion.tiporetorno == "string") {
                return { valor: "resultado", tipo: Retorno_1.Tipo.STRING };
            }
            else if (funcion.tiporetorno == "boolean") {
                return { valor: "resultado", tipo: Retorno_1.Tipo.BOOLEAN };
            }
            else {
                return { valor: "resultado", tipo: Retorno_1.Tipo.NULL };
            }
        }
        else {
            return { valor: "resultado", tipo: funcion.tiporetorno };
        }
    };
    Llamarfuncionexp.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Llamar funcion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        return { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
    };
    return Llamarfuncionexp;
}(Expresion_1.Expresion));
exports.Llamarfuncionexp = Llamarfuncionexp;
