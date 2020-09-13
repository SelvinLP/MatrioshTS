import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { graphviz }  from 'd3-graphviz';
import { wasmFolder } from "@hpcc-js/wasm";

import { L_Errores } from "../../../../Backend/build/Errores/L_Error";
import { L_Print } from "../../../../Backend/build/Otros/L_Print";
import { Entorno } from "../../../../Backend/build/Entorno/Entorno";
import Parser from "../../../../Backend/Gramatica/Gramatica";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {}
  Entrada="";
  Salida="let hola=12; \n$console.log(hola);";
  Consola="";
  options: any = {
    lineNumbers: true,
    theme:'mbo',
    lineWrapping: false,
    indentWithTabs: true,
    mode: 'javascript',
    styleActiveLine: true,
  };

  Ev_Traducir(){
    console.log("Funciona boton traducir");
  }

  Ev_Ejecutar(){
    this.Consola="";
    const entorno = new Entorno(null);
    L_Errores.splice(0,L_Errores.length);
    L_Print.splice(0,L_Print.length)

    var ast=Parser.parse(this.Salida);
    for(const Instruccion of ast){
        try {
          Instruccion.ejecutar(entorno);
        } catch (err) {
          L_Errores.push(err);  
        }
    }
    this.Inst_Print();
  }

  Inst_Print(){
    //Intrucciones de Imprimir
    for (let ptr of L_Print) {
      try {
        this.Consola += ptr +'\n';
      } catch (err) {
        L_Errores.push(err);  
      }
    }
  }

  Ev_Ast(){
    this.router.navigate(['/ast']);
  }
  
  Ev_Errores(){
    this.router.navigate(['/errores']);
  }

}
