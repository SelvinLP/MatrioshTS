import { Expresion } from "../Abstracto/Expresion";
import { Retorno, Tipo, TipoAritmetico } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";


export class Aritmetica extends Expresion{

    constructor(private left: Expresion, private right: Expresion, private type : TipoAritmetico, line: number, column: number){
        super(line,column);
    }

    public ejecutar() : Retorno{
        const valorizq = this.left.ejecutar();
        const valorder = this.right.ejecutar();
        const tipoDominante = this.Tipo_dominante(valorizq.tipo, valorder.tipo);
        
        if(this.type == TipoAritmetico.MAS){
            console.log(tipoDominante);
            if(tipoDominante == Tipo.STRING)
                return {valor : (valorizq.valor.toString() + valorder.valor.toString()), tipo : Tipo.STRING};
            else if(tipoDominante == Tipo.NUMBER)
                return {valor : (valorizq.valor + valorder.valor), tipo : Tipo.NUMBER};
            else
                throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" + "+valorder.valor, this.linea,this.columna);  

        }else if(this.type == TipoAritmetico.MENOS){
            if(tipoDominante == Tipo.NUMBER)
                return {valor : (valorizq.valor - valorder.valor), tipo : Tipo.NUMBER};
            else
                throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" - "+valorder.valor, this.linea,this.columna);

        }else if(this.type == TipoAritmetico.MULT){
            if(tipoDominante == Tipo.NUMBER)
                return {valor : (valorizq.valor * valorder.valor), tipo : Tipo.NUMBER};
            else
                throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" * "+valorder.valor, this.linea,this.columna);

        }else if(this.type == TipoAritmetico.DIV){
            if(tipoDominante == Tipo.NUMBER)
                if(valorder.valor != 0)
                    return {valor : (valorizq.valor / valorder.valor), tipo : Tipo.NUMBER};
                else
                    throw new N_Error('Semantico','No se puede dividir entre 0', this.linea,this.columna);
            else
                throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" / "+valorder.valor, this.linea,this.columna);

        }else if(this.type == TipoAritmetico.POT){
            if(tipoDominante == Tipo.NUMBER)
                return {valor : (valorizq.valor ** valorder.valor), tipo : Tipo.NUMBER};
            else
                throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" ** "+valorder.valor, this.linea,this.columna);

        }else{
            if(tipoDominante == Tipo.NUMBER)
                if(valorder.valor != 0)
                    return {valor : (valorizq.valor % valorder.valor), tipo : Tipo.NUMBER};
                else
                    throw new N_Error('Semantico','No se puede sacar modulo entre 0', this.linea,this.columna);
            else
                throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" % "+valorder.valor, this.linea,this.columna);
        }
        
    }
}