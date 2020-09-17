import { Tipo } from "../Abstracto/Retorno";

export class C_Array{
    constructor(public tipo:Tipo, public listaarray:Array<L_Array>){
    }
}
export class L_Array{
    constructor(public N_listaarray:Array<any>){}
}