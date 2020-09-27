 //Definimos y exportamos el array
export let L_Simbs: Array<N_Simbolo> =new Array();

export class N_Simbolo{
    constructor(public letoconst: string, public id: string, public tipo: string, public valor: any, 
    public entorno:string){
    }
} 