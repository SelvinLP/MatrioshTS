import { Instruccion } from "../Abstracto/Instruccion";
import { L_Errores } from "../Errores/L_Error";
import { Entorno } from "../Entorno/Entorno";

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
}