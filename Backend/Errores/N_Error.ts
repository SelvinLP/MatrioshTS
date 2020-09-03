export class N_Error {

    private Tipo:string;
    private Descripcion:string;
    private Linea:number;
    private Columna:number;

    constructor(tipo:string,descripcion:string,linea:number, columna:number){
        this.Tipo=tipo;
        this.Descripcion=descripcion;
        this.Linea=linea;
        this.Columna=columna;
    }

}