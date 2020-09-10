import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { Asignacion } from "./Asignacion";
import { Declaracion } from "./Declaracion";

export class For extends Instruccion{

    constructor(private declaracion:Declaracion, private condicion:Expresion, private incydec:Asignacion, 
        private codigo:Instruccion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        this.declaracion.ejecutar(entorno);
        let rescondicion = this.condicion.ejecutar(entorno);
        if(rescondicion.tipo == Tipo.BOOLEAN){
            while(rescondicion.valor == true){
                this.codigo.ejecutar(entorno);
                this.incydec.ejecutar(entorno);

                //validacion nuevamente de la condicion sino se encicla
                rescondicion = this.condicion.ejecutar(entorno);
                if(rescondicion.tipo != Tipo.BOOLEAN){
                    throw new N_Error('Semantico','La operacion no es booleana en el for', this.linea,this.columna);
                }
            }
        }else{
            throw new N_Error('Semantico','La operacion no es booleana en el for', this.linea,this.columna);
        }
    }
}