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
  Salida="console.log(\"hola\"+2.2/3)_;  \n$console.log(\"no\"+2>=\"no2\");";
  options: any = {
    lineNumbers: true,
    theme:'mbo',
    lineWrapping : true,
    indentWithTabs: true,
    mode: 'javascript',
    styleActiveLine: true,
  };

  Ev_Ejecutar(){
    var ast=Parser.parse("console.log(\"hola\"+2.2/3)_;  \n $console.log(\"no\"+2>=\"no2\");");
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
  Ev_Traducir(){
    console.log("Funciona boton traducir");
  }
}
