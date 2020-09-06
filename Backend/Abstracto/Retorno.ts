//Tipos de variables
export enum Tipo{
    STRING = 0,
    NUMBER = 1,
    BOOLEAN = 2,
    NULL = 3,
    ARRAY = 4
}

//Variables de retorno
export type Retorno ={
    valor : any,
    tipo : Tipo
}

//Tipos de operaciones
export enum TipoAritmetico{
    MAS,
    MENOS,
    MULT,
    DIV
}