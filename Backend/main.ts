import { L_Errores } from "./Errores/L_Error";
import { Instruccion } from "./Abstracto/Instruccion";

const parser=require("../Gramatica/Gramatica");

var ast=parser.parse("console.log(\"hola\"+2.2/3)_;  \n $console.log(\"no\"+2>=\"no2\");");
console.log("--------------------------------- Instrucciones ---------------------------------");
for(const Instruccion of ast){
    try {
        Instruccion.ejecutar();
    } catch (err) {
        L_Errores.push(err);  
    }
}

console.log("--------------------------------- Lista de Errores ---------------------------------");
console.log(L_Errores);
