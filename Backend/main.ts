import { L_Errores } from "./Errores/L_Error";
import { Instruccion } from "./Abstracto/Instruccion";

const parser=require("../Gramatica/Gramatica");

var ast=parser.parse("console.log(\"hola\"-2+3);");
console.log("--------------------------------- Instrucciones ---------------------------------");
for(const Instruccion of ast){
    try {
        Instruccion.ejecutar();
    } catch (error) {
        //errores.push(error);  
    }
}

console.log("--------------------------------- Lista de Errores ---------------------------------");
console.log(L_Errores);
