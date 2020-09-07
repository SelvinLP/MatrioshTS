import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";


export class Ifelse extends Instruccion{

    constructor(private condicion : Expresion, private codigo : Instruccion, private elsest : Instruccion | null,
        line : number, column : number){
        super(line, column);
    }

    public ejecutar() {
        const condicion = this.condicion.ejecutar();
        if(condicion.tipo == Tipo.BOOLEAN){
            if(condicion.valor == true){
                return this.codigo.ejecutar();
            }
            else{
                if(this.elsest != null)
                    this.elsest.ejecutar();
            }
        }else{
            throw new N_Error('Semantico','La operacion no es booleana en el If', this.linea,this.columna);  
        }
    }
}

