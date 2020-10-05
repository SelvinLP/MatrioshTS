import { TipoDato, Tipo } from "../Abstracto/Retorno";
import { Simbolo } from "./Simbolo";
import { N_Error } from "../Errores/N_Error";
import { Funcion } from "../Instrucciones/Funcion";
import { N_Tipo } from "../Otros/N_Tipo";
import { L_type } from "../Otros/L_Types";
import { C_Array } from "../Instrucciones/Array";
import { L_Simbs,N_Simbolo } from "../Otros/L_Simb";

export class Entorno{
    
    private variables : Map<string,Simbolo>;
    public funciones : Map<string, Funcion>;
    //Types
    public types:L_type;

    constructor(public anterior : Entorno | null){
        this.variables = new Map();
        this.funciones = new Map();
        this.types=new L_type();
    }

    public guardarvar(letoconst: TipoDato,id: string, valor: any, tipo: N_Tipo,cuerpoarray:C_Array|null,cuerpotype:Array<any>|null, line : number, column: number){
        let env : Entorno | null = this;
        //verificacion si existe en el mismo entorno
        if(env.variables.has(id)){
            if(cuerpoarray!=null){
                throw new N_Error('Semantico','El array ya existe: '+id,'', line, column);  
            }else{
                throw new N_Error('Semantico','La variable ya existe: '+id,'', line, column);  
            }
                      
        }else{
            //sino se cumple lo guarda en el entorno actual
            this.variables.set(id, new Simbolo(letoconst,id, tipo, valor,cuerpoarray,cuerpotype));
            //lo insertamos en una lista para los reportes
            let tipodevariable="    ";
            let tipovalor="";
            if(TipoDato.LET == letoconst){
                tipodevariable="let  ";
            }else if(TipoDato.CONST == letoconst){
                tipodevariable="const";
            }
            if(Tipo.ARRAY == tipo.tipo){
                tipovalor="array";
            }else if(Tipo.BOOLEAN == tipo.tipo){
                tipovalor="boolean";
            }else if(Tipo.NULL == tipo.tipo){
                tipovalor="null";
            }if(Tipo.NUMBER == tipo.tipo){
                tipovalor="number";
            }else if(Tipo.STRING == tipo.tipo){
                tipovalor="string";
            }else if(Tipo.TYPE == tipo.tipo){
                tipovalor="type: "+ tipo.cadTipo;
            }
            let bandera=false;
            for(let nodo of L_Simbs){
                if(nodo.id==id){
                    bandera=true;
                    break;
                }
            }
            if(!bandera){
                L_Simbs.push(new N_Simbolo(tipodevariable,id,tipovalor,valor,""));
            }
           
        }
    }

    public obtenervar(id: string) : Simbolo | undefined | null{
        let env : Entorno | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    } 

    public eliminarvar(id:string){
        let env : Entorno | null = this;
        //verificacion si existe en el mismo entorno
        if(env.variables.has(id)){
            env.variables.delete(id);
        }
    }

    public guardarfuncion(id: string, funcion : Funcion, line : number, column: number){
        let env : Entorno | null = this;
        while(env != null){
            if(env.funciones.has(id)){
                //Ya existe entonces no insertamos
                throw new N_Error('Semantico','La funcion ya existe: '+id,'', line, column);
            }
            env = env.anterior;
        }
        this.funciones.set(id, funcion);
        let tipodevariable="    ";
        let tipovalor="funcion";
        L_Simbs.push(new N_Simbolo(tipodevariable,id,tipovalor,"","global"));
    }

    public obtenerfuncion(id: string): Funcion | undefined | null{
        let env : Entorno | null = this;
        while(env != null){
            if(env.funciones.has(id)){
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return null;

    }

    public obtenerarray(id: string):C_Array|null|undefined{
        let env : Entorno | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id)?.cuerpoarray;
            }
            env = env.anterior;
        }
        return null;
    }

    public obtenertype(id: string):null| undefined| Simbolo{
        let env : Entorno | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
}