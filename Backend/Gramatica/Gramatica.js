/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var Gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,11],$V1=[1,13],$V2=[1,12],$V3=[1,15],$V4=[1,16],$V5=[1,17],$V6=[1,18],$V7=[1,19],$V8=[5,14,15,19,28,31,35,36,37,39],$V9=[1,33],$Va=[18,25],$Vb=[2,17],$Vc=[1,36],$Vd=[1,51],$Ve=[1,39],$Vf=[1,45],$Vg=[1,44],$Vh=[1,46],$Vi=[1,47],$Vj=[1,48],$Vk=[1,49],$Vl=[1,50],$Vm=[2,19],$Vn=[1,61],$Vo=[1,68],$Vp=[1,69],$Vq=[1,70],$Vr=[1,71],$Vs=[1,72],$Vt=[1,73],$Vu=[1,74],$Vv=[1,75],$Vw=[1,76],$Vx=[1,77],$Vy=[1,78],$Vz=[1,79],$VA=[1,80],$VB=[1,81],$VC=[18,30,44,45,46,47,48,49,50,51,52,53,54,55,56,57],$VD=[5,14,15,19,28,31,34,35,36,37,39],$VE=[18,30,44,45,50,51,52,53,54,55,56,57],$VF=[18,30,44,45,46,47,50,51,52,53,54,55,56,57],$VG=[18,30,54,55,56,57];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"LInstrucciones":4,"EOF":5,"Instruccion":6,"Declaracion":7,"Asignacion":8,"Impresion":9,"Ift":10,"Whilet":11,"Dowhilet":12,"Funciones":13,"tk_let":14,"tk_id":15,"Tipodeclaracion":16,"PosibleAsignacion":17,";":18,"tk_const":19,":":20,"tk_number":21,"tk_string":22,"tk_boolean":23,"tk_void":24,"=":25,"Expresion":26,"Incydec":27,"tk_console":28,"(":29,")":30,"tk_if":31,"Cuerpo":32,"Elset":33,"tk_else":34,"tk_while":35,"tk_do":36,"tk_function":37,"{":38,"}":39,"E_aritmetica":40,"E_relacional":41,"E_logica":42,"Factor":43,"+":44,"-":45,"*":46,"/":47,"**":48,"%":49,">":50,"<":51,">=":52,"<=":53,"==":54,"!=":55,"&&":56,"||":57,"!":58,"tk_entero":59,"tk_decimal":60,"tk_cadena":61,"tk_bool":62,"++":63,"--":64,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"tk_let",15:"tk_id",18:";",19:"tk_const",20:":",21:"tk_number",22:"tk_string",23:"tk_boolean",24:"tk_void",25:"=",28:"tk_console",29:"(",30:")",31:"tk_if",34:"tk_else",35:"tk_while",36:"tk_do",37:"tk_function",38:"{",39:"}",44:"+",45:"-",46:"*",47:"/",48:"**",49:"%",50:">",51:"<",52:">=",53:"<=",54:"==",55:"!=",56:"&&",57:"||",58:"!",59:"tk_entero",60:"tk_decimal",61:"tk_cadena",62:"tk_bool",63:"++",64:"--"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[7,5],[7,5],[16,2],[16,2],[16,2],[16,2],[16,0],[17,2],[17,0],[8,4],[8,2],[9,5],[10,6],[33,2],[33,2],[33,0],[11,5],[12,7],[13,5],[13,4],[32,3],[32,2],[26,3],[26,1],[26,1],[26,1],[26,1],[40,3],[40,3],[40,3],[40,3],[40,3],[40,3],[40,2],[40,2],[41,3],[41,3],[41,3],[41,3],[41,3],[41,3],[42,3],[42,3],[42,2],[43,1],[43,1],[43,1],[43,1],[43,1],[27,2],[27,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:
$$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3:
this.$ = [$$[$0]];
break;
case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 18: case 24: case 25: case 34: case 35: case 36: case 37:
this.$=$$[$0];
break;
case 11:

        this.$ = new Declaracion(TipoDato.LET, $$[$0-3], $$[$0-2], $$[$0-1], _$[$0-4].first_line, _$[$0-4].first_column);
    
break;
case 12:

        this.$ = new Declaracion(TipoDato.CONST, $$[$0-3], $$[$0-2], $$[$0-1], _$[$0-4].first_line, _$[$0-4].first_column);
    
break;
case 13:
this.$=Tipo.NUMBER
break;
case 14:
this.$=Tipo.STRING
break;
case 15:
this.$=Tipo.BOOLEAN
break;
case 16:
this.$=Tipo.NULL
break;
case 20:

        this.$ = new Asignacion($$[$0-3], $$[$0-1], null, _$[$0-3].first_line, _$[$0-3].first_column);
    
break;
case 21:

        this.$=$$[$0-1];
    
break;
case 22:

        this.$ = new Imprimir($$[$0-2], _$[$0-4].first_line, _$[$0-4].first_column);
    
break;
case 23:

        this.$ = new Ifelse($$[$0-3], $$[$0-1], $$[$0], _$[$0-5].first_line, _$[$0-5].first_column);
    
break;
case 27:

        this.$ = new While($$[$0-2], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column);
    
break;
case 28:

        this.$ = new Dowhile($$[$0-2], $$[$0-5], _$[$0-6].first_line, _$[$0-6].first_column);
    
break;
case 29:

        this.$ = new Funcion($$[$0-3], [], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column);
    
break;
case 30:

        this.$ = new Llamarfuncion($$[$0-3], [], _$[$0-3].first_line, _$[$0-3].first_column);
    
break;
case 31:

        this.$ = new Statement($$[$0-1], _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 32:

        this.$ = new Statement(new Array(), _$[$0-1].first_line, _$[$0-1].first_column);
    
break;
case 33:
this.$=$$[$0-1];
break;
case 38:

        this.$ = new Aritmetica($$[$0-2], $$[$0], TipoAritmetico.MAS, _$[$0-2].first_line,_$[$0-2].first_column);
    
break;
case 39:

        this.$ = new Aritmetica($$[$0-2], $$[$0], TipoAritmetico.MENOS, _$[$0-2].first_line,_$[$0-2].first_column);
    
break;
case 40:

        this.$ = new Aritmetica($$[$0-2], $$[$0], TipoAritmetico.MULT, _$[$0-2].first_line,_$[$0-2].first_column);
    
break;
case 41:

        this.$ = new Aritmetica($$[$0-2], $$[$0], TipoAritmetico.DIV, _$[$0-2].first_line,_$[$0-2].first_column);
    
break;
case 42:

        this.$ = new Aritmetica($$[$0-2], $$[$0], TipoAritmetico.POT, _$[$0-2].first_line,_$[$0-2].first_column);
    
break;
case 43:

        this.$ = new Aritmetica($$[$0-2], $$[$0], TipoAritmetico.MOD, _$[$0-2].first_line,_$[$0-2].first_column);
    
break;
case 44:

        this.$ = new Aritmetica($$[$0], null, TipoAritmetico.UMENOS, _$[$0-1].first_line,_$[$0-1].first_column);
    
break;
case 45:

        this.$ = new Aritmetica($$[$0], null, TipoAritmetico.UMAS, _$[$0-1].first_line,_$[$0-1].first_column);
    
break;
case 46:

        this.$ = new Relacional($$[$0-2], $$[$0],TipoRelacional.MAYORQUE, _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 47:

        this.$ = new Relacional($$[$0-2], $$[$0],TipoRelacional.MENORQUE, _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 48:

        this.$ = new Relacional($$[$0-2], $$[$0],TipoRelacional.MAYORIGUAL, _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 49:

        this.$ = new Relacional($$[$0-2], $$[$0],TipoRelacional.MENORIGUAL, _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 50:

        this.$ = new Relacional($$[$0-2], $$[$0],TipoRelacional.IGUAL, _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 51:

        this.$ = new Relacional($$[$0-2], $$[$0],TipoRelacional.DIFERENCIA, _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 52:

        this.$ = new Logica($$[$0-2], $$[$0],TipoLogica.AND, _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 53:

        this.$ = new Logica($$[$0-2], $$[$0],TipoLogica.OR, _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 54:

        this.$ = new Logica($$[$0], null,TipoLogica.NOT, _$[$0-1].first_line, _$[$0-1].first_column);
    
break;
case 55: case 56:
 
        this.$ = new Literal($$[$0], _$[$0].first_line, _$[$0].first_column, 0);
    
break;
case 57:

        this.$ = new Literal($$[$0].replace(/\"|\'/g,""), _$[$0].first_line, _$[$0].first_column, 1);
    
break;
case 58:
 
        this.$ = new Literal($$[$0], _$[$0].first_line, _$[$0].first_column, 2);
    
break;
case 59:

        this.$ = new Id($$[$0], _$[$0].first_line, _$[$0].first_column);
    
break;
case 60:

        this.$ = new Asignacion($$[$0-1], null, TipoAritmetico.INC,_$[$0-1].first_line, _$[$0-1].first_column);
    
break;
case 61:

        this.$ = new Asignacion($$[$0-1], null, TipoAritmetico.DEC, _$[$0-1].first_line, _$[$0-1].first_column);
    
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,19:$V2,27:14,28:$V3,31:$V4,35:$V5,36:$V6,37:$V7},{1:[3]},{5:[1,20],6:21,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,19:$V2,27:14,28:$V3,31:$V4,35:$V5,36:$V6,37:$V7},o($V8,[2,3]),o($V8,[2,4]),o($V8,[2,5]),o($V8,[2,6]),o($V8,[2,7]),o($V8,[2,8]),o($V8,[2,9]),o($V8,[2,10]),{15:[1,22]},{15:[1,23]},{25:[1,24],29:[1,25],63:[1,26],64:[1,27]},{18:[1,28]},{29:[1,29]},{29:[1,30]},{29:[1,31]},{32:32,38:$V9},{15:[1,34]},{1:[2,1]},o($V8,[2,2]),o($Va,$Vb,{16:35,20:$Vc}),o($Va,$Vb,{16:37,20:$Vc}),{15:$Vd,26:38,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{30:[1,52]},{18:[2,60]},{18:[2,61]},o($V8,[2,21]),{15:$Vd,26:53,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:54,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:55,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{35:[1,56]},{4:57,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,19:$V2,27:14,28:$V3,31:$V4,35:$V5,36:$V6,37:$V7,39:[1,58]},{29:[1,59]},{17:60,18:$Vm,25:$Vn},{21:[1,62],22:[1,63],23:[1,64],24:[1,65]},{17:66,18:$Vm,25:$Vn},{18:[1,67],44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx,54:$Vy,55:$Vz,56:$VA,57:$VB},{15:$Vd,26:82,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},o($VC,[2,34]),o($VC,[2,35]),o($VC,[2,36]),o($VC,[2,37]),{15:$Vd,26:83,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:84,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:85,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},o($VC,[2,55]),o($VC,[2,56]),o($VC,[2,57]),o($VC,[2,58]),o($VC,[2,59]),{18:[1,86]},{30:[1,87],44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx,54:$Vy,55:$Vz,56:$VA,57:$VB},{30:[1,88],44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx,54:$Vy,55:$Vz,56:$VA,57:$VB},{30:[1,89],44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx,54:$Vy,55:$Vz,56:$VA,57:$VB},{29:[1,90]},{6:21,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,19:$V2,27:14,28:$V3,31:$V4,35:$V5,36:$V6,37:$V7,39:[1,91]},o($VD,[2,32]),{30:[1,92]},{18:[1,93]},{15:$Vd,26:94,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},o($Va,[2,13]),o($Va,[2,14]),o($Va,[2,15]),o($Va,[2,16]),{18:[1,95]},o($V8,[2,20]),{15:$Vd,26:96,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:97,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:98,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:99,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:100,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:101,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:102,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:103,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:104,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:105,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:106,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:107,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:108,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{15:$Vd,26:109,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},{30:[1,110],44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx,54:$Vy,55:$Vz,56:$VA,57:$VB},o($VC,[2,44]),o($VC,[2,45]),o($VC,[2,54]),o($V8,[2,30]),{18:[1,111]},{32:112,38:$V9},{32:113,38:$V9},{15:$Vd,26:114,29:$Ve,40:40,41:41,42:42,43:43,44:$Vf,45:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl},o($VD,[2,31]),{32:115,38:$V9},o($V8,[2,11]),{18:[2,18],44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx,54:$Vy,55:$Vz,56:$VA,57:$VB},o($V8,[2,12]),o($VE,[2,38],{46:$Vq,47:$Vr,48:$Vs,49:$Vt}),o($VE,[2,39],{46:$Vq,47:$Vr,48:$Vs,49:$Vt}),o($VF,[2,40],{48:$Vs,49:$Vt}),o($VF,[2,41],{48:$Vs,49:$Vt}),o($VC,[2,42]),o($VC,[2,43]),o($VG,[2,46],{44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt}),o($VG,[2,47],{44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt}),o($VG,[2,48],{44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt}),o($VG,[2,49],{44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt}),o($VG,[2,50],{44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx}),o($VG,[2,51],{44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx}),o([18,30,56,57],[2,52],{44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx,54:$Vy,55:$Vz}),o([18,30,57],[2,53],{44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx,54:$Vy,55:$Vz,56:$VA}),o($VC,[2,33]),o($V8,[2,22]),o($V8,[2,26],{33:116,34:[1,117]}),o($V8,[2,27]),{30:[1,118],44:$Vo,45:$Vp,46:$Vq,47:$Vr,48:$Vs,49:$Vt,50:$Vu,51:$Vv,52:$Vw,53:$Vx,54:$Vy,55:$Vz,56:$VA,57:$VB},o($V8,[2,29]),o($V8,[2,23]),{10:120,31:$V4,32:119,38:$V9},{18:[1,121]},o($V8,[2,24]),o($V8,[2,25]),o($V8,[2,28])],
defaultActions: {20:[2,1],26:[2,60],27:[2,61]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const CL_Error = require('../build/Errores/L_Error');
    const CN_Error = require('../build/Errores/N_Error');
    const {TipoDato, Tipo, TipoAritmetico, TipoRelacional, TipoLogica} = require('../build/Abstracto/Retorno');
    const {Literal} = require('../build/Expresiones/Literal');
    const {Aritmetica} = require('../build/Expresiones/Aritmetica');
    const {Relacional} = require('../build/Expresiones/Relacional');
    const {Logica} = require('../build/Expresiones/Logica');
    const {Imprimir} = require('../build/Instrucciones/Imprimir');
    const {Ifelse} = require('../build/Instrucciones/Ifelse');
    const {While} = require('../build/Instrucciones/While');
    const {Dowhile} = require('../build/Instrucciones/Dowhile');
    const {Declaracion} = require('../build/Instrucciones/Declaracion');
    const {Asignacion} = require('../build/Instrucciones/Asignacion');
    const {Statement} = require('../build/Instrucciones/Statement');
    const {Id} = require('../build/Expresiones/Id');
    const {Funcion} = require('../build/Instrucciones/Funcion');
    const {Llamarfuncion} = require('../build/Instrucciones/Llamarfuncion');
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/*Comentario de una*/
break;
case 1:/*Comentario multilinea*/
break;
case 2:return 14
break;
case 3:return 19
break;
case 4:return 22
break;
case 5:return 21
break;
case 6:return 23
break;
case 7:return 24
break;
case 8:return 31
break;
case 9:return 34
break;
case 10:return 'tk_switch'
break;
case 11:return 'tk_case'
break;
case 12:return 'tk_default'
break;
case 13:return 35
break;
case 14:return 36
break;
case 15:return 'tk_for'
break;
case 16:return 'tk_continue'
break;
case 17:return 'tk_return'
break;
case 18:return 'tk_break'
break;
case 19:return 37
break;
case 20:return 28
break;
case 21:return 54
break;
case 22:return 55
break;
case 23:return 52
break;
case 24:return 50
break;
case 25:return 53
break;
case 26:return 51 
break;
case 27:return 56
break;
case 28:return 57
break;
case 29:return 58
break;
case 30:return 63
break;
case 31:return 64
break;
case 32:return 38
break;
case 33:return 39
break;
case 34:return 18
break;
case 35:return 25
break;
case 36:return 29
break;
case 37:return 30
break;
case 38:return ','
break;
case 39:return 20
break;
case 40:return '.'
break;
case 41:return 62
break;
case 42:return 60
break;
case 43:return 59
break;
case 44:return 61
break;
case 45:return 15;
break;
case 46:return 48
break;
case 47:return 44
break;
case 48:return 45
break;
case 49:return 46
break;
case 50:return 47
break;
case 51:return 49
break;
case 52: /*se ignoran*/ 
break;
case 53:  return 5;   
break;
case 54:CL_Error.L_Errores.push(new CN_Error.N_Error("Lexico",yy_.yytext,yy_.yylineno,yy_.yylloc.first_column))
break;
}
},
rules: [/^(?:(\/\/.*\r\n)|(\/\/.*\n)|(\/\/.*\r))/,/^(?:\/\*\/*([^*/]|[^*]\/|\*[^/])*\**\*\/)/,/^(?:let\b)/,/^(?:const\b)/,/^(?:string\b)/,/^(?:number\b)/,/^(?:boolean\b)/,/^(?:void\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:for\b)/,/^(?:continue\b)/,/^(?:return\b)/,/^(?:break\b)/,/^(?:function\b)/,/^(?:console\.log\b)/,/^(?:==)/,/^(?:!=)/,/^(?:>=)/,/^(?:>)/,/^(?:<=)/,/^(?:<)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\{)/,/^(?:\})/,/^(?:;)/,/^(?:=)/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?::)/,/^(?:\.)/,/^(?:true|false\b)/,/^(?:[0-9]+\.[0-9]+)/,/^(?:[0-9]+)/,/^(?:[\"|\']([^\"\n]|(\\"))*[\"|\'])/,/^(?:([a-zA-Z])[a-zA-Z0-9_ñÑ]*)/,/^(?:\*\*)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:[ \t\r\n\f])/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = Gramatica;
exports.Parser = Gramatica.Parser;
exports.parse = function () { return Gramatica.parse.apply(Gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}