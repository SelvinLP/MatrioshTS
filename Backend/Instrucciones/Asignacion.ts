import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";
import { TipoDato, TipoAritmetico, Tipo } from "../Abstracto/Retorno";

export class Asignacion extends Instruccion{

    constructor(private id: string, private value : Expresion,private tipo:TipoAritmetico, line : number, column: number){
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

        if(this.value ==null){
            //Es incremento o decremento
            if(resultado.tipo == Tipo.NUMBER){
                if(this.tipo == TipoAritmetico.INC){
                    resultado.valor=resultado.valor+1;
                }else if(this.tipo == TipoAritmetico.DEC){
                    resultado.valor=resultado.valor-1;
                }else{
                    throw new N_Error('Semantico','La variable '+this.id+" no es de tipo compatible para incr o decr", this.linea, this.columna);
                }
            }
            
        }else{
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
}