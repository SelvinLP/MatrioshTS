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
exports.Imprimir = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Imprimir = /** @class */ (function (_super) {
    __extends(Imprimir, _super);
    function Imprimir(value, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.value = value;
        return _this;
    }
    Imprimir.prototype.ejecutar = function () {
        var resultado = this.value.ejecutar();
        console.log(resultado);
    };
    return Imprimir;
}(Instruccion_1.Instruccion));
exports.Imprimir = Imprimir;
