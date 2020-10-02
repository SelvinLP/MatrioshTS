import { Instruccion } from "../../Abstracto/Instruccion";
import { Tipo, TipoDato } from "../../Abstracto/Retorno";
import { N_Error } from "../../Errores/N_Error";
import { Entorno } from "../../Entorno/Entorno";
import { N_Ast } from "../../Ast/Ast";
import { N_Tipo } from "../../Otros/N_Tipo";

export class Forof extends Instruccion{

    constructor(private letoconst:TipoDato, private id:string, private iddireccion:string,private codigo:Instruccion,
        line : number, column : number){
       super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        let valorarray=entorno.obtenerarray(this.iddireccion);
        //ejecutamos el for
        if(valorarray !=null){
            if(valorarray?.listaarray != undefined){
                entorno.guardarvar(TipoDato.LET, this.id,0, new N_Tipo(Tipo.NULL,""),null ,this.linea,this.columna);
                let variable=entorno.obtenervar(this.id);
                for(let pos=0;pos<valorarray?.listaarray.length;pos++){
                    if(variable !=null){
                        if(valorarray.listaarray[pos]==null){
                            continue;
                        }else{
                            variable.valor=valorarray.listaarray[pos].valor?.value;
                        }
                    }else{
                        continue;
                    }
                    const valor=this.codigo.ejecutar(entorno);
                    //verificacion si viene un break o continue
                    if(valor != null || valor != undefined){
                        if(valor.tipobyc == "continue"){
                            continue;
                        }else if(valor.tipobyc == "break"){
                            break;
                        }
                    }
                    //incremento en el for
                    if(variable !=null){
                        variable.valor+=1;
                    }
                }
                entorno.eliminarvar(this.id);
            }else{
                throw new N_Error('Semantico','El array no existe en el for in','', this.linea,this.columna);
            }
        }else{
            throw new N_Error('Semantico','El array no existe en el for in','', this.linea,this.columna);
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"For of\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};

        result.cadena += result.posdes+" [label =\"Id: "+this.id+"\"];\n";
        result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        result={posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena};
        
        result.cadena += result.posdes+" [label =\"Array: "+this.iddireccion+"\"];\n";
        result.cadena += ast.posdes+" -> "+result.posdes+";\n";
        //Seccion Codigo
        result =this.codigo.ejecutarast({posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena});
        return result;
    }
}