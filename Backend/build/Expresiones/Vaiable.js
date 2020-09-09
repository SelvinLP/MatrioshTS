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
exports.Access = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var Access = /** @class */ (function (_super) {
    __extends(Access, _super);
    function Access(id, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        return _this;
    }
    Access.prototype.ejecutar = function () {
        return { valor: "temporal", tipo: Retorno_1.Tipo.BOOLEAN };
    };
    return Access;
}(Expresion_1.Expresion));
exports.Access = Access;
