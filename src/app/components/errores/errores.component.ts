import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
//Librerias
import { L_Errores } from "../../../../Backend/build/Errores/L_Error";
@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.css']
})
export class ErroresComponent implements OnInit {

  constructor(public router: Router) {
   }

  ngOnInit(): void {
  }
  
  Ev_Mostrar(){
    let table = document.querySelector("table");
    let pos =1;
    for (let element of L_Errores) {
      let row = table.insertRow();
      //Numero
      let cell = row.insertCell();
      let text = document.createTextNode(pos.toString());
      cell.appendChild(text);
      //Lo demas
      for (let key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      pos++;
    }
  }
  Ev_Regresar(){
    this.router.navigate(['/']);
  }
}
