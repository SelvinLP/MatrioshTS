export class N_Error {

    private tipo:string;
    private descripcion:string;
    private linea:number;
    private columna:number;

    constructor(type:string,description:string,line:number, column:number){
        this.tipo=type;
        this.descripcion=description;
        this.linea=line;
        this.columna=column;
    }

}