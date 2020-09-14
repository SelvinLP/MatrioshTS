import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export class Funcion extends Instruccion{

    constructor(private id: string, public parametros : Array<string>, public codigo: Instruccion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno : Entorno) {
        entorno.guardarfuncion(this.id, this, this.linea,this.columna);
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Funcion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";

        return {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
    }
}