import { Component, OnInit } from '@angular/core';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Ev_Ejecutar(){
    console.log("Funciona boton ejecutar");

  }
  Ev_Traducir(){
    console.log("Funciona boton traducir");
  }
  
}
