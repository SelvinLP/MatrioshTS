import { Expresion } from "../Abstracto/Expresion";
import { Retorno } from "../Abstracto/Retorno";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";

export class Id extends Expresion{

    constructor(private id: string, line : number, column: number){
        super(line, column);
    }

    public ejecutar(entorno: Entorno): Retorno {
        const value = entorno.getvar(this.id);
        if(value == null){
            throw new N_Error('Semantico','La variable no existe: '+ this.id, this.linea,this.columna);
        }else{
            let resultado=value.valor.ejecutar(entorno);
            return resultado;
            
        }
        
    }
}