//Tipos de variables
export enum Tipo{
    STRING,
    NUMBER,
    BOOLEAN ,
    NULL,
    ARRAY
}

//Variables de retorno
export type Retorno ={
    valor : any,
    tipo : Tipo
}

//Tipos de operaciones Aritmeticas
export enum TipoAritmetico{
    MAS,
    MENOS,
    MULT,
    DIV
}

//Tipos de operaciones logicas
export enum TipoRelacional{
    MAYORQUE,
    MENORQUE,
    MAYORIGUAL,
    MENORIGUAL,
    IGUAL,
    DIFERENCIA
}