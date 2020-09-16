import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { N_Error } from "../Errores/N_Error";
import { N_Type } from "../Otros/L_Types";


export class Type extends Instruccion{

    constructor(private id:string, private listaparametos:Array<N_Type>,line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno ) {
        if(entorno.anterior != null){
            throw new N_Error('Semantico','Los types solo se pueden definir global','', this.linea,this.columna);
        }else{
            entorno.types.guardartype(this.id,this.listaparametos,this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Type\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Expresion
        result={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return result;
    }
}
