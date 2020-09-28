"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
var Retorno_1 = require("../Abstracto/Retorno");
var Simbolo_1 = require("./Simbolo");
var N_Error_1 = require("../Errores/N_Error");
var L_Types_1 = require("../Otros/L_Types");
var L_Simb_1 = require("../Otros/L_Simb");
var Entorno = /** @class */ (function () {
    function Entorno(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();
        this.types = new L_Types_1.L_type();
        this.array = new Map();
    }
    Entorno.prototype.guardarvar = function (letoconst, id, valor, tipo, line, column) {
        var env = this;
        //verificacion si existe en el mismo entorno
        if (env.variables.has(id)) {
            throw new N_Error_1.N_Error('Semantico', 'La variable ya existe: ' + id, '', line, column);
        }
        else {
            //sino se cumple lo guarda en el entorno actual
            this.variables.set(id, new Simbolo_1.Simbolo(letoconst, id, tipo, valor));
            //lo insertamos en una lista para los reportes
            var tipodevariable = "    ";
            var tipovalor = "";
            if (Retorno_1.TipoDato.LET == letoconst) {
                tipodevariable = "let  ";
            }
            else if (Retorno_1.TipoDato.CONST == letoconst) {
                tipodevariable = "const";
            }
            if (Retorno_1.Tipo.ARRAY == tipo.tipo) {
                tipovalor = "array";
            }
            else if (Retorno_1.Tipo.BOOLEAN == tipo.tipo) {
                tipovalor = "boolean";
            }
            else if (Retorno_1.Tipo.NULL == tipo.tipo) {
                tipovalor = "null";
            }
            if (Retorno_1.Tipo.NUMBER == tipo.tipo) {
                tipovalor = "number";
            }
            else if (Retorno_1.Tipo.STRING == tipo.tipo) {
                tipovalor = "string";
            }
            else if (Retorno_1.Tipo.TYPE == tipo.tipo) {
                tipovalor = "type";
            }
            var bandera = false;
            for (var _i = 0, L_Simbs_1 = L_Simb_1.L_Simbs; _i < L_Simbs_1.length; _i++) {
                var nodo = L_Simbs_1[_i];
                if (nodo.id == id) {
                    bandera = true;
                    break;
                }
            }
            if (!bandera) {
                L_Simb_1.L_Simbs.push(new L_Simb_1.N_Simbolo(tipodevariable, id, tipovalor, valor, ""));
            }
        }
    };
    Entorno.prototype.obtenervar = function (id) {
        var env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    };
    Entorno.prototype.eliminarvar = function (id) {
        var env = this;
        //verificacion si existe en el mismo entorno
        if (env.variables.has(id)) {
            env.variables.delete(id);
        }
    };
    Entorno.prototype.guardarfuncion = function (id, funcion, line, column) {
        var env = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                //Ya existe entonces no insertamos
                throw new N_Error_1.N_Error('Semantico', 'La funcion ya existe: ' + id, '', line, column);
            }
            env = env.anterior;
        }
        this.funciones.set(id, funcion);
        var tipodevariable = "    ";
        var tipovalor = "funcion";
        L_Simb_1.L_Simbs.push(new L_Simb_1.N_Simbolo(tipodevariable, id, tipovalor, "", "global"));
    };
    Entorno.prototype.obtenerfuncion = function (id) {
        var env = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return null;
    };
    Entorno.prototype.guardararray = function (id, cuerpoarray, line, column) {
        var env = this;
        //verificacion si existe en el mismo entorno
        if (env.variables.has(id)) {
            throw new N_Error_1.N_Error('Semantico', 'El array ya existe: ' + id, '', line, column);
        }
        else {
            //sino se cumple lo guarda en el entorno actual
            this.array.set(id, cuerpoarray);
            var tipodevariable = "    ";
            var tipovalor = "array";
            L_Simb_1.L_Simbs.push(new L_Simb_1.N_Simbolo(tipodevariable, id, tipovalor, "", ""));
        }
    };
    Entorno.prototype.obtenerarray = function (id) {
        var env = this;
        while (env != null) {
            if (env.array.has(id)) {
                return env.array.get(id);
            }
            env = env.anterior;
        }
        return null;
    };
    return Entorno;
}());
exports.Entorno = Entorno;
