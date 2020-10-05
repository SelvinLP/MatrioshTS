import { Instruccion } from "../Abstracto/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { Nodo_Vtype } from "./Type";
import { N_Error } from "../Errores/N_Error";


export class AsigType extends Instruccion{

    constructor(private id:string,private valores:Array<Nodo_Vtype> ,line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno ) {
        //buscamos el id 
        let nodoidtype=entorno.obtenertype(this.id);
        if(nodoidtype == null){
            throw new N_Error('Semantico','La variable no existe: '+ this.id,'', this.linea,this.columna);
        }else{
            console.log(this.valores);
            //buscamos id y le asignamos valor
            if(nodoidtype.cuerpotype != null){
                for(const nvalor of nodoidtype.cuerpotype){
                    //for de valores a asignar
                    for(const valores2 of this.valores){
                        if(nvalor.id == valores2.id){
                            try {
                                nvalor.valor=valores2.valor.ejecutar(entorno);
                            } catch (error) {
                                nvalor.valor=valores2.valor;
                            }
                            
                        }
                    }
                }
            }
           
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Asignacion\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast={posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};

        return result;
    }
}
