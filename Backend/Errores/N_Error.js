"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N_Error = void 0;
var N_Error = /** @class */ (function () {
    function N_Error(tipo, descripcion, linea, columna) {
        this.Tipo = tipo;
        this.Descripcion = descripcion;
        this.Linea = linea;
        this.Columna = columna;
    }
    return N_Error;
}());
exports.N_Error = N_Error;
