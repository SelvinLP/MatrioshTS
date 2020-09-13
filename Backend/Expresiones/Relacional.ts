import { Expresion } from "../Abstracto/Expresion";
import { Retorno, Tipo, TipoRelacional } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";

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
}