import { Tipo } from "../Abstracto/Retorno";

export class C_Array{
    constructor(public tipo:Tipo, public listaarray:Array<L_Array>){
    }
}
export class L_Array{
    constructor(public valor:{value:any,tipo:any}|null, public lista:Array<L_Array>| null){}

    public agregardimension(dimension:Array<L_Array>){
        this.lista=dimension;
    }
}