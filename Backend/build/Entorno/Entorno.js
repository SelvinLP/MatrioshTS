"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
var Simbolo_1 = require("./Simbolo");
var N_Error_1 = require("../Errores/N_Error");
var Entorno = /** @class */ (function () {
    function Entorno(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
    }
    Entorno.prototype.guardarvar = function (letoconst, id, valor, tipo, line, column) {
        var env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                //Ya existe entonces no insertamos
                throw new N_Error_1.N_Error('Semantico', 'La variable ya existe: ' + id, line, column);
                break;
            }
            env = env.anterior;
        }
        //sino se cumple lo guarda en el entorno actual
        this.variables.set(id, new Simbolo_1.Simbolo(letoconst, id, tipo, valor));
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
    return Entorno;
}());
exports.Entorno = Entorno;
