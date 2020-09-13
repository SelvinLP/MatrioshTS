import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ErroresComponent } from './components/errores/errores.component';
import { HomeComponent } from './components/home/home.component';
import { AstComponent } from './components/ast/ast.component';


@NgModule({
  declarations: [
    AppComponent,
    ErroresComponent,
    HomeComponent,
    AstComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CodemirrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
