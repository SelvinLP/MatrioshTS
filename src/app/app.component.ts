import { Component } from '@angular/core';
declare var variableName:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MatrioshTS';

  Ev_Ejecutar(){
    console.log("Funciona boton ejecutar");

  }
  Ev_Traducir(){
    console.log("Funciona boton traducir");
  }
}
