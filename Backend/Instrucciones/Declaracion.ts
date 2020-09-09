import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";

export class Declaracion extends Instruccion{

    private id : string;
    private value : Expresion;

    constructor(id: string, value : Expresion, line : number, column: number){
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public ejecutar(entorno:Entorno){
        const val = this.value.ejecutar(entorno);
        entorno.guardarvar(this.id, this.value, val.tipo);
    }

}