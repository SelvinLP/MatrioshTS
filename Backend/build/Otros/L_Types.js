"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var N_Error_1 = require("../Errores/N_Error");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Type = /** @class */ (function () {
    function N_Type(idpara, tipo) {
        this.idpara = idpara;
        this.tipo = tipo;
    }
    return N_Type;
}());
exports.N_Type = N_Type;
var L_type = /** @class */ (function () {
    function L_type() {
        this.lista_types = new Map();
    }
    L_type.prototype.guardartype = function (id, ltype, line, column) {
        //verificacion si existe 
        if (this.lista_types.has(id)) {
            throw new N_Error_1.N_Error('Semantico', 'El type ya existe: ' + id, '', line, column);
        }
        else {
            //sino se cumple lo guarda
            var cont = 0;
            //Verificacion de repetidos
            for (var _i = 0, ltype_1 = ltype; _i < ltype_1.length; _i++) {
                var tem = ltype_1[_i];
                for (var _a = 0, ltype_2 = ltype; _a < ltype_2.length; _a++) {
                    var tem2 = ltype_2[_a];
                    if (tem.idpara == tem2.idpara) {
                        cont++;
                    }
                }
                if (cont >= 2) {
                    throw new N_Error_1.N_Error('Semantico', 'El parametro ' + tem.idpara + ' en el type ya existe', '', line, column);
                }
                else if (tem.tipo == null || tem.tipo.tipo == Retorno_1.Tipo.TYPE && !(this.lista_types.has(tem.tipo.cadTipo) || tem.tipo.cadTipo == id)) {
                    throw new N_Error_1.N_Error('Semantico', 'El el tipo del parametro ' + tem.idpara + ' no existe ', '', line, column);
                }
                cont = 0;
            }
            this.lista_types.set(id, ltype);
        }
    };
    return L_type;
}());
exports.L_type = L_type;
