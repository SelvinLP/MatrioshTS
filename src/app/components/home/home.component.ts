import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { L_Errores } from "../../../../Backend/build/Errores/L_Error";
import { L_Simbs } from "../../../../Backend/build/Otros/L_Simb";
import { N_Error } from "../../../../Backend/build/Errores/N_Error";
import { N_Ast } from "../../../../Backend/build/Ast/Ast";
import { L_Print } from "../../../../Backend/build/Otros/L_Print";
import { Entorno } from "../../../../Backend/build/Entorno/Entorno";
import Parser from "../../../../Backend/Gramatica/Gramatica";

import { graphviz }  from 'd3-graphviz';
import { wasmFolder } from "@hpcc-js/wasm";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {}

  Entrada="";
  Salida="";
  Consola="";
  CadenaGraphviz="";
  ast;

  options: any = {
    lineNumbers: true,
    theme:'mbo',
    lineWrapping: false,
    indentWithTabs: true,
    mode: 'javascript',
    styleActiveLine: true,
  };

  Ev_Traducir(){
    this.Salida=this.Entrada
    this.Consola="";
    const entorno = new Entorno(null);
    L_Errores.splice(0,L_Errores.length);
    L_Print.splice(0,L_Print.length);
    L_Simbs.splice(0,L_Simbs.length);

    this.ast=Parser.parse(this.Salida);

  }

  Ev_Ejecutar(){
    this.Consola="";
    const entorno = new Entorno(null);
    L_Errores.splice(0,L_Errores.length);
    L_Print.splice(0,L_Print.length);
    L_Simbs.splice(0,L_Simbs.length);

    this.ast=Parser.parse(this.Salida);
    for(const Instruccion of this.ast){
        try {
          const valor=Instruccion.ejecutar(entorno);
          if(valor != null || valor != undefined){
            if(valor.tipobyc == "continue"){
              L_Errores.push(new N_Error('Semantico','Instruccion continue fuera de un ciclo','', valor.linea,valor.columna));
            }else if(valor.tipobyc == "break"){
              L_Errores.push(new N_Error('Semantico','Instruccion break fuera de un ciclo','', valor.linea,valor.columna));
            }else if(valor.tipobyc == "retornonulo"){
              L_Errores.push(new N_Error('Semantico','Instruccion return fuera de una funcion','', valor.linea,valor.columna));
            }
        }
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
    this.CadenaGraphviz = "digraph AST {\n rankdir=TB;\n node[shape=record,style=filled];\n";
    this.CadenaGraphviz+="1 [label =\"Inicio\"]; ";
    let inicio:N_Ast ={posant:1, posdes:2, cadena:""};
    let cadenainst:N_Ast;
    for(const Instruccion of this.ast){
      cadenainst= Instruccion.ejecutarast(inicio);
      inicio.posdes=cadenainst.posdes;
      inicio.cadena=cadenainst.cadena;
    }
    this.CadenaGraphviz+=cadenainst.cadena;
    this.CadenaGraphviz+="}";
    //console.log(this.CadenaGraphviz);
    wasmFolder('assets/');
    graphviz('body').renderDot(this.CadenaGraphviz);
  }
  
  Ev_Simbolos(){
    this.router.navigate(['/simb']);
    wasmFolder('assets/');
    graphviz('body').renderDot('digraph AST {}');
  }
  
  Ev_Errores(){
    this.router.navigate(['/errores']);
    wasmFolder('assets/');
    graphviz('body').renderDot('digraph AST {}');
  }

}
