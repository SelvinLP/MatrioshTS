import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { Tipo } from "../Abstracto/Retorno";

export class Parametrofunc{
    constructor(public id:string, public tipo:Tipo|string,public posibearray:string,line : number, column : number){
        if(this.tipo == "number"){
            this.tipo=Tipo.NUMBER;
        }else if(this.tipo == "string"){
            this.tipo=Tipo.STRING;
        }else if(this.tipo == "boolean"){
            this.tipo=Tipo.BOOLEAN;
        }else if(this.tipo == "void"){
            this.tipo=Tipo.NULL;
        }
    }
}

export class Funcion extends Instruccion{

    constructor(public id: string, public parametros : Array<Parametrofunc>,public tiporetorno:string|Tipo, public codigo: Array<Instruccion>, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno : Entorno) {
        if(typeof this.tiporetorno == "string"){
            if(this.tiporetorno == "number"){
                this.tiporetorno=Tipo.NUMBER;
            }else if(this.tiporetorno == "string"){
                this.tiporetorno=Tipo.STRING;
            }else if(this.tiporetorno == "boolean"){
                this.tiporetorno=Tipo.BOOLEAN;
            }else if(this.tiporetorno == "void"){
                this.tiporetorno=Tipo.NULL;
            }

        }

        entorno.guardarfuncion(this.id, this, this.linea,this.columna);
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Funcion: "+this.id+"\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let retorno = {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        //Instrucciones
        retorno.cadena += retorno.posdes+" [label =\"Instrucciones\"];\n";
        retorno.cadena += retorno.posant+" -> "+retorno.posdes+";\n";
        //Seccion de items de array
        retorno= {posant:retorno.posdes, posdes:retorno.posdes+1,cadena:retorno.cadena};
        for(const instr of this.codigo){
            let temresult = instr.ejecutarast(retorno);
            retorno.posdes=temresult.posdes;
            retorno.cadena=temresult.cadena;
        }
        return retorno;
    }
}