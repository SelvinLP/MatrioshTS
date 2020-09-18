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
exports.AsignacionArrayExp = exports.AsignacionArray = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Expresion_1 = require("../Abstracto/Expresion");
var N_Error_1 = require("../Errores/N_Error");
var Retorno_1 = require("../Abstracto/Retorno");
var AsignacionArray = /** @class */ (function (_super) {
    __extends(AsignacionArray, _super);
    function AsignacionArray(id, tipoinsert, valor, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.tipoinsert = tipoinsert;
        _this.valor = valor;
        return _this;
    }
    AsignacionArray.prototype.ejecutar = function (entorno) {
        var listaresult = entorno.obtenerarray(this.id);
        if (listaresult == null) {
            throw new N_Error_1.N_Error('Semantico', 'El array no existe: ' + this.id, '', this.linea, this.columna);
        }
        else {
            if (this.tipoinsert == "push") {
                if (listaresult.tipo == Retorno_1.Tipo.NULL) {
                    listaresult.tipo = this.valor.ejecutar(entorno).tipo;
                    var inicio = listaresult.listaarray[0];
                    inicio.N_listaarray.push(this.valor);
                }
                else {
                    if (this.valor.ejecutar(entorno).tipo == listaresult.tipo) {
                        var inicio = listaresult.listaarray[0];
                        inicio.N_listaarray.push(this.valor);
                    }
                    else {
                        throw new N_Error_1.N_Error('Semantico', 'Tipo no compatible en el array' + this.id, '', this.linea, this.columna);
                    }
                }
            }
            else if (this.tipoinsert == "pop") {
                var inicio = listaresult.listaarray[0];
                if (inicio.N_listaarray.length > 0) {
                    listaresult.listaarray[0].N_listaarray.pop();
                }
                else {
                    throw new N_Error_1.N_Error('Semantico', 'El array ya no tiene datos', '', this.linea, this.columna);
                }
            }
            console.log(listaresult.listaarray);
        }
    };
    AsignacionArray.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"" + this.id + "\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var resultado;
        resultado = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return resultado;
    };
    return AsignacionArray;
}(Instruccion_1.Instruccion));
exports.AsignacionArray = AsignacionArray;
var AsignacionArrayExp = /** @class */ (function (_super) {
    __extends(AsignacionArrayExp, _super);
    function AsignacionArrayExp(id, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        return _this;
    }
    AsignacionArrayExp.prototype.ejecutar = function (entorno) {
        var listaresult = entorno.obtenerarray(this.id);
        if (listaresult == null) {
            throw new N_Error_1.N_Error('Semantico', 'El array no existe: ' + this.id, '', this.linea, this.columna);
        }
        else { //obtener tamaño
            var inicio = listaresult.listaarray[0];
            return { valor: inicio.N_listaarray.length, tipo: Retorno_1.Tipo.NUMBER };
        }
    };
    AsignacionArrayExp.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"" + this.id + ".length\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        return { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
    };
    return AsignacionArrayExp;
}(Expresion_1.Expresion));
exports.AsignacionArrayExp = AsignacionArrayExp;
