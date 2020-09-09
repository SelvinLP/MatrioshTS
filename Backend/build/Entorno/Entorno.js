"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
var Simbolo_1 = require("./Simbolo");
var Entorno = /** @class */ (function () {
    function Entorno(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
    }
    Entorno.prototype.guardarvar = function (id, valor, tipo) {
        var env = this;
        var bandera = true;
        while (env != null) {
            if (env.variables.has(id)) {
                env.variables.set(id, new Simbolo_1.Simbolo(id, valor, tipo));
                bandera = false;
                break;
            }
            env = env.anterior;
        }
        //sino se cumple lo guarda en el entorno actual
        if (bandera == true) {
            this.variables.set(id, new Simbolo_1.Simbolo(id, valor, tipo));
        }
    };
    Entorno.prototype.getvar = function (id) {
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
