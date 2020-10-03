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
exports.Llamarfuncion = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var N_Error_1 = require("../Errores/N_Error");
var Entorno_1 = require("../Entorno/Entorno");
var L_Error_1 = require("../Errores/L_Error");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Tipo_1 = require("../Otros/N_Tipo");
var Llamarfuncion = /** @class */ (function (_super) {
    __extends(Llamarfuncion, _super);
    function Llamarfuncion(id, expresiones, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.expresiones = expresiones;
        return _this;
    }
    Llamarfuncion.prototype.ejecutar = function (entorno) {
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
                if (typeof vlar.valor == "object") { //es un array entonces declaron una array
                    entorno.guardarvar(Retorno_1.TipoDato.NADA, variables[0].id, "", new N_Tipo_1.N_Tipo(Retorno_1.Tipo.ARRAY, ""), vlar.valor, this.linea, this.columna);
                }
                else { //no es aray
                    nuevoentorno.guardarvar(Retorno_1.TipoDato.LET, variables[0].id, vlar.valor, new N_Tipo_1.N_Tipo(vlar.tipo, ""), null, this.linea, this.columna);
                }
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
                }
                catch (err) {
                    L_Error_1.L_Errores.push(err);
                }
            }
        }
    };
    Llamarfuncion.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Llamar funcion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        return { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
    };
    return Llamarfuncion;
}(Instruccion_1.Instruccion));
exports.Llamarfuncion = Llamarfuncion;
