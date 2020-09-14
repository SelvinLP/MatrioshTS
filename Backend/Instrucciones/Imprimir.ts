import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { L_Print } from "../Otros/L_Print";
import { N_Ast } from "../Ast/Ast";

export class Imprimir extends Instruccion{

    constructor(private value : Expresion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno ) {
        const resultado = this.value.ejecutar(entorno);
        L_Print.push(resultado.valor);
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Console.log\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";

        return {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
    }
}
