import { Instruccion } from "../Abstracto/Instruccion";
import { L_Errores } from "../Errores/L_Error";
import { Entorno } from "../Entorno/Entorno";
import { N_Ast } from "../Ast/Ast";

export class Statement extends Instruccion{

    constructor(private code : Array<Instruccion>, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno:Entorno) {
        const nuevoentorno = new Entorno(entorno);
        for(const instr of this.code){
            try {
                const result = instr.ejecutar(nuevoentorno);
                if(result != undefined || result != null)
                    return result;                
            } catch (err) {
                L_Errores.push(err);
            }
        }
    }

    public ejecutarast(ast:N_Ast):N_Ast{
        let Cadena:string=ast.cadena+"\n";
        Cadena += ast.posdes+" [label =\"Instrucciones\"];\n";
        Cadena += ast.posant+" -> "+ast.posdes+";\n";
        //Seccion de items de array
        let result:N_Ast = {posant:ast.posdes, posdes:ast.posdes+1,cadena:Cadena};
        for(const instr of this.code){
            let temresult = instr.ejecutarast(result);
            result.posdes=temresult.posdes;
            result.cadena=temresult.cadena;
        }

        return result;
    }
}