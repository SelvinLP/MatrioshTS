import {  TipoDato } from "../Abstracto/Retorno";
import { N_Tipo } from "../Otros/N_Tipo";
import { C_Array } from "../Instrucciones/Array";

export class Simbolo{
    constructor(public letoconst: TipoDato, public id: string, public tipo: N_Tipo, public valor: any, 
        public cuerpoarray:C_Array|null , public cuerpotype:Array<any>|null){
    }
}