import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export class BreakContinue extends Instruccion{

    constructor(public id:string,line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno : Entorno) {
        let retorn= null;
        if(this.id=="break"){//break
            retorn={tipobyc:"break", linea:this.linea, columna:this.columna};
        }else{//continue
            retorn={tipobyc:"continue", linea:this.linea, columna:this.columna};
        }
        return retorn;
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\""+this.id+"\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        result={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return result;
    }
}