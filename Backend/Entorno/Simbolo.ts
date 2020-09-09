import { Tipo, TipoDato } from "../Abstracto/Retorno";
import { Expresion } from "../Abstracto/Expresion";

export class Simbolo{
    constructor(public letoconst: TipoDato, public id: string, public tipo: Tipo, public valor: Expresion){
    }
}