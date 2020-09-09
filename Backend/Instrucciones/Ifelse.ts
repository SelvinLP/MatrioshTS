import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";

export class Ifelse extends Instruccion{

    constructor(private condicion : Expresion, private codigo : Instruccion, private elsest : Instruccion | null,
        line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        const condicion = this.condicion.ejecutar(entorno);
        if(condicion.tipo == Tipo.BOOLEAN){
            if(condicion.valor == true){
                return this.codigo.ejecutar(entorno);
            }
            else{
                if(this.elsest != null)
                    this.elsest.ejecutar(entorno);
            }
        }else{
            throw new N_Error('Semantico','La operacion no es booleana en el If', this.linea,this.columna);  
        }
    }
}

