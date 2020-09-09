import { Entorno } from "../Entorno/Entorno";

export abstract class Instruccion {

    public linea: number;
    public columna: number;

    constructor(line: number, column: number) {
        this.linea = line;
        this.columna = column;
    }

    public abstract ejecutar(entorno:Entorno) : any;
}