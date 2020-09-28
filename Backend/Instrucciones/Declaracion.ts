import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Tipo,TipoDato } from "../Abstracto/Retorno";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";
import { N_Ast } from "../Ast/Ast";
import { N_Tipo } from "../Otros/N_Tipo";
import { C_Array, L_Array } from "./Array";

export class N_Declaracion{
    constructor(public value:Expresion, public array:Expresion[], public types:Array<N_Parametros>){}
}
export class N_Parametros{
    constructor(public id:string, public value:Expresion){}
}
export class Declaracion extends Instruccion{

    constructor(private letoconst:TipoDato , private id: string, private tipo:N_Tipo, private tarray:[],
        private value : N_Declaracion, line : number, column: number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno){
        //comprobacion si es array
        if(this.tarray!=null){
            if(this.tipo==null){
                this.tipo=new N_Tipo(Tipo.NULL,"");
            }
            entorno.guardararray(this.id,new C_Array(this.tipo.tipo,this.tarray),this.linea,this.columna);
            if(this.value!=null){//verificacion del array
                this.insertararray(entorno);
            }
        }else{ 
            //validacion si es de otro tipo de array
            let banderaarray=false;
            if(this.tipo!=null){
                if(this.tipo.tipo==Tipo.ARRAY){
                    if(this.tipo.cadTipo == "number"){
                        this.tipo.tipo=Tipo.NUMBER;
                    }else if(this.tipo.cadTipo == "string"){
                        this.tipo.tipo=Tipo.STRING;
                    }else if(this.tipo.cadTipo == "boolean"){
                        this.tipo.tipo=Tipo.BOOLEAN;
                    }else if(this.tipo.cadTipo == "void"){
                        this.tipo.tipo=Tipo.NULL;
                    }
                    entorno.guardararray(this.id,new C_Array(this.tipo.tipo,[new L_Array(null,null)]),this.linea,this.columna);
                    banderaarray=true;

                    if(this.value!=null){//verificacion del array
                        this.insertararray(entorno);
                    }
                }
            }

            if (!banderaarray){
                if(this.value == null){
                    //Validaciones de const
                    if(this.letoconst == TipoDato.CONST){
                        throw new N_Error('Semantico','La variable '+this.id+" tipo const no tiene definido un valor",'', this.linea, this.columna);
                    }else{
                        entorno.guardarvar(this.letoconst, this.id, this.value, this.tipo ,this.linea,this.columna);
                    }
                }else{
                    let banderainsertar=false;
                    let resp=this.value.value.ejecutar(entorno);
                    //Definicion de tipo sino tiene
                    if( this.tipo == null){
                        this.tipo=new N_Tipo(resp.tipo,"");
                        banderainsertar=true;
                    }else{
                        //comprobacion de compatibilidad de datos
                        if(this.tipo.tipo == resp.tipo){
                                banderainsertar=true;
                        }else{
                            throw new N_Error('Semantico','La variable '+this.id+" no es de tipo compatible con la expresion",'', this.linea, this.columna);
                        }
                    }
                    //Insertamos si cumple con las condiciones
                    if(banderainsertar == true){
                        entorno.guardarvar(this.letoconst, this.id, resp.valor, this.tipo ,this.linea,this.columna);
                    }
                }
            }
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Declaracion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Id
        if(this.letoconst == TipoDato.CONST){
            Cadena += (ast.posdes+1)+" [label =\"const\"];\n";
            Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";
        }else{
            Cadena += (ast.posdes+1)+" [label =\"let\"];\n";
            Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";
        }
        Cadena += (ast.posdes+2)+" [label =\""+this.id+"\"];\n";
        Cadena += ast.posdes+" -> "+(ast.posdes+2)+";\n";
        result={posant:ast.posdes+2, posdes:ast.posdes+3,cadena:Cadena};
        //si es array
        if(this.tarray!=null){
            result.cadena += (result.posdes)+" [label =\"[]\"];\n";
            result.cadena += ast.posdes+" -> "+(result.posdes)+";\n";
            result={posant:result.posdes, posdes:result.posdes+1,cadena:result.cadena};
        }
        if(this.value !=null){
            if(this.value.value!=null){
                //=
                result.cadena += (result.posdes)+" [label =\"=\"];\n";
                result.cadena += ast.posdes+" -> "+(result.posdes)+";\n";
                //Expresion
                result=this.value.value.ejecutarast({posant:ast.posdes, posdes:result.posdes+1,cadena:result.cadena});
            }
        }

        
        return result;
    }

    public insertararray(entorno:Entorno){
        let listaresult=entorno.obtenerarray(this.id);
        if(listaresult==null){
            throw new N_Error('Semantico','El array no existe: '+this.id,'', this.linea, this.columna);
        }else{
            if(listaresult.tipo==Tipo.NULL){
                if(this.value.array==null ){
                    //comprobacion si es [] para limpiar los array
                }else{//sino inserta los valores del array de entrada
                    for(const nodovalor of this.value.array){
                        listaresult.tipo=nodovalor.ejecutar(entorno).tipo;
                        let inicio=listaresult.listaarray;
                        inicio.push(new L_Array({value:nodovalor.ejecutar(entorno).valor,tipo:nodovalor.ejecutar(entorno).tipo},[new L_Array(null,null)]));
                    }
                }
            }else{
                if(this.value.array==null ){
                    //comprobacion si es [] para limpiar los array
                }else{
                    for(const nodovalor of this.value.array){
                        if(nodovalor.ejecutar(entorno).tipo==listaresult.tipo){
                            let inicio=listaresult.listaarray;
                            inicio.push(new L_Array({value:nodovalor.ejecutar(entorno).valor,tipo:nodovalor.ejecutar(entorno).tipo},[new L_Array(null,null)]));
                        }else{
                            throw new N_Error('Semantico','Tipo no compatible en el array: '+this.id,'', this.linea, this.columna);
                        }
                        
                    }
                }
            }

        }
    }
}