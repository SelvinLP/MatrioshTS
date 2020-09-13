"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var d3_graphviz_1 = require("d3-graphviz");
var wasm_1 = require("@hpcc-js/wasm");
var L_Error_1 = require("../../../../Backend/build/Errores/L_Error");
var Entorno_1 = require("../../../../Backend/build/Entorno/Entorno");
var Gramatica_1 = __importDefault(require("../../../../Backend/Gramatica/Gramatica"));
var HomeComponent = /** @class */ (function () {
    function HomeComponent(router) {
        this.router = router;
        this.Entrada = "";
        this.Salida = "let hola=12; \n$console.log(hola);";
        this.Consola = "";
        this.options = {
            lineNumbers: true,
            theme: 'mbo',
            lineWrapping: false,
            indentWithTabs: true,
            mode: 'javascript',
            styleActiveLine: true,
        };
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent.prototype.Ev_Traducir = function () {
        console.log("Funciona boton traducir");
    };
    HomeComponent.prototype.Ev_Ejecutar = function () {
        var entorno = new Entorno_1.Entorno(null);
        L_Error_1.L_Errores.splice(0, L_Error_1.L_Errores.length);
        var ast = Gramatica_1.default.parse(this.Salida);
        console.log("--------------------------------- Instrucciones ---------------------------------");
        for (var _i = 0, ast_1 = ast; _i < ast_1.length; _i++) {
            var Instruccion = ast_1[_i];
            try {
                Instruccion.ejecutar(entorno);
            }
            catch (err) {
                L_Error_1.L_Errores.push(err);
            }
        }
    };
    HomeComponent.prototype.Ev_Ast = function () {
        wasm_1.wasmFolder('/assets/@hpcc-js/wasm/dist/');
        d3_graphviz_1.graphviz('div').renderDot('digraph {a -> c; c-> d}');
    };
    HomeComponent.prototype.Ev_Errores = function () {
        this.router.navigate(['/errores']);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
