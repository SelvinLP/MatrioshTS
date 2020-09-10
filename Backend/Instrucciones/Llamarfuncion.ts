import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
export class Llamarfuncion extends Instruccion{

    constructor(private id: string, private expresiones : Array<Expresion>, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno : Entorno) {
        const funcion = entorno.obtenerfuncion(this.id);
        if(funcion == null){
            throw new N_Error('Semantico','La funcion '+this.id+" no existe", this.linea, this.columna);
        }
        funcion.codigo.ejecutar(entorno);
    }
}