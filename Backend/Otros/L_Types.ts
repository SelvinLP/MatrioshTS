import { N_Error } from "../Errores/N_Error";
import { N_Tipo } from "./N_Tipo";
import { Tipo } from "../Abstracto/Retorno";
 
export class N_Type{
    constructor(public idpara:string, public tipo:N_Tipo){
    }
}

export class L_type{
    
    private lista_types : Map<string,Array<N_Type>>;

    constructor(){
        this.lista_types = new Map();
    }

    public guardartype(id:string, ltype:Array<N_Type>,line : number, column : number ){
        //verificacion si existe 
        if(this.lista_types.has(id)){
            throw new N_Error('Semantico','El type ya existe: '+id,'', line, column);
        }else{
            //sino se cumple lo guarda
            let cont=0; 
            //Verificacion de repetidos
            for(const tem of ltype){
                for(const tem2 of ltype){
                    if(tem.idpara ==tem2.idpara){
                        cont++;
                    }
                }
                if(cont>=2){
                    throw new N_Error('Semantico','El parametro '+tem.idpara+' en el type ya existe','', line, column);
                }else if(tem.tipo.tipo == Tipo.TYPE && !(this.lista_types.has(tem.idpara) || tem.tipo.cadTipo == id)){
                    throw new N_Error('Semantico','El el tipo del parametro '+tem.idpara+' no existe '+id,'', line, column);
                }
                cont=0;
            }
            //verificaion de id por si es type sino error
            for(const tem of ltype){
                console.log(tem.idpara+"--"+tem.tipo.tipo);
            }
            for(const tem of ltype){
                console.log(this.lista_types.has(id));
            }
            this.lista_types.set(id, ltype);
        }
    }

}