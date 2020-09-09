import { env } from "process"
import { Entorno } from "../Entorno/Entorno";
import { Retorno, Tipo} from "./Retorno";
import { L_tipos } from "../Otros/Tb_Tipos";

export abstract class Expresion {

    public linea: number;
    public columna: number;

    constructor(line: number, column: number) {
        this.linea = line;
        this.columna = column;
    }

    public abstract ejecutar(entorno: Entorno) : Retorno;

    //Definimos que tipo es el que predomina entre esos dos
    public Tipo_dominante(tipoIzq : Tipo, tipoDer : Tipo) : Tipo{
        const tipo = L_tipos[tipoIzq][tipoDer];
        return tipo;
    }
}