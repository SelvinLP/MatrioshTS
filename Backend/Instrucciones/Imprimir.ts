import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";


export class Imprimir extends Instruccion{

    constructor(private value : Expresion, line : number, column : number){
        super(line, column);
    }

    public ejecutar() {
        const resultado = this.value.ejecutar();
        console.log(resultado);
    }
}