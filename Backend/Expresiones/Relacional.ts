import { Expresion } from "../Abstracto/Expresion";
import { Retorno, Tipo, TipoRelacional } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export class Relacional extends Expresion{

    constructor(private left: Expresion, private right: Expresion, private type : TipoRelacional, line: number, column: number){
        super(line,column);
    }

    public ejecutar(entorno : Entorno) : Retorno{
        const valorizq = this.left.ejecutar(entorno);
        const valorder = this.right.ejecutar(entorno);

        if(this.type == TipoRelacional.MAYORQUE){
            const resultado = valorizq.valor > valorder.valor;
            return {valor : resultado, tipo : Tipo.BOOLEAN};
        }
        else if(this.type == TipoRelacional.MENORQUE){
            const resultado = valorizq.valor < valorder.valor;
            return {valor : resultado, tipo : Tipo.BOOLEAN};
        }
        else if(this.type == TipoRelacional.MAYORIGUAL){
            const resultado = valorizq.valor >= valorder.valor;
            return {valor : resultado, tipo : Tipo.BOOLEAN};
        }
        else if(this.type == TipoRelacional.MENORIGUAL){
            const resultado = valorizq.valor <= valorder.valor;
            return {valor : resultado, tipo : Tipo.BOOLEAN};
        }
        else if(this.type == TipoRelacional.IGUAL){
            const resultado = valorizq.valor == valorder.valor;
            return {valor : resultado, tipo : Tipo.BOOLEAN};
        }
        else if(this.type == TipoRelacional.DIFERENCIA){
            const resultado = valorizq.valor != valorder.valor;
            return {valor : resultado, tipo : Tipo.BOOLEAN};
        }
        else{
            throw new N_Error('Semantico','No se reconoce el operador relacional','', this.linea,this.columna);
        }
        
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Expresion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        result=this.left.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
        if(this.type == TipoRelacional.DIFERENCIA){
            result.cadena += result.posdes+" [label =\"DIFERENTE\"];\n";
            result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        }else if(this.type == TipoRelacional.IGUAL){
            result.cadena += result.posdes+" [label =\"IGUAL\"];\n";
            result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        }else if(this.type == TipoRelacional.MAYORIGUAL){
            result.cadena += result.posdes+" [label =\"MAYOR IGUAL\"];\n";
            result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        }else if(this.type == TipoRelacional.MAYORQUE){
            result.cadena += result.posdes+" [label =\"MAYOR QUE\"];\n";
            result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        }else if(this.type == TipoRelacional.MENORIGUAL){
            result.cadena += result.posdes+" [label =\"MENOR IGUAL\"];\n";
            result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        }else if(this.type == TipoRelacional.MENORQUE){
            result.cadena += result.posdes+" [label =\"MENOR QUE\"];\n";
            result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        }
        result=this.right.ejecutarast({posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena});

        return result;
    }
}