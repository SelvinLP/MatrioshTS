"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Instruccion_1 = require("../Abstracto/Instruccion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var N_Tipo_1 = require("../Otros/N_Tipo");
var Array_1 = require("./Array");
var N_Declaracion = /** @class */ (function () {
    function N_Declaracion(value, array, types) {
        this.value = value;
        this.array = array;
        this.types = types;
    }
    return N_Declaracion;
}());
exports.N_Declaracion = N_Declaracion;
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(letoconst, id, tipo, tarray, value, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.letoconst = letoconst;
        _this.id = id;
        _this.tipo = tipo;
        _this.tarray = tarray;
        _this.value = value;
        return _this;
    }
    Declaracion.prototype.ejecutar = function (entorno) {
        //comprobacion si es array
        if (this.tarray != null) {
            if (this.tipo == null) {
                this.tipo = new N_Tipo_1.N_Tipo(Retorno_1.Tipo.NULL, "");
            }
            entorno.guardarvar(Retorno_1.TipoDato.NADA, this.id, "", new N_Tipo_1.N_Tipo(Retorno_1.Tipo.ARRAY, ""), new Array_1.C_Array(this.tipo.tipo, this.tarray), null, this.linea, this.columna);
            if (this.value != null) { //verificacion del array
                this.insertararray(entorno);
            }
        }
        else {
            //validacion si es de otro tipo de array
            var banderaarray = false;
            if (this.tipo != null) {
                if (this.tipo.tipo == Retorno_1.Tipo.ARRAY) {
                    if (this.tipo.cadTipo == "number") {
                        this.tipo.tipo = Retorno_1.Tipo.NUMBER;
                    }
                    else if (this.tipo.cadTipo == "string") {
                        this.tipo.tipo = Retorno_1.Tipo.STRING;
                    }
                    else if (this.tipo.cadTipo == "boolean") {
                        this.tipo.tipo = Retorno_1.Tipo.BOOLEAN;
                    }
                    else if (this.tipo.cadTipo == "void") {
                        this.tipo.tipo = Retorno_1.Tipo.NULL;
                    }
                    entorno.guardarvar(Retorno_1.TipoDato.NADA, this.id, "", new N_Tipo_1.N_Tipo(Retorno_1.Tipo.ARRAY, ""), new Array_1.C_Array(this.tipo.tipo, [new Array_1.L_Array(null, null)]), null, this.linea, this.columna);
                    banderaarray = true;
                    if (this.value != null) { //verificacion del array para insertar
                        this.insertararray(entorno);
                    }
                }
                else if (this.tipo.tipo == Retorno_1.Tipo.TYPE) {
                    entorno.guardarvar(this.letoconst, this.id, "", this.tipo, null, this.value.types, this.linea, this.columna);
                }
            }
            if (!banderaarray) {
                if (this.value == null) {
                    //Validaciones de const
                    if (this.letoconst == Retorno_1.TipoDato.CONST) {
                        throw new N_Error_1.N_Error('Semantico', 'La variable ' + this.id + " tipo const no tiene definido un valor", '', this.linea, this.columna);
                    }
                    else {
                        entorno.guardarvar(this.letoconst, this.id, this.value, this.tipo, null, null, this.linea, this.columna);
                    }
                }
                else {
                    var banderainsertar = false;
                    var resp = this.value.value.ejecutar(entorno);
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
                        entorno.guardarvar(this.letoconst, this.id, resp.valor, this.tipo, null, null, this.linea, this.columna);
                    }
                }
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
        result = { posant: ast.posdes + 2, posdes: ast.posdes + 3, cadena: Cadena };
        //si es array
        if (this.tarray != null) {
            result.cadena += (result.posdes) + " [label =\"[]\"];\n";
            result.cadena += ast.posdes + " -> " + (result.posdes) + ";\n";
            result = { posant: result.posdes, posdes: result.posdes + 1, cadena: result.cadena };
        }
        if (this.value != null) {
            if (this.value.value != null) {
                //=
                result.cadena += (result.posdes) + " [label =\"=\"];\n";
                result.cadena += ast.posdes + " -> " + (result.posdes) + ";\n";
                //Expresion
                result = this.value.value.ejecutarast({ posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena });
            }
        }
        return result;
    };
    Declaracion.prototype.insertararray = function (entorno) {
        var listaresult = entorno.obtenerarray(this.id);
        if (listaresult == null) {
            throw new N_Error_1.N_Error('Semantico', 'El array no existe: ' + this.id, '', this.linea, this.columna);
        }
        else {
            //limpiamos y asignamos por error en ciclo
            listaresult.listaarray = [new Array_1.L_Array(null, null)];
            if (listaresult.tipo == Retorno_1.Tipo.NULL) {
                if (this.value.array == null) {
                    //comprobacion si es [] para limpiar los array
                }
                else { //sino inserta los valores del array de entrada
                    for (var _i = 0, _a = this.value.array; _i < _a.length; _i++) {
                        var nodovalor = _a[_i];
                        listaresult.tipo = nodovalor.ejecutar(entorno).tipo;
                        var inicio = listaresult.listaarray;
                        inicio.push(new Array_1.L_Array({ value: nodovalor.ejecutar(entorno).valor, tipo: nodovalor.ejecutar(entorno).tipo }, [new Array_1.L_Array(null, null)]));
                    }
                }
            }
            else {
                if (this.value.array == null) {
                    //comprobacion si es [] para limpiar los array
                }
                else {
                    for (var _b = 0, _c = this.value.array; _b < _c.length; _b++) {
                        var nodovalor = _c[_b];
                        if (nodovalor.ejecutar(entorno).tipo == listaresult.tipo) {
                            var inicio = listaresult.listaarray;
                            inicio.push(new Array_1.L_Array({ value: nodovalor.ejecutar(entorno).valor, tipo: nodovalor.ejecutar(entorno).tipo }, [new Array_1.L_Array(null, null)]));
                        }
                        else {
                            throw new N_Error_1.N_Error('Semantico', 'Tipo no compatible en el array: ' + this.id, '', this.linea, this.columna);
                        }
                    }
                }
            }
        }
    };
    return Declaracion;
}(Instruccion_1.Instruccion));
exports.Declaracion = Declaracion;
