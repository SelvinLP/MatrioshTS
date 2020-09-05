var L_Errores = require("./Errores/L_Error");

const parser=require("./Gramatica/Gramatica");

var result=parser.parse("$iasd=;");
console.log("Lista de Errores");
console.log(L_Errores.L_Errores);
