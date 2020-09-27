import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { L_Print } from "../Otros/L_Print";
import { N_Ast } from "../Ast/Ast";
import { L_Simbs } from "../Otros/L_Simb";

export class Graficarts extends Instruccion{

    constructor( line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno ) {
        console.log("pidio tabla de simbolos");
        L_Print.push("-------------- TABLA DE SIMBOLOS --------------------");
        L_Print.push('#\tModo\tId\tTipo\tValor\tEntorno');
        let pos=0;
        for(const nodo of L_Simbs){
            L_Print.push(pos+'\t'+nodo.letoconst+'\t'+nodo.id+'\t'+nodo.tipo+'\t'+nodo.valor+'\t'+nodo.entorno);
            pos+=1;
        }
        L_Print.push("-----------------------------------------------------");
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Graficar TS\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};

        return result;
    }
}
