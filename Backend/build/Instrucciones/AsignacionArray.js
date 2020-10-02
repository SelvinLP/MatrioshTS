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
exports.pushpopcondireccion = exports.Obtenervalorarray = exports.AsignacionArrayExp = exports.AsignacionArray = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Expresion_1 = require("../Abstracto/Expresion");
var N_Error_1 = require("../Errores/N_Error");
var Retorno_1 = require("../Abstracto/Retorno");
var Array_1 = require("./Array");
var AsignacionArray = /** @class */ (function (_super) {
    __extends(AsignacionArray, _super);
    function AsignacionArray(id, tipoinsert, valor, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.tipoinsert = tipoinsert;
        _this.valor = valor;
        return _this;
    }
    AsignacionArray.prototype.ejecutar = function (entorno) {
        var listaresult = entorno.obtenerarray(this.id);
        if (listaresult == null) {
            throw new N_Error_1.N_Error('Semantico', 'El array no existe: ' + this.id, '', this.linea, this.columna);
        }
        else {
            if (typeof this.tipoinsert == "string") {
                if (this.tipoinsert == "push" && typeof this.valor != "string") {
                    if (listaresult.tipo == Retorno_1.Tipo.NULL) {
                        listaresult.tipo = this.valor.ejecutar(entorno).tipo;
                        var inicio = listaresult.listaarray;
                        inicio.push(new Array_1.L_Array({ value: this.valor.ejecutar(entorno).valor, tipo: this.valor.ejecutar(entorno).tipo }, [new Array_1.L_Array(null, null)]));
                    }
                    else {
                        if (this.valor.ejecutar(entorno).tipo == listaresult.tipo) {
                            var inicio = listaresult.listaarray;
                            inicio.push(new Array_1.L_Array({ value: this.valor.ejecutar(entorno).valor, tipo: this.valor.ejecutar(entorno).tipo }, [new Array_1.L_Array(null, null)]));
                        }
                        else {
                            throw new N_Error_1.N_Error('Semantico', 'Tipo no compatible en el array' + this.id, '', this.linea, this.columna);
                        }
                    }
                }
                else if (this.tipoinsert == "pop") {
                    var inicio = listaresult.listaarray;
                    if (inicio.length > 1) {
                        listaresult.listaarray.pop();
                    }
                    else {
                        throw new N_Error_1.N_Error('Semantico', 'El array ya no tiene datos', '', this.linea, this.columna);
                    }
                }
            }
            else { //Es asignacion por posicion o limpiar matriz
                if (typeof this.valor == "string") { //limpiamos la matriz
                    //cambio de posicion
                    var inicio = listaresult.listaarray;
                    for (var pos = 0; pos < this.tipoinsert.length - 1; pos++) {
                        var nodovalor = this.tipoinsert[pos];
                        var posdir = nodovalor.ejecutar(entorno).valor + 1;
                        if (inicio != null) {
                            if (inicio[posdir] != null) {
                                if (inicio[posdir].lista != null) {
                                    inicio = inicio[posdir].lista;
                                }
                                else {
                                    inicio[posdir].lista = [new Array_1.L_Array(null, null)];
                                    inicio = inicio[posdir].lista;
                                }
                            }
                            else {
                                inicio[posdir] = new Array_1.L_Array({ value: null, tipo: null }, [new Array_1.L_Array(null, null)]);
                                inicio = inicio[posdir].lista;
                            }
                        }
                        else {
                            break; //error
                        }
                    }
                    //insertamos
                    if (inicio != null) {
                        var posicion = this.tipoinsert[this.tipoinsert.length - 1].ejecutar(entorno).valor + 1;
                        inicio[posicion] = new Array_1.L_Array({ value: null, tipo: null }, [new Array_1.L_Array(null, null)]);
                    }
                }
                else { //insertamos datos en
                    if (listaresult.tipo == Retorno_1.Tipo.NULL) {
                        listaresult.tipo = this.valor.ejecutar(entorno).tipo;
                    }
                    //cambio de posicion
                    var inicio = listaresult.listaarray;
                    for (var pos = 0; pos < this.tipoinsert.length - 1; pos++) {
                        var nodovalor = this.tipoinsert[pos];
                        var posdir = nodovalor.ejecutar(entorno).valor + 1;
                        if (inicio != null) {
                            if (inicio[posdir] != null) {
                                if (inicio[posdir].lista != null) {
                                    inicio = inicio[posdir].lista;
                                }
                                else {
                                    inicio[posdir].lista = [new Array_1.L_Array(null, null)];
                                    inicio = inicio[posdir].lista;
                                }
                            }
                            else {
                                inicio[posdir] = new Array_1.L_Array({ value: null, tipo: null }, [new Array_1.L_Array(null, null)]);
                                inicio = inicio[posdir].lista;
                            }
                        }
                        else {
                            break; //error
                        }
                    }
                    //insertamos
                    if (inicio != null) {
                        var posicion = this.tipoinsert[this.tipoinsert.length - 1].ejecutar(entorno).valor + 1;
                        if (inicio[posicion] == null) {
                            inicio[posicion] = new Array_1.L_Array({ value: this.valor.ejecutar(entorno).valor, tipo: this.valor.ejecutar(entorno).tipo }, [new Array_1.L_Array(null, null)]);
                        }
                        else {
                            inicio[posicion].valor = { value: this.valor.ejecutar(entorno).valor, tipo: this.valor.ejecutar(entorno).tipo };
                            if (inicio[posicion].lista == null) {
                                inicio[posicion].lista = [new Array_1.L_Array(null, null)];
                            }
                        }
                    }
                }
            }
        }
    };
    AsignacionArray.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Asignacion: " + this.id + "\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var resultado;
        resultado = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        if (this.valor != null) {
            if (typeof this.valor != "string") {
                resultado = this.valor.ejecutarast(resultado);
            }
        }
        return resultado;
    };
    return AsignacionArray;
}(Instruccion_1.Instruccion));
exports.AsignacionArray = AsignacionArray;
var AsignacionArrayExp = /** @class */ (function (_super) {
    __extends(AsignacionArrayExp, _super);
    function AsignacionArrayExp(id, tipoinsert, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.tipoinsert = tipoinsert;
        return _this;
    }
    AsignacionArrayExp.prototype.ejecutar = function (entorno) {
        var _a;
        var listaresult = entorno.obtenerarray(this.id);
        if (listaresult == null) {
            throw new N_Error_1.N_Error('Semantico', 'El array no existe: ' + this.id, '', this.linea, this.columna);
        }
        else { //obtener tamaño
            if (this.tipoinsert == null) {
                var inicio = listaresult.listaarray;
                return { valor: inicio.length - 1, tipo: Retorno_1.Tipo.NUMBER };
            }
            else {
                var inicio = listaresult.listaarray;
                for (var pos = 0; pos < this.tipoinsert.length - 1; pos++) {
                    var nodovalor = this.tipoinsert[pos];
                    var posdir = nodovalor.ejecutar(entorno).valor + 1;
                    if (inicio != null) {
                        if (inicio[posdir] != null) {
                            if (inicio[posdir].lista != null) {
                                inicio = inicio[posdir].lista;
                            }
                            else {
                                inicio[posdir].lista = [new Array_1.L_Array(null, null)];
                                inicio = inicio[posdir].lista;
                            }
                        }
                        else {
                            inicio[posdir] = new Array_1.L_Array({ value: null, tipo: null }, [new Array_1.L_Array(null, null)]);
                            inicio = inicio[posdir].lista;
                        }
                    }
                    else {
                        break; //error
                    }
                }
                //obtenemos length
                if (inicio == null) {
                    throw new N_Error_1.N_Error('Semantico', 'Dimension no definida en el aray: ' + this.id, '', this.linea, this.columna);
                }
                else {
                    var posicion = this.tipoinsert[this.tipoinsert.length - 1].ejecutar(entorno).valor + 1;
                    if (inicio[posicion] == null) {
                        throw new N_Error_1.N_Error('Semantico', 'Dimension no definida en el aray: ' + this.id, '', this.linea, this.columna);
                    }
                    else {
                        if (inicio[posicion].lista != null) {
                            var valor = (_a = inicio[posicion].lista) === null || _a === void 0 ? void 0 : _a.length;
                            if (typeof valor == "number") {
                                return { valor: valor - 1, tipo: Retorno_1.Tipo.NUMBER };
                            }
                            else {
                                throw new N_Error_1.N_Error('Semantico', 'Dimension no definida en el aray: ' + this.id, '', this.linea, this.columna);
                            }
                        }
                        else {
                            throw new N_Error_1.N_Error('Semantico', 'Dimension no definida en el aray: ' + this.id, '', this.linea, this.columna);
                        }
                    }
                }
            }
        }
    };
    AsignacionArrayExp.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"" + this.id + ".length\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        return { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
    };
    return AsignacionArrayExp;
}(Expresion_1.Expresion));
exports.AsignacionArrayExp = AsignacionArrayExp;
var Obtenervalorarray = /** @class */ (function (_super) {
    __extends(Obtenervalorarray, _super);
    function Obtenervalorarray(id, tipoinsert, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.tipoinsert = tipoinsert;
        return _this;
    }
    Obtenervalorarray.prototype.ejecutar = function (entorno) {
        var listaresult = entorno.obtenerarray(this.id);
        if (listaresult == null) {
            throw new N_Error_1.N_Error('Semantico', 'El array no existe: ' + this.id, '', this.linea, this.columna);
        }
        else { //obtener tamaño
            var inicio = listaresult.listaarray;
            for (var pos = 0; pos < this.tipoinsert.length - 1; pos++) {
                var nodovalor = this.tipoinsert[pos];
                var posdir = nodovalor.ejecutar(entorno).valor + 1;
                if (inicio != null) {
                    if (inicio[posdir] != null) {
                        if (inicio[posdir].lista != null) {
                            inicio = inicio[posdir].lista;
                        }
                        else {
                            inicio[posdir].lista = [new Array_1.L_Array(null, null)];
                            inicio = inicio[posdir].lista;
                        }
                    }
                    else {
                        inicio[posdir] = new Array_1.L_Array({ value: null, tipo: null }, [new Array_1.L_Array(null, null)]);
                        inicio = inicio[posdir].lista;
                    }
                }
                else {
                    break; //error
                }
            }
            //obtenemos length
            if (inicio == null) {
                throw new N_Error_1.N_Error('Semantico', 'Dimension no definida en el aray: ' + this.id, '', this.linea, this.columna);
            }
            else {
                var posicion = this.tipoinsert[this.tipoinsert.length - 1].ejecutar(entorno).valor + 1;
                if (inicio[posicion] == null) {
                    throw new N_Error_1.N_Error('Semantico', 'Dimension no definida en el aray: ' + this.id, '', this.linea, this.columna);
                }
                else {
                    if (inicio[posicion].lista != null) {
                        var valor = inicio[posicion].valor;
                        return { valor: valor === null || valor === void 0 ? void 0 : valor.value, tipo: valor === null || valor === void 0 ? void 0 : valor.tipo };
                    }
                    else {
                        throw new N_Error_1.N_Error('Semantico', 'Dimension no definida en el aray: ' + this.id, '', this.linea, this.columna);
                    }
                }
            }
        }
    };
    Obtenervalorarray.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"" + this.id + "[dimensiones]\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var resultado = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        return resultado;
    };
    return Obtenervalorarray;
}(Expresion_1.Expresion));
exports.Obtenervalorarray = Obtenervalorarray;
var pushpopcondireccion = /** @class */ (function (_super) {
    __extends(pushpopcondireccion, _super);
    function pushpopcondireccion(id, tipoinsert, tipoasi, valor, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.tipoinsert = tipoinsert;
        _this.tipoasi = tipoasi;
        _this.valor = valor;
        return _this;
    }
    pushpopcondireccion.prototype.ejecutar = function (entorno) {
        var _a, _b, _c, _d;
        var listaresult = entorno.obtenerarray(this.id);
        if (listaresult == null) {
            throw new N_Error_1.N_Error('Semantico', 'El array no existe: ' + this.id, '', this.linea, this.columna);
        }
        else { //obtener tamaño
            var inicio = listaresult.listaarray;
            for (var pos = 0; pos < this.tipoinsert.length - 1; pos++) {
                var nodovalor = this.tipoinsert[pos];
                var posdir = nodovalor.ejecutar(entorno).valor + 1;
                if (inicio != null) {
                    if (inicio[posdir] != null) {
                        if (inicio[posdir].lista != null) {
                            inicio = inicio[posdir].lista;
                        }
                        else {
                            inicio[posdir].lista = [new Array_1.L_Array(null, null)];
                            inicio = inicio[posdir].lista;
                        }
                    }
                    else {
                        inicio[posdir] = new Array_1.L_Array({ value: null, tipo: null }, [new Array_1.L_Array(null, null)]);
                        inicio = inicio[posdir].lista;
                    }
                }
                else {
                    break; //error
                }
            }
            //obtenemos length
            if (inicio == null) {
                throw new N_Error_1.N_Error('Semantico', 'Dimension no definida en el aray: ' + this.id, '', this.linea, this.columna);
            }
            else {
                var posicion = this.tipoinsert[this.tipoinsert.length - 1].ejecutar(entorno).valor + 1;
                if (inicio[posicion] == null) {
                    inicio[posicion] = new Array_1.L_Array({ value: null, tipo: null }, [new Array_1.L_Array(null, null)]);
                    if (this.tipoasi == "push") {
                        var valorres = this.valor.ejecutar(entorno);
                        var nuevovalor = new Array_1.L_Array({ value: valorres.valor, tipo: valorres.tipo }, [new Array_1.L_Array(null, null)]);
                        (_a = inicio[posicion].lista) === null || _a === void 0 ? void 0 : _a.push(nuevovalor);
                    }
                }
                else {
                    if (inicio[posicion].lista != null) {
                        if (this.tipoasi == "push") {
                            var valorres = this.valor.ejecutar(entorno);
                            var nuevovalor = new Array_1.L_Array({ value: valorres.valor, tipo: valorres.tipo }, [new Array_1.L_Array(null, null)]);
                            (_b = inicio[posicion].lista) === null || _b === void 0 ? void 0 : _b.push(nuevovalor);
                        }
                        else if (this.tipoasi == "pop") {
                            if (((_c = inicio[posicion].lista) === null || _c === void 0 ? void 0 : _c.length) != 1) {
                                (_d = inicio[posicion].lista) === null || _d === void 0 ? void 0 : _d.pop();
                            }
                            else {
                                throw new N_Error_1.N_Error('Semantico', 'El array ya no tiene datos', '', this.linea, this.columna);
                            }
                        }
                    }
                    else {
                        throw new N_Error_1.N_Error('Semantico', 'Dimension no definida en el aray: ' + this.id, '', this.linea, this.columna);
                    }
                }
            }
        }
    };
    pushpopcondireccion.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"" + this.id + "[dimensiones] " + this.tipoasi + "\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var resultado = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        if (this.valor != null) {
            resultado = this.valor.ejecutarast(resultado);
        }
        return resultado;
    };
    return pushpopcondireccion;
}(Instruccion_1.Instruccion));
exports.pushpopcondireccion = pushpopcondireccion;
