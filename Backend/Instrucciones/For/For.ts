import { Expresion } from "../../Abstracto/Expresion";
import { Instruccion } from "../../Abstracto/Instruccion";
import { Tipo } from "../../Abstracto/Retorno";
import { N_Error } from "../../Errores/N_Error";
import { Entorno } from "../../Entorno/Entorno";
import { Asignacion } from "../Asignacion";
import { Declaracion } from "../Declaracion";
import { N_Ast } from "../../Ast/Ast";

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
                const valor=this.codigo.ejecutar(entorno);
                //verificacion si viene un break o continue
                if(valor != null || valor != undefined){
                    if(valor.tipobyc == "continue"){
                        continue;
                    }else if(valor.tipobyc == "break"){
                        break;
                    }else{
                        return valor;
                    }
                }
                //incremento o decremento
                this.incydec.ejecutar(entorno);

                //validacion nuevamente de la condicion sino se encicla
                rescondicion = this.condicion.ejecutar(entorno);
                if(rescondicion.tipo != Tipo.BOOLEAN){
                    throw new N_Error('Semantico','La operacion no es booleana en el for','', this.linea,this.columna);
                }
            }
            entorno.eliminarvar(this.declaracion.id);

        }else{
            throw new N_Error('Semantico','La operacion no es booleana en el for','', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"For\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Seccion Declaracion
        result =this.declaracion.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
        //Seccion Condicion
        result =this.condicion.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});
        //Seccion Asignacion
        result =this.incydec.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});
        //Seccion Codigo
        result =this.codigo.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});
        return result;
    }
}