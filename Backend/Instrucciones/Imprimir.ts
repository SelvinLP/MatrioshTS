import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";

export class Imprimir extends Instruccion{

    constructor(private value : Expresion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno ) {
        const resultado = this.value.ejecutar(entorno);
        console.log(resultado);
    }
}