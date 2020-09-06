"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N_Error = void 0;
var N_Error = /** @class */ (function () {
    function N_Error(type, description, line, column) {
        this.tipo = type;
        this.descripcion = description;
        this.linea = line;
        this.columna = column;
    }
    return N_Error;
}());
exports.N_Error = N_Error;
