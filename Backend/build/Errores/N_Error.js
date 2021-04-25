"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var N_Error = /** @class */ (function () {
    function N_Error(type, description, entorn, line, column) {
        this.type = type;
        this.description = description;
        this.entorn = entorn;
        this.line = line;
        this.column = column;
    }
    return N_Error;
}());
exports.N_Error = N_Error;
