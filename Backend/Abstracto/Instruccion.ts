import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export abstract class Instruccion {

    public linea: number;
    public columna: number;

    constructor(line: number, column: number) {
        this.linea = line;
        this.columna = column;
    }

    public abstract ejecutar(entorno:Entorno) : any;

    public abstract ejecutarast(ast:N_Ast):N_Ast;
}