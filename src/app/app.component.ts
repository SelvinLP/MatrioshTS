import { Component } from '@angular/core';
import { L_Errores } from "../../Backend/build/Errores/L_Error";
import Parser from "../../Backend/Gramatica/Gramatica";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MatrioshTS';
  Entrada="";
  Salida="console.log(2*2+2);";
  options: any = {
    lineNumbers: true,
    theme:'mbo',
    lineWrapping : true,
    indentWithTabs: true,
    mode: 'javascript',
    styleActiveLine: true,
  };

  Ev_Traducir(){
    console.log("Funciona boton traducir");
  }
  Ev_Ejecutar(){
    L_Errores.splice(0,L_Errores.length)
    var ast=Parser.parse(this.Salida);
    console.log("--------------------------------- Instrucciones ---------------------------------");
    for(const Instruccion of ast){
        try {
            Instruccion.ejecutar();
        } catch (err) {
            L_Errores.push(err);  
        }
    }
    
    console.log("--------------------------------- Lista de Errores ---------------------------------");
    console.log(L_Errores);

  }
}
