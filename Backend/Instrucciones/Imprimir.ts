import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { L_Print } from "../Otros/L_Print";

export class Imprimir extends Instruccion{

    constructor(private value : Expresion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno ) {
        const resultado = this.value.ejecutar(entorno);
        L_Print.push(resultado.valor);
    }
}
