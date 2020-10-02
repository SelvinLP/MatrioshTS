//Tipos de variables
export enum Tipo{
    NUMBER = 0,
    STRING = 1,
    BOOLEAN = 2,
    NULL = 3,
    ARRAY = 4,
    TYPE =5
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
    DIV,
    POT,
    MOD,
    INC,
    DEC,
    UMENOS,
    UMAS
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

//Tipos de operaciones logicas
export enum TipoLogica{
    AND,
    OR,
    NOT 
}

//Tipo de dato
export enum TipoDato{
    LET,
    CONST,
    NADA
}