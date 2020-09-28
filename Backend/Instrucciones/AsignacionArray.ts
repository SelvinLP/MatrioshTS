import { Instruccion } from "../Abstracto/Instruccion";
import { Expresion } from "../Abstracto/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { N_Error } from "../Errores/N_Error";
import { Tipo, Retorno } from "../Abstracto/Retorno";
import { N_Ast } from "../Ast/Ast";
import { L_Print } from "../Otros/L_Print";
import { strict } from "assert";
import { L_Array } from "./Array";


export class AsignacionArray extends Instruccion{

    constructor(private id: string,private tipoinsert:string|Array<Expresion>, private valor:Expresion| string, line : number, column: number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno){
        let listaresult=entorno.obtenerarray(this.id);
        if(listaresult==null){
            throw new N_Error('Semantico','El array no existe: '+this.id,'', this.linea, this.columna);
        }else{
            if(typeof this.tipoinsert == "string" ){
                if(this.tipoinsert=="push" && typeof this.valor != "string"){
                    if(listaresult.tipo==Tipo.NULL){
                        listaresult.tipo=this.valor.ejecutar(entorno).tipo;
                        let inicio=listaresult.listaarray;
                        inicio.push(new L_Array({value:this.valor.ejecutar(entorno).valor,tipo:this.valor.ejecutar(entorno).tipo},[new L_Array(null,null)]));
                    }else{
                        if(this.valor.ejecutar(entorno).tipo==listaresult.tipo){
                            let inicio=listaresult.listaarray;
                            inicio.push(new L_Array({value:this.valor.ejecutar(entorno).valor,tipo:this.valor.ejecutar(entorno).tipo},[new L_Array(null,null)]));
                        }else{
                            throw new N_Error('Semantico','Tipo no compatible en el array'+this.id,'', this.linea, this.columna);
                        }
                    }
                }else if (this.tipoinsert == "pop"){
                    let inicio=listaresult.listaarray;
                    if(inicio.length>1){
                        listaresult.listaarray.pop();
                    }else{
                        throw new N_Error('Semantico','El array ya no tiene datos','', this.linea, this.columna);
                    }
                }
            }else{//Es asignacion por posicion o limpiar matriz
                if(typeof this.valor == "string"){//limpiamos la matriz
                    //cambio de posicion
                    let inicio:Array<L_Array> | null=listaresult.listaarray;
                    for(let pos=0;pos<this.tipoinsert.length-1;pos++){
                        let nodovalor=this.tipoinsert[pos];
                        let posdir=nodovalor.ejecutar(entorno).valor+1;
                        if(inicio != null){
                            if(inicio[posdir] != null){
                                if(inicio[posdir].lista != null){
                                    inicio=inicio[posdir].lista;
                                }else{
                                    inicio[posdir].lista=[new L_Array(null,null)];
                                    inicio=inicio[posdir].lista;
                                }
                            }else{
                                inicio[posdir]=new L_Array({value:null,tipo:null},[new L_Array(null,null)]);
                                inicio=inicio[posdir].lista;
                            }
                        }else{
                            break;//error
                        }
                        
                    }
                    //insertamos
                    if(inicio!=null){
                        let posicion=this.tipoinsert[this.tipoinsert.length-1].ejecutar(entorno).valor+1;
                        inicio[posicion]=new L_Array({value:null,tipo:null},[new L_Array(null,null)]);
                    }

                }else{//insertamos datos en
                    if(listaresult.tipo==Tipo.NULL){
                        listaresult.tipo=this.valor.ejecutar(entorno).tipo;
                    }
                    //cambio de posicion
                    let inicio:Array<L_Array> | null=listaresult.listaarray;
                    for(let pos=0;pos<this.tipoinsert.length-1;pos++){
                        let nodovalor=this.tipoinsert[pos];
                        let posdir=nodovalor.ejecutar(entorno).valor+1;
                        if(inicio != null){
                            if(inicio[posdir] != null){
                                if(inicio[posdir].lista != null){
                                    inicio=inicio[posdir].lista;
                                }else{
                                    inicio[posdir].lista=[new L_Array(null,null)];
                                    inicio=inicio[posdir].lista;
                                }
                            }else{
                                inicio[posdir]=new L_Array({value:null,tipo:null},[new L_Array(null,null)]);
                                inicio=inicio[posdir].lista;
                            }
                        }else{
                            break;//error
                        }
                        
                    }
                    //insertamos
                    if(inicio!=null){
                        let posicion=this.tipoinsert[this.tipoinsert.length-1].ejecutar(entorno).valor+1;
                        if(inicio[posicion]==null){
                            inicio[posicion]=new L_Array({value:this.valor.ejecutar(entorno).valor,tipo:this.valor.ejecutar(entorno).tipo},[new L_Array(null,null)]);
                        }else{
                            inicio[posicion].valor={value:this.valor.ejecutar(entorno).valor,tipo:this.valor.ejecutar(entorno).tipo}
                            if(inicio[posicion].lista==null){
                                inicio[posicion].lista=[new L_Array(null,null)];
                            }
                        }
                    }
                }
                
            }

        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Asignacion: "+this.id+"\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let resultado:N_Ast;
        resultado={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        if(this.valor!=null){
            if(typeof this.valor != "string"){
                resultado=this.valor.ejecutarast(resultado);
            }
        }
        
        return resultado;
    }


}

export class AsignacionArrayExp extends Expresion{

    constructor(private id: string, private tipoinsert:Array<Expresion>, line : number, column: number){
        super(line, column);
    }
    public ejecutar( entorno : Entorno ) : Retorno{
        let listaresult=entorno.obtenerarray(this.id);
        if(listaresult==null){
            throw new N_Error('Semantico','El array no existe: '+this.id,'', this.linea, this.columna);
        }else{//obtener tamaño
            if(this.tipoinsert == null){
                let inicio=listaresult.listaarray;
                return {valor : inicio.length-1, tipo : Tipo.NUMBER};
            }else{
                let inicio:Array<L_Array> | null=listaresult.listaarray;
                for(let pos=0;pos<this.tipoinsert.length-1;pos++){
                    let nodovalor=this.tipoinsert[pos];
                    let posdir=nodovalor.ejecutar(entorno).valor+1;
                    if(inicio != null){
                        if(inicio[posdir] != null){
                            if(inicio[posdir].lista != null){
                                inicio=inicio[posdir].lista;
                            }else{
                                inicio[posdir].lista=[new L_Array(null,null)];
                                inicio=inicio[posdir].lista;
                            }
                        }else{
                            inicio[posdir]=new L_Array({value:null,tipo:null},[new L_Array(null,null)]);
                            inicio=inicio[posdir].lista;
                        }
                    }else{
                        break;//error
                    }
                    
                }
                //obtenemos length
                if(inicio==null){
                    throw new N_Error('Semantico','Dimension no definida en el aray: '+this.id,'', this.linea, this.columna);
                }else{
                    let posicion=this.tipoinsert[this.tipoinsert.length-1].ejecutar(entorno).valor+1;
                    if(inicio[posicion]==null){
                        throw new N_Error('Semantico','Dimension no definida en el aray: '+this.id,'', this.linea, this.columna);
                    }else{
                        if(inicio[posicion].lista!=null){
                            let valor=inicio[posicion].lista?.length
                            if(typeof valor == "number"){ 
                                return {valor : valor-1, tipo : Tipo.NUMBER};
                            }else{
                                throw new N_Error('Semantico','Dimension no definida en el aray: '+this.id,'', this.linea, this.columna);
                            }
                           
                        }else{
                            throw new N_Error('Semantico','Dimension no definida en el aray: '+this.id,'', this.linea, this.columna);
                        }
                    }
                    
                }
            }
            
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\""+this.id+".length\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";

        return {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
    }
}

export class Obtenervalorarray extends Expresion{
    constructor(private id: string, private tipoinsert:Array<Expresion>, line : number, column: number){
        super(line, column);
    }
    public ejecutar( entorno : Entorno ) : Retorno{
        let listaresult=entorno.obtenerarray(this.id);
        if(listaresult==null){
            throw new N_Error('Semantico','El array no existe: '+this.id,'', this.linea, this.columna);
        }else{//obtener tamaño
            let inicio:Array<L_Array> | null=listaresult.listaarray;
            for(let pos=0;pos<this.tipoinsert.length-1;pos++){
                let nodovalor=this.tipoinsert[pos];
                let posdir=nodovalor.ejecutar(entorno).valor+1;
                if(inicio != null){
                    if(inicio[posdir] != null){
                        if(inicio[posdir].lista != null){
                            inicio=inicio[posdir].lista;
                        }else{
                            inicio[posdir].lista=[new L_Array(null,null)];
                            inicio=inicio[posdir].lista;
                        }
                    }else{
                        inicio[posdir]=new L_Array({value:null,tipo:null},[new L_Array(null,null)]);
                        inicio=inicio[posdir].lista;
                    }
                }else{
                    break;//error
                }
                
            }
            //obtenemos length
            if(inicio==null){
                throw new N_Error('Semantico','Dimension no definida en el aray: '+this.id,'', this.linea, this.columna);
            }else{
                let posicion=this.tipoinsert[this.tipoinsert.length-1].ejecutar(entorno).valor+1;
                if(inicio[posicion]==null){
                    throw new N_Error('Semantico','Dimension no definida en el aray: '+this.id,'', this.linea, this.columna);
                }else{
                    if(inicio[posicion].lista!=null){
                        let valor=inicio[posicion].valor;
                        return {valor : valor?.value, tipo : valor?.tipo};
                       
                    }else{
                        throw new N_Error('Semantico','Dimension no definida en el aray: '+this.id,'', this.linea, this.columna);
                    }
                }
                
            }
            
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\""+this.id+"[dimensiones]\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let resultado= {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        return resultado
    }
}

export class pushpopcondireccion extends Instruccion{
    constructor(private id: string, private tipoinsert:Array<Expresion>,private tipoasi:string,private valor:Expresion, 
        line : number, column: number){
        super(line, column);
    }
    public ejecutar( entorno : Entorno ){
        let listaresult=entorno.obtenerarray(this.id);
        if(listaresult==null){
            throw new N_Error('Semantico','El array no existe: '+this.id,'', this.linea, this.columna);
        }else{//obtener tamaño
            let inicio:Array<L_Array> | null=listaresult.listaarray;
            for(let pos=0;pos<this.tipoinsert.length-1;pos++){
                let nodovalor=this.tipoinsert[pos];
                let posdir=nodovalor.ejecutar(entorno).valor+1;
                if(inicio != null){
                    if(inicio[posdir] != null){
                        if(inicio[posdir].lista != null){
                            inicio=inicio[posdir].lista;
                        }else{
                            inicio[posdir].lista=[new L_Array(null,null)];
                            inicio=inicio[posdir].lista;
                        }
                    }else{
                        inicio[posdir]=new L_Array({value:null,tipo:null},[new L_Array(null,null)]);
                        inicio=inicio[posdir].lista;
                    }
                }else{
                    break;//error
                }
                
            }
            //obtenemos length
            if(inicio==null){
                throw new N_Error('Semantico','Dimension no definida en el aray: '+this.id,'', this.linea, this.columna);
            }else{
                let posicion=this.tipoinsert[this.tipoinsert.length-1].ejecutar(entorno).valor+1;
                if(inicio[posicion]==null){
                    inicio[posicion]=new L_Array({value:null,tipo:null},[new L_Array(null,null)]);
                    if(this.tipoasi =="push"){
                        let valorres=this.valor.ejecutar(entorno);
                        let nuevovalor=new L_Array({value:valorres.valor ,tipo:valorres.tipo},[new L_Array(null,null)]);
                        inicio[posicion].lista?.push(nuevovalor);
                    }
                }else{
                    if(inicio[posicion].lista!=null){
                        if(this.tipoasi =="push"){
                            let valorres=this.valor.ejecutar(entorno);
                            let nuevovalor=new L_Array({value:valorres.valor ,tipo:valorres.tipo},[new L_Array(null,null)]);
                            inicio[posicion].lista?.push(nuevovalor);
                        }else if (this.tipoasi == "pop"){
                            if(inicio[posicion].lista?.length != 1){
                                inicio[posicion].lista?.pop();
                            }else{
                                throw new N_Error('Semantico','El array ya no tiene datos','', this.linea, this.columna);
                            }
                            
                        }
                       
                    }else{
                        throw new N_Error('Semantico','Dimension no definida en el aray: '+this.id,'', this.linea, this.columna);
                    }
                }
                
            }
            
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\""+this.id+"[dimensiones] "+this.tipoasi+"\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let resultado={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        if(this.valor != null){
            resultado=this.valor.ejecutarast(resultado);
        }
        return resultado;
    }
}