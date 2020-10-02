import { Expresion } from "../Abstracto/Expresion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { N_Error } from "../Errores/N_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";
import { L_Errores } from "../Errores/L_Error";

export class Case {
    constructor(public id:Expresion, public cuerpo:Array<Instruccion>){}
}
export class SwitchCase extends Instruccion{

    constructor(private condicion : Expresion, private casos : Array<Case>, private vdefault:Array<Instruccion>, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        const condicion = this.condicion.ejecutar(entorno);
        let banderadefault=false;
        for(const nodovalor of this.casos){
            let resultadoid=nodovalor.id.ejecutar(entorno);
            let bamderabreak=false;
            if(resultadoid.valor==condicion.valor){
                //ejecutamos instrucciones
                const nuevoentorno = new Entorno(entorno);
                for(const instr of nodovalor.cuerpo){
                    try {
                        const result = instr.ejecutar(nuevoentorno);
                        //validamos break
                        if(result != undefined || result != null){
                            if(result.tipobyc == "break"){
                                bamderabreak=true;
                                break;
                            }else{
                                return result;
                            }
                        }               
                    } catch (err) {
                        L_Errores.push(err);
                    }
                }
                banderadefault=true;
            }
            if(bamderabreak){
                break;
            }
        }
        //sino cumple 
        if(!banderadefault){
            if(this.vdefault!=null){
                const nuevoentorno = new Entorno(entorno);
                for(const instr of this.vdefault){
                    try {
                        const result = instr.ejecutar(nuevoentorno);
                        if(result != undefined || result != null)
                            return result;                
                    } catch (err) {
                        L_Errores.push(err);
                    }
                }
            }else{
                throw new N_Error('Semantico','El id del case no exite'+condicion.valor,'', this.linea, this.columna);
            }
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Switch\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        let result:N_Ast;
        //Seccion Condicion
        Cadena += (ast.posdes+1)+" [label =\"Condicion\"];\n";
        Cadena += ast.posdes+" -> "+(ast.posdes+1)+";\n";
        result=this.condicion.ejecutarast({posant:ast.posdes+1, posdes:ast.posdes+2,cadena:Cadena});
        //Seccion Codigo
        result={posant:ast.posdes, posdes:result.posdes,cadena:result.cadena};
        for(const nodovalor of this.casos){
            result.cadena += result.posdes+" [label =\"Case\"];\n";
            result.cadena += result.posant+" -> "+result.posdes+";\n";
            let result2={posant:result.posant, posdes:result.posdes+1,cadena:result.cadena}
            //Expresion
            result=nodovalor.id.ejecutarast({posant:result.posant, posdes:result.posdes+1,cadena:result.cadena});

            //Instrucciones
            result.cadena += result.posdes+" [label =\"Instrucciones\"];\n";
            result.cadena += result2.posant+" -> "+result.posdes+";\n";
            result={posant:result.posdes, posdes:result.posdes+1,cadena:result.cadena}
            //Seccion de items de array
            for(const instr of nodovalor.cuerpo){
                let temresult = instr.ejecutarast(result);
                result.posdes=temresult.posdes;
                result.cadena=temresult.cadena;
            }
            result.cadena += result.posdes+" [label =\"Mas Casos\"];\n";
            result.cadena += result2.posant+" -> "+result.posdes+";\n";
            result={posant:result.posdes, posdes:result.posdes+1,cadena:result.cadena}
        }
        
        if(this.vdefault!=null){
            result.cadena += result.posdes+" [label =\"Default\"];\n";
            result.cadena += result.posant+" -> "+result.posdes+";\n";
            result={posant:result.posant, posdes:result.posdes+1,cadena:result.cadena}
            //Seccion de items de array
            for(const instr of this.vdefault){
                let temresult = instr.ejecutarast(result);
                result.posdes=temresult.posdes;
                result.cadena=temresult.cadena;
            }
        }

        return result;
    }
}