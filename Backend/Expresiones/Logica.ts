import { Expresion } from "../Abstracto/Expresion";
import { Retorno, Tipo, TipoLogica } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";

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
                    throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" && "+valorder.valor, this.linea,this.columna);
                }else{
                    const resultado = valorizq.valor && valorder.valor;
                    return {valor : resultado, tipo : Tipo.BOOLEAN};
                }
                
            }else{
                if(valorizq.tipo != Tipo.BOOLEAN || valorder.tipo != Tipo.BOOLEAN){
                    throw new N_Error('Semantico','No se puede operar: '+valorizq.valor+" || "+valorder.valor, this.linea,this.columna);
                }else{
                    const resultado = valorizq.valor || valorder.valor;
                    return {valor : resultado, tipo : Tipo.BOOLEAN};
                }
            }
        }else{
            //Validamos el not
            const valorizq = this.left.ejecutar(entorno);
            if(valorizq.tipo != Tipo.BOOLEAN ){
                throw new N_Error('Semantico','No se puede operar: !'+valorizq.valor, this.linea,this.columna);
            }else{
                const resultado = !valorizq.valor;
                return {valor : resultado, tipo : Tipo.BOOLEAN};
            }
        }
    }
}