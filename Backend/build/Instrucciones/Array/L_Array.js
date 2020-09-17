"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L_Array = void 0;
var L_Array = /** @class */ (function () {
    function L_Array() {
        this.dimensiones = [];
    }
    L_Array.prototype.newdimension = function () {
        var nuevadim = [];
        this.dimensiones.push(nuevadim);
    };
    return L_Array;
}());
exports.L_Array = L_Array;
