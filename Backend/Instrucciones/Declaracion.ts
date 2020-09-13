import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Tipo,TipoDato } from "../Abstracto/Retorno";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";

export class Declaracion extends Instruccion{

    constructor(private letoconst:TipoDato , private id: string, private tipo:Tipo, private value : Expresion, 
        line : number, column: number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno){
        if(this.value == null){
            //Validaciones de const
            if(this.letoconst == TipoDato.CONST){
                throw new N_Error('Semantico','La variable '+this.id+" tipo const no tiene definido un valor",'', this.linea, this.columna);
            }else{
                entorno.guardarvar(this.letoconst, this.id, this.value, this.tipo ,this.linea,this.columna);
            }
        }else{
            let banderainsertar=false;
            let resp=this.value.ejecutar(entorno);
            //Definicion de tipo sino tiene
            if(this.tipo == Tipo.NULL || this.tipo == null){
                this.tipo=resp.tipo;
                banderainsertar=true;
            }else{
                //comprobacion de compatibilidad de datos
                if(this.tipo == resp.tipo){
                        banderainsertar=true;
                }else{
                    throw new N_Error('Semantico','La variable '+this.id+" no es de tipo compatible con la expresion",'', this.linea, this.columna);
                }
            }
            //Insertamos si cumple con las condiciones
            if(banderainsertar == true){
                entorno.guardarvar(this.letoconst, this.id, resp.valor, resp.tipo ,this.linea,this.columna);
            }
        }
    }
}