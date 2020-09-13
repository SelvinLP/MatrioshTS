import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { graphviz }  from 'd3-graphviz';
import { wasmFolder } from "@hpcc-js/wasm";

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class AstComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  Ev_Mostrar(){
    wasmFolder('/assets/@hpcc-js/wasm/dist/');
    graphviz('body').renderDot('digraph {a -> c; c-> d}');
  }
  Ev_Regresar(){
    this.router.navigate(['/']);
  }
}
