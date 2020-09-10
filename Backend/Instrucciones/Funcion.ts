import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";

export class Funcion extends Instruccion{

    constructor(private id: string, public parametros : Array<string>, public codigo: Instruccion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno : Entorno) {
        entorno.guardarfuncion(this.id, this, this.linea,this.columna);
    }
}