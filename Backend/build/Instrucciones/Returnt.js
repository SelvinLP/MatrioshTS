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
exports.Returnt = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Returnt = /** @class */ (function (_super) {
    __extends(Returnt, _super);
    function Returnt(valoraretorn, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.valoraretorn = valoraretorn;
        return _this;
    }
    Returnt.prototype.ejecutar = function (entorno) {
        var retorn = null;
        if (this.valoraretorn != null) {
            console.log("debe retornar expresion");
        }
        else {
            console.log("retorna un null");
        }
        /*
        if(this.id=="break"){//break
            retorn={tipobyc:"break", linea:this.linea, columna:this.columna};
        }else{//continue
            retorn={tipobyc:"continue", linea:this.linea, columna:this.columna};
        }*/
        return retorn;
    };
    Returnt.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\" Return \"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return Returnt;
}(Instruccion_1.Instruccion));
exports.Returnt = Returnt;
