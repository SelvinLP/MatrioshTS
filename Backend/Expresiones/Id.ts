import { Expresion } from "../Abstracto/Expresion";
import { Retorno } from "../Abstracto/Retorno";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";
import { N_Ast } from "../Ast/Ast";

export class Id extends Expresion{

    constructor(private id: string, line : number, column: number){
        super(line, column);
    }

    public ejecutar(entorno: Entorno): Retorno {

        const resultado = entorno.obtenervar(this.id);
        if(resultado == null){
            throw new N_Error('Semantico','La variable no existe: '+ this.id,'', this.linea,this.columna);
        }
        if(resultado.valor==null){
            throw new N_Error('Semantico','La variable '+this.id+' no contiene valor ','', this.linea,this.columna);
        }
        return {valor : resultado.valor, tipo : resultado.tipo.tipo};
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\""+this.id+"\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";

        return {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
    }

}