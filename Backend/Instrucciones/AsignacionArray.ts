import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";
import { Tipo, Retorno } from "../Abstracto/Retorno";
import { N_Ast } from "../Ast/Ast";
import { L_Print } from "../Otros/L_Print";


export class AsignacionArray extends Instruccion{

    constructor(private id: string,private tipoinsert:string, private valor:Expresion, line : number, column: number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno){
        let listaresult=entorno.obtenerarray(this.id);
        if(listaresult==null){
            throw new N_Error('Semantico','El array no existe: '+this.id,'', this.linea, this.columna);
        }else{
            if(this.tipoinsert=="push"){
                if(listaresult.tipo==Tipo.NULL){
                    listaresult.tipo=this.valor.ejecutar(entorno).tipo;
                    let inicio=listaresult.listaarray[0];
                    inicio.N_listaarray.push(this.valor);
                }else{
                    if(this.valor.ejecutar(entorno).tipo==listaresult.tipo){
                        let inicio=listaresult.listaarray[0];
                        inicio.N_listaarray.push(this.valor);
                    }else{
                        throw new N_Error('Semantico','Tipo no compatible en el array'+this.id,'', this.linea, this.columna);
                    }
                }
            }else if (this.tipoinsert == "pop"){
                let inicio=listaresult.listaarray[0];
                if(inicio.N_listaarray.length>0){
                    listaresult.listaarray[0].N_listaarray.pop();
                }else{
                    throw new N_Error('Semantico','El array ya no tiene datos','', this.linea, this.columna);
                }
            }
            
            console.log(listaresult.listaarray);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\""+this.id+"\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let resultado:N_Ast;
        resultado={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return resultado;
    }
}

export class AsignacionArrayExp extends Expresion{

    constructor(private id: string, line : number, column: number){
        super(line, column);
    }
    public ejecutar( entorno : Entorno ) : Retorno{
        let listaresult=entorno.obtenerarray(this.id);
        if(listaresult==null){
            throw new N_Error('Semantico','El array no existe: '+this.id,'', this.linea, this.columna);
        }else{//obtener tamaño
            let inicio=listaresult.listaarray[0];
            return {valor : inicio.N_listaarray.length, tipo : Tipo.NUMBER};
        }
    }
    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\""+this.id+".length\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";

        return {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
    }
}