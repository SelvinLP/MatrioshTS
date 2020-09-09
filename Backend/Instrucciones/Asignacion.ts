import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";
import { TipoDato } from "../Abstracto/Retorno";

export class Asignacion extends Instruccion{

    constructor(private id: string, private value : Expresion, line : number, column: number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno){
        const resultado= entorno.obtenervar(this.id);
        if(resultado == null){
            throw new N_Error('Semantico','La variable no existe: '+ this.id, this.linea,this.columna);
        }
        if(resultado.letoconst == TipoDato.CONST){
            throw new N_Error('Semantico','La variable '+this.id+' no se puede modificar', this.linea,this.columna);
        }

        let exp =this.value.ejecutar(entorno);
        //Definicion de tipo sino tiene
        if(resultado.tipo == null){
            resultado.tipo = exp.tipo;
            resultado.valor = exp.valor; 
        }else{
            //comprobacion de compatibilidad de datos
            if(resultado.tipo == exp.tipo){
                resultado.tipo = exp.tipo;
                resultado.valor = exp.valor;
            }else{
                throw new N_Error('Semantico','La variable '+this.id+" no es de tipo compatible con la asignacion", this.linea, this.columna);
            }
        }
    }
}