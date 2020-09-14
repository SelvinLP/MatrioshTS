import { Expresion } from "../Abstracto/Expresion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { N_Ast } from "../Ast/Ast";

export class Literal extends Expresion{
    
    constructor(private value : any, line : number, column: number, private type : number){
        super(line, column);
    }

    public ejecutar() : Retorno{
        if(this.type == 0){
            return {valor : Number(this.value), tipo : Tipo.NUMBER};

        }else if(this.type == 1){
            return {valor : this.value, tipo : Tipo.STRING};

        }else if(this.type == 2){
            if(this.value=="true"){
                return {valor : true, tipo : Tipo.BOOLEAN};
            }else{
                return {valor : false, tipo : Tipo.BOOLEAN};
            }

        }else if(this.type == 3){
            return {valor : null , tipo : Tipo.NULL};

        }else{
            return {valor : this.value, tipo : Tipo.ARRAY};
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Expresion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        Cadena += (ast.posdes+1)+" [label =\""+this.value+"\"];\n";
        Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";

        return {posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena};
    }

}