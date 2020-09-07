"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var L_Error_1 = require("./Errores/L_Error");
var parser = require("../Gramatica/Gramatica");
var ast = parser.parse("console.log(\"hola\"+2.2/3)_;  \n $console.log(\"no\"+2>=\"no2\");");
console.log("--------------------------------- Instrucciones ---------------------------------");
for (var _i = 0, ast_1 = ast; _i < ast_1.length; _i++) {
    var Instruccion_1 = ast_1[_i];
    try {
        Instruccion_1.ejecutar();
    }
    catch (err) {
        L_Error_1.L_Errores.push(err);
    }
}
console.log("--------------------------------- Lista de Errores ---------------------------------");
console.log(L_Error_1.L_Errores);
