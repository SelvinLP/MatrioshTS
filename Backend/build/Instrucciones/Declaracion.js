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
exports.Declaracion = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var N_Tipo_1 = require("../Otros/N_Tipo");
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(letoconst, id, tipo, value, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.letoconst = letoconst;
        _this.id = id;
        _this.tipo = tipo;
        _this.value = value;
        return _this;
    }
    Declaracion.prototype.ejecutar = function (entorno) {
        if (this.value == null) {
            //Validaciones de const
            if (this.letoconst == Retorno_1.TipoDato.CONST) {
                throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " tipo const no tiene definido un valor", '', this.linea, this.columna);
            }
            else {
                entorno.guardarvar(this.letoconst, this.id, this.value, this.tipo, this.linea, this.columna);
            }
        }
        else {
            var banderainsertar = false;
            var resp = this.value.ejecutar(entorno);
            //Definicion de tipo sino tiene
            if (this.tipo == null) {
                this.tipo = new N_Tipo_1.N_Tipo(resp.tipo, "");
                banderainsertar = true;
            }
            else {
                //comprobacion de compatibilidad de datos
                if (this.tipo.tipo == resp.tipo) {
                    banderainsertar = true;
                }
                else {
                    throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " no es de tipo compatible con la expresion", '', this.linea, this.columna);
                }
            }
            //Insertamos si cumple con las condiciones
            if (banderainsertar == true) {
                entorno.guardarvar(this.letoconst, this.id, resp.valor, this.tipo, this.linea, this.columna);
            }
        }
    };
    Declaracion.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Declaracion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        //Id
        if (this.letoconst == Retorno_1.TipoDato.CONST) {
            Cadena += (ast.posdes + 1) + " [label =\"const\"];\n";
            Cadena += ast.posdes + " -> " + (ast.posdes + 1) + ";\n";
        }
        else {
            Cadena += (ast.posdes + 1) + " [label =\"let\"];\n";
            Cadena += ast.posdes + " -> " + (ast.posdes + 1) + ";\n";
        }
        Cadena += (ast.posdes + 2) + " [label =\"" + this.id + "\"];\n";
        Cadena += ast.posdes + " -> " + (ast.posdes + 2) + ";\n";
        if (this.value == null) {
            result = { posant: ast.posdes + 2, posdes: ast.posdes + 3, cadena: Cadena };
        }
        else {
            //=
            Cadena += (ast.posdes + 3) + " [label =\"=\"];\n";
            Cadena += (ast.posdes) + " -> " + (ast.posdes + 3) + ";\n";
            //Expresion
            result = this.value.ejecutarast({ posant: ast.posdes, posdes: ast.posdes + 4, cadena: Cadena });
        }
        return result;
    };
    return Declaracion;
}(Instruccion_1.Instruccion));
exports.Declaracion = Declaracion;
