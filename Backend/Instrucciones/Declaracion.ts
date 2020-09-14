import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Tipo,TipoDato } from "../Abstracto/Retorno";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";
import { N_Ast } from "../Ast/Ast";

export class Declaracion extends Instruccion{

    constructor(private letoconst:TipoDato , private id: string, private tipo:Tipo, private value : Expresion, 
        line : number, column: number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno){
        if(this.value == null){
            //Validaciones de const
            if(this.letoconst == TipoDato.CONST){
                throw new N_Error('Semantico','La variable '+this.id+" tipo const no tiene definido un valor",'', this.linea, this.columna);
            }else{
                entorno.guardarvar(this.letoconst, this.id, this.value, this.tipo ,this.linea,this.columna);
            }
        }else{
            let banderainsertar=false;
            let resp=this.value.ejecutar(entorno);
            //Definicion de tipo sino tiene
            if(this.tipo == Tipo.NULL || this.tipo == null){
                this.tipo=resp.tipo;
                banderainsertar=true;
            }else{
                //comprobacion de compatibilidad de datos
                if(this.tipo == resp.tipo){
                        banderainsertar=true;
                }else{
                    throw new N_Error('Semantico','La variable '+this.id+" no es de tipo compatible con la expresion",'', this.linea, this.columna);
                }
            }
            //Insertamos si cumple con las condiciones
            if(banderainsertar == true){
                entorno.guardarvar(this.letoconst, this.id, resp.valor, resp.tipo ,this.linea,this.columna);
            }
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Declaracion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Id
        if(this.letoconst == TipoDato.CONST){
            Cadena += (ast.posdes+1)+" [label =\"const\"];\n";
            Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";
        }else{
            Cadena += (ast.posdes+1)+" [label =\"let\"];\n";
            Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";
        }
        Cadena += (ast.posdes+2)+" [label =\""+this.id+"\"];\n";
        Cadena += ast.posdes+" -> "+(ast.posdes+2)+";\n";
        if(this.value==null){
            result={posant:ast.posdes+2, posdes:ast.posdes+3,cadena:Cadena};
        }else{
            //=
            Cadena += (ast.posdes+3)+" [label =\"=\"];\n";
            Cadena += (ast.posdes)+" -> "+(ast.posdes+3)+";\n";
            //Expresion
            result=this.value.ejecutarast({posant:ast.posdes, posdes:ast.posdes+4,cadena:Cadena});
        }
        
        return result;
    }
}