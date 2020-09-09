import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";

export class While extends Instruccion{

    constructor(private condicion : Expresion, private codigo : Instruccion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        let condicion = this.condicion.ejecutar(entorno);
        if(condicion.tipo == Tipo.BOOLEAN){
            while(condicion.valor == true){
                const resultado = this.codigo.ejecutar(entorno);
                if( resultado != null || resultado != undefined){
                }
                condicion = this.condicion.ejecutar(entorno);
                if(condicion.tipo != Tipo.BOOLEAN){
                    throw new N_Error('Semantico','La operacion no es booleana en el while', this.linea,this.columna);
                }
            }
        }else{
            throw new N_Error('Semantico','La operacion no es booleana en el while', this.linea,this.columna);
        }
    }
}