import { Expresion } from "../Abstracto/Expresion";
import { Retorno } from "../Abstracto/Retorno";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";

export class Id extends Expresion{

    constructor(private id: string, line : number, column: number){
        super(line, column);
    }

    public ejecutar(entorno: Entorno): Retorno {

        const resultado = entorno.obtenervar(this.id);
        if(resultado == null){
            throw new N_Error('Semantico','La variable no existe: '+ this.id, this.linea,this.columna);
        }
        if(resultado.valor==null){
            throw new N_Error('Semantico','La variable '+this.id+' no contiene valor ', this.linea,this.columna);
        }
        let retorno=resultado.valor.ejecutar(entorno);
        return retorno;
        
    }
}