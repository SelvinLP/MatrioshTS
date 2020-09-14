import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export class Dowhile extends Instruccion{

    constructor(private condicion : Expresion, private codigo : Instruccion, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        let condicion;
        do{
            this.codigo.ejecutar(entorno);
            condicion=this.condicion.ejecutar(entorno);
            if(condicion.tipo != Tipo.BOOLEAN){
                throw new N_Error('Semantico','La operacion no es booleana en el do..while','', this.linea,this.columna);
            }
        }while(condicion.valor == true);
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Do while\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Seccion Codigo
        result=this.codigo.ejecutarast({posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena});
        //Seccion Condicion
        result=this.condicion.ejecutarast({posant:ast.posdes, posdes:result.posdes,cadena:result.cadena});

        return result;
    }
    
}