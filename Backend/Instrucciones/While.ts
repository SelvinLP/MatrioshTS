import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export class While extends Instruccion{

    constructor(private condicion : Expresion, private codigo : Instruccion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        let condicion = this.condicion.ejecutar(entorno);
        if(condicion.tipo == Tipo.BOOLEAN){
            while(condicion.valor == true){
                const valor=this.codigo.ejecutar(entorno);
                //verificacion si viene un break o continue
                if(valor != null || valor != undefined){
                    if(valor.tipobyc == "continue"){
                        continue;
                    }else if(valor.tipobyc == "break"){
                        break;
                    }
                }
                //validacion nuevamente de la condicion sino se encicla
                condicion = this.condicion.ejecutar(entorno);
                if(condicion.tipo != Tipo.BOOLEAN){
                    throw new N_Error('Semantico','La operacion no es booleana en el while','', this.linea,this.columna);
                }
            }
        }else{
            throw new N_Error('Semantico','La operacion no es booleana en el while','', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"While\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Seccion Expresion
        result=this.condicion.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
        //Seccion Codigo
        result=this.codigo.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});
        return result;
    }
}