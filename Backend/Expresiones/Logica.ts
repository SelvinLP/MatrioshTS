import { Expresion } from "../Abstracto/Expresion";
import { Retorno, Tipo, TipoLogica } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export class Logica extends Expresion{
    
    constructor(private left: Expresion, private right: Expresion, private type : TipoLogica, line: number, column: number){
        super(line,column);
    }

    public ejecutar(entorno : Entorno):Retorno{

        if(this.right != null){
            const valorizq = this.left.ejecutar(entorno);
            const valorder = this.right.ejecutar(entorno);
            if(this.type == TipoLogica.AND){
                if(valorizq.tipo != Tipo.BOOLEAN || valorder.tipo != Tipo.BOOLEAN){
                    throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" && "+valorder.valor,'', this.linea,this.columna);
                }else{
                    const resultado = valorizq.valor && valorder.valor;
                    return {valor : resultado, tipo : Tipo.BOOLEAN};
                }
                
            }else{
                if(valorizq.tipo != Tipo.BOOLEAN || valorder.tipo != Tipo.BOOLEAN){
                    throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" || "+valorder.valor,'', this.linea,this.columna);
                }else{
                    const resultado = valorizq.valor || valorder.valor;
                    return {valor : resultado, tipo : Tipo.BOOLEAN};
                }
            }
        }else{
            //Validamos el not
            const valorizq = this.left.ejecutar(entorno);
            if(valorizq.tipo != Tipo.BOOLEAN ){
                throw new N_Error('Semantico','No se puede operar: !'+valorizq.valor,'', this.linea,this.columna);
            }else{
                const resultado = !valorizq.valor;
                return {valor : resultado, tipo : Tipo.BOOLEAN};
            }
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Expresion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        if(this.right != null){
            result=this.left.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
            if(this.type == TipoLogica.AND){
                result.cadena += result.posdes+" [label =\"AND\"];\n";
                result.cadena += ast.posdes+" -> "+result.posdes+";\n";
            }else{//or
                result.cadena += result.posdes+" [label =\"OR\"];\n";
                result.cadena += ast.posdes+" -> "+result.posdes+";\n";
            }
            result=this.right.ejecutarast({posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena});
        }else{
            
            if(this.type == TipoLogica.NOT){
                Cadena += (ast.posdes+1)+" [label =\"!\"];\n";
                Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";
                result=this.left.ejecutarast({posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena});
            }else{
                result={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena}
            }
        }
        
        
        return result;
    }

}