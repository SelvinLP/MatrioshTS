import { Expresion } from "../Abstracto/Expresion";
import { Retorno, Tipo } from "../Abstracto/Retorno";

export class Literal extends Expresion{
    
    constructor(private value : any, line : number, column: number, private type : number){
        super(line, column);
    }

    public ejecutar() : Retorno{
        if(this.type == 0)
            return {valor : this.value, tipo : Tipo.STRING};
        else if(this.type == 1)
            return {valor : Number(this.value), tipo : Tipo.NUMBER};
        else if(this.type == 2)
            return {valor : this.value, tipo : Tipo.BOOLEAN};
        else if(this.type == 3)
            return {valor : this.value, tipo : Tipo.NULL};
        else
            return {valor : this.value, tipo : Tipo.ARRAY};
        
    }
}