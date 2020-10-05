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
exports.AsigType = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var N_Error_1 = require("../Errores/N_Error");
var AsigType = /** @class */ (function (_super) {
    __extends(AsigType, _super);
    function AsigType(id, valores, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.valores = valores;
        return _this;
    }
    AsigType.prototype.ejecutar = function (entorno) {
        //buscamos el id 
        var nodoidtype = entorno.obtenertype(this.id);
        if (nodoidtype == null) {
            throw new N_Error_1.N_Error('Semantico', 'La variable no existe: ' + this.id, '', this.linea, this.columna);
        }
        else {
            console.log(this.valores);
            //buscamos id y le asignamos valor
            if (nodoidtype.cuerpotype != null) {
                for (var _i = 0, _a = nodoidtype.cuerpotype; _i < _a.length; _i++) {
                    var nvalor = _a[_i];
                    //for de valores a asignar
                    for (var _b = 0, _c = this.valores; _b < _c.length; _b++) {
                        var valores2 = _c[_b];
                        if (nvalor.id == valores2.id) {
                            try {
                                nvalor.valor = valores2.valor.ejecutar(entorno);
                            }
                            catch (error) {
                                nvalor.valor = valores2.valor;
                            }
                        }
                    }
                }
            }
        }
    };
    AsigType.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Asignacion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return result;
    };
    return AsigType;
}(Instruccion_1.Instruccion));
exports.AsigType = AsigType;
