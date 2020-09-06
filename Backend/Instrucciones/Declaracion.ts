import { Instruccion } from "../Abstracto/Instruccion";


export class Declaration extends Instruccion{

    //Falta de declaracion de expresion se debe cambiar los any
    private id : string;
    private value : any;

    constructor(id: string, value : any, line : number, column: number){
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public ejecutar() : any{}

}