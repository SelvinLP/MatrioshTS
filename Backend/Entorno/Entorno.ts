import { Tipo, TipoDato } from "../Abstracto/Retorno";
import { Simbolo } from "./Simbolo";
import { N_Error } from "../Errores/N_Error";
import { Funcion } from "../Instrucciones/Funcion";

export class Entorno{
    
    private variables : Map<string,Simbolo>;
    public funciones : Map<string, Funcion>;

    constructor(public anterior : Entorno | null){
        this.variables = new Map();
        this.funciones = new Map();
    }

    public guardarvar(letoconst: TipoDato,id: string, valor: any, tipo: Tipo, line : number, column: number){
        let env : Entorno | null = this;
        //verificacion si existe en el mismo entorno
        if(env.variables.has(id)){
            throw new N_Error('Semantico','La variable ya existe: '+id,'', line, column);
        }else{
            //sino se cumple lo guarda en el entorno actual
            this.variables.set(id, new Simbolo(letoconst,id, tipo, valor));
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

}