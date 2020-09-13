import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Rutas
import { ErroresComponent } from "./components/errores/errores.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path: 'errores',
    component: ErroresComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
