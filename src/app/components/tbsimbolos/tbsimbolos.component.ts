import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
//Librerias
import { L_Simbs } from "../../../../Backend/build/Otros/L_Simb";
@Component({
  selector: 'app-tbsimbolos',
  templateUrl: './tbsimbolos.component.html',
  styleUrls: ['./tbsimbolos.component.css']
})
export class TbsimbolosComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
Ev_Mostrar(){
    //

    let table = document.querySelector("table");
    let pos =1;
    for (let element of L_Simbs) {
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
