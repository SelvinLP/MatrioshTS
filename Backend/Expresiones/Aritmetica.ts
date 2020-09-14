import { Expresion } from "../Abstracto/Expresion";
import { Retorno, Tipo, TipoAritmetico } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export class Aritmetica extends Expresion{

    constructor(private left: Expresion, private right: Expresion, private type : TipoAritmetico, line: number, column: number){
        super(line,column);
    }

    public ejecutar( entorno : Entorno ) : Retorno{
        
        if(this.type != TipoAritmetico.UMAS && this.type != TipoAritmetico.UMENOS){

            const valorizq = this.left.ejecutar(entorno);
            const valorder = this.right.ejecutar(entorno);
            const tipoDominante = this.Tipo_dominante(valorizq.tipo, valorder.tipo);

            if(this.type == TipoAritmetico.MAS){
                if(tipoDominante == Tipo.STRING)
                    return {valor : (valorizq.valor.toString() + valorder.valor.toString()), tipo : Tipo.STRING};
                else if(tipoDominante == Tipo.NUMBER)
                    return {valor : (valorizq.valor + valorder.valor), tipo : Tipo.NUMBER};
                else
                    throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" + "+valorder.valor,'', this.linea,this.columna);  
    
            }else if(this.type == TipoAritmetico.MENOS){
                if(tipoDominante == Tipo.NUMBER)
                    return {valor : (valorizq.valor - valorder.valor), tipo : Tipo.NUMBER};
                else
                    throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" - "+valorder.valor,'', this.linea,this.columna);
    
            }else if(this.type == TipoAritmetico.MULT){
                if(tipoDominante == Tipo.NUMBER)
                    return {valor : (valorizq.valor * valorder.valor), tipo : Tipo.NUMBER};
                else
                    throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" * "+valorder.valor,'', this.linea,this.columna);
    
            }else if(this.type == TipoAritmetico.DIV){
                if(tipoDominante == Tipo.NUMBER)
                    if(valorder.valor != 0)
                        return {valor : (valorizq.valor / valorder.valor), tipo : Tipo.NUMBER};
                    else
                        throw new N_Error('Semantico','No se puede dividir entre 0','', this.linea,this.columna);
                else
                    throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" / "+valorder.valor,'', this.linea,this.columna);
    
            }else if(this.type == TipoAritmetico.POT){
                if(tipoDominante == Tipo.NUMBER)
                    return {valor : (valorizq.valor ** valorder.valor), tipo : Tipo.NUMBER};
                else
                    throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" ** "+valorder.valor,'', this.linea,this.columna);
    
            }else{
                if(tipoDominante == Tipo.NUMBER)
                    if(valorder.valor != 0)
                        return {valor : (valorizq.valor % valorder.valor), tipo : Tipo.NUMBER};
                    else
                        throw new N_Error('Semantico','No se puede sacar modulo entre 0','', this.linea,this.columna);
                else
                    throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" % "+valorder.valor,'', this.linea,this.columna);
            }
        }else{//evitamos el error de validar el lado derecho con umas y u menos
            const valorizq = this.left.ejecutar(entorno);
            if(this.type == TipoAritmetico.UMENOS){
                if(valorizq.tipo == Tipo.NUMBER)
                    return {valor : (valorizq.valor * -1), tipo : Tipo.NUMBER};
                else
                    throw new N_Error('Semantico','No se puede operar: -'+valorizq.valor,'', this.linea,this.columna);
    
            }else{
                if(valorizq.tipo == Tipo.NUMBER)
                    return {valor : (valorizq.valor), tipo : Tipo.NUMBER};
                else
                    throw new N_Error('Semantico','No se puede operar: +'+valorizq.valor,'', this.linea,this.columna);
            }
        }

    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Expresion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        if(this.type != TipoAritmetico.UMAS && this.type != TipoAritmetico.UMENOS){
            result=this.left.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
            if(this.type == TipoAritmetico.MAS){
                result.cadena += result.posdes+" [label =\"+\"];\n";
                result.cadena += ast.posdes+" -> "+result.posdes+";\n";
            }else if(this.type == TipoAritmetico.MENOS){
                result.cadena += result.posdes+" [label =\"-\"];\n";
                result.cadena += ast.posdes+" -> "+result.posdes+";\n";
            }else if(this.type == TipoAritmetico.MULT){
                result.cadena += result.posdes+" [label =\"*\"];\n";
                result.cadena += ast.posdes+" -> "+result.posdes+";\n";
            }else if(this.type == TipoAritmetico.DIV){
                result.cadena += result.posdes+" [label =\"/\"];\n";
                result.cadena += ast.posdes+" -> "+result.posdes+";\n";
            }else if(this.type == TipoAritmetico.POT){
                result.cadena += result.posdes+" [label =\"**\"];\n";
                result.cadena += ast.posdes+" -> "+result.posdes+";\n";
            }else{
                result.cadena += result.posdes+" [label =\"%\"];\n";
                result.cadena += ast.posdes+" -> "+result.posdes+";\n";
            }
            result=this.right.ejecutarast({posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena});
            
        }else{
            result=this.left.ejecutarast(ast);
            let Cadena:string=result.cadena+"\n";
            if(this.type == TipoAritmetico.UMENOS){
                Cadena += result.posdes+" [label =\"Umenos\"];\n";
                Cadena += ast.posant+" -> "+result.posdes+";\n";
            }else{
                Cadena += result.posdes+" [label =\"Umas\"];\n";
                Cadena += ast.posant+" -> "+result.posdes+";\n";
            }
            result = {posant:result.posdes, posdes:result.posdes+1,cadena:Cadena};
        }
        return result;
    }

}