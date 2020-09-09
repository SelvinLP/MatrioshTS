import { Tipo, TipoDato } from "../Abstracto/Retorno";

export class Simbolo{
    constructor(public letoconst: TipoDato, public id: string, public tipo: Tipo, public valor: any){
    }
}