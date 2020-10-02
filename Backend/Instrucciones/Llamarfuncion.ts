import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { L_Errores } from "../Errores/L_Error";
import { TipoDato } from "../Abstracto/Retorno";
import { N_Tipo } from "../Otros/N_Tipo";

export class Llamarfuncion extends Instruccion{

    constructor(private id: string, private expresiones : Array<Expresion>, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno : Entorno) {
        const funcion = entorno.obtenerfuncion(this.id);
        if(funcion == null){
            throw new N_Error('Semantico','La funcion '+this.id+" no existe",'', this.linea, this.columna);
        }
        //si la funcion existe
        const nuevoentorno = new Entorno(entorno);
        //creamos los parametros y les asignamos su valor
        let variables:any=funcion.parametros;
        if(variables!=null || variables!=undefined){
            let posvalorasignar=0;
          while(true){
            //valor a agregar
            let vlar=this.expresiones[posvalorasignar].ejecutar(entorno);
            nuevoentorno.guardarvar(TipoDato.LET,variables[0].id , vlar.valor, new N_Tipo(vlar.tipo,"") ,null ,this.linea,this.columna);
            if(variables[1] == undefined || variables[1]==null){
                break;
            }
            variables=variables[1];
            posvalorasignar++;
          }
        }

        //recorremos todas las demas instrucciones
        if(funcion.codigo!=null || funcion.codigo != undefined){
            for(const instr of funcion.codigo){
                try {
    
                    const result = instr.ejecutar(nuevoentorno);
                    if(result != undefined || result != null)
                        return result;                
                } catch (err) {
                    L_Errores.push(err);
                }
            }
        }


    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Llamar funcion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";

        return {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
    }
}