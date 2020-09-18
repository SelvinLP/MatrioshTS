import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export class Ifelse extends Instruccion{

    constructor(private condicion : Expresion, private codigo : Instruccion, private elsest : Instruccion | null,
        line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        let condicion = this.condicion.ejecutar(entorno);
        if(condicion.tipo == Tipo.BOOLEAN){
            if(condicion.valor == true){
                return this.codigo.ejecutar(entorno);
            }
            else{
                if(this.elsest != null){
                    return this.elsest.ejecutar(entorno);
                } 
            }
        }else{
            throw new N_Error('Semantico','La operacion no es booleana en el If '+ condicion.valor,'', this.linea,this.columna);  
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"If\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast ;
        //Seccion Condicion
        result=this.condicion.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
        //Seccion Codigo
        result=this.codigo.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});
        //Seccion Else
        if(this.elsest != null){
            let Cadena:string=result.cadena+"\n";
            Cadena += result.posdes+" [label =\"Else\"];\n";
            Cadena += ast.posdes+" -> "+result.posdes+";\n";
            result =this.elsest.ejecutarast({posant:result.posdes, posdes:result.posdes+1,cadena:Cadena});
        }
        return result;
    }
    
}

