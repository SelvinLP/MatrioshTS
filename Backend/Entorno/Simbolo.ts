import { Tipo } from "../Abstracto/Retorno";
import { Expresion } from "../Abstracto/Expresion";

export class Simbolo{
    public id : string;
    public valor :Expresion;
    public tipo : Tipo;

    constructor(id: string, valor: Expresion, tipo: Tipo){
        this.valor = valor;
        this.id = id;
        this.tipo = tipo;
    }
}