import { Expresion } from "../Abstracto/Expresion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";
import { N_Ast } from "../Ast/Ast";

export class Opeternario extends Expresion{

    constructor(private condicion: Expresion, private valortrue:Expresion, private valorfalse:Expresion,
         line : number, column: number){
        super(line, column);
    }

    public ejecutar(entorno: Entorno): Retorno {
        let condicion = this.condicion.ejecutar(entorno);
        if(condicion.tipo == Tipo.BOOLEAN){
            if(condicion.valor == true){
                return this.valortrue.ejecutar(entorno);
            }
            else{
                return this.valorfalse.ejecutar(entorno);
            }
        }else{
            throw new N_Error('Semantico','La operacion no es booleana en el If '+ condicion.valor,'', this.linea,this.columna);  
        }
        
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Operador Terneario\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let resultado={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        resultado=this.condicion.ejecutarast({posant:ast.posdes, posdes:resultado.posdes,cadena:resultado.cadena});
        resultado=this.valortrue.ejecutarast({posant:ast.posdes, posdes:resultado.posdes,cadena:resultado.cadena});
        resultado=this.valorfalse.ejecutarast({posant:ast.posdes, posdes:resultado.posdes,cadena:resultado.cadena});
        return resultado;
    }

}