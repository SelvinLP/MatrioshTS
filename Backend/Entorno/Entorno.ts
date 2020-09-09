import { Tipo, TipoDato } from "../Abstracto/Retorno";
import { Simbolo } from "./Simbolo";
import { Expresion } from "../Abstracto/Expresion";
import { N_Error } from "../Errores/N_Error";

export class Entorno{
    
    private variables : Map<string,Simbolo>;

    constructor(public anterior : Entorno | null){
        this.variables = new Map();
    }

    public guardarvar(letoconst: TipoDato,id: string, valor: any, tipo: Tipo, line : number, column: number){

        let env : Entorno | null = this;
        while(env != null){
            if(env.variables.has(id)){
                //Ya existe entonces no insertamos
                throw new N_Error('Semantico','La variable ya existe: '+id, line, column);
                break;
            }
            env = env.anterior;
        }
        //sino se cumple lo guarda en el entorno actual
        this.variables.set(id, new Simbolo(letoconst,id, tipo, valor));
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


}