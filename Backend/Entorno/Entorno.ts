import { Tipo } from "../Abstracto/Retorno";
import { Simbolo } from "./Simbolo";
import { Expresion } from "../Abstracto/Expresion";

export class Entorno{
    
    private variables : Map<string,Simbolo>;

    constructor(public anterior : Entorno | null){
        this.variables = new Map();
    }

    public guardarvar(id: string, valor: Expresion, tipo: Tipo){

        let env : Entorno | null = this;
        let bandera=true;
        while(env != null){
            if(env.variables.has(id)){
                env.variables.set(id, new Simbolo(id, valor, tipo));
                bandera=false;
                break;
            }
            env = env.anterior;
        }
        //sino se cumple lo guarda en el entorno actual
        if(bandera == true){
            this.variables.set(id, new Simbolo(id, valor, tipo));
        }
    }

    public getvar(id: string) : Simbolo | undefined | null{
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