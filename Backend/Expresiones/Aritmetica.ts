import { Expresion } from "../Abstracto/Expresion";
import { Retorno, Tipo, TipoAritmetico } from "../Abstracto/Retorno";

export class Aritmetica extends Expresion{

    constructor(private left: Expresion, private right: Expresion, private type : TipoAritmetico, line: number, column: number){
        super(line,column);
    }

    public ejecutar() : Retorno{
        const valorizq = this.left.ejecutar();
        const valorder = this.right.ejecutar();
        let resultado : Retorno;
        const tipoDominante = this.Tipo_dominante(valorizq.tipo, valorder.tipo);
        
        if(this.type == TipoAritmetico.MAS){
            if(tipoDominante == Tipo.STRING)
                resultado = {valor : (valorizq.valor.toString() + valorder.valor.toString()), tipo : Tipo.NUMBER};
            else if(tipoDominante == Tipo.NUMBER)
                resultado = {valor : (valorizq.valor + valorder.valor), tipo : Tipo.NUMBER};
            else
                throw console.log("Error semantico no se puede operar +") //falta poner error         
        }else if(this.type == TipoAritmetico.MENOS){
            if(tipoDominante == Tipo.NUMBER)
                resultado = {valor : (valorizq.valor - valorder.valor), tipo : Tipo.NUMBER};
            else
                throw console.log("Error semantico no se puede operar -") //falta poner error 
        }else if(this.type == TipoAritmetico.MULT){
            if(tipoDominante == Tipo.NUMBER)
                resultado = {valor : (valorizq.valor * valorder.valor), tipo : Tipo.NUMBER};
            else
                throw console.log("Error semantico no se puede operar *") //falta poner error
        }else{
            if(tipoDominante == Tipo.NUMBER && valorder.valor != 0)
                resultado = {valor : (valorizq.valor / valorder.valor), tipo : Tipo.NUMBER};
            else
                throw console.log("Error semantico no se puede operar /") //falta poner error  
        };
        return resultado;
    }
}