
%{
    const CL_Error = require('../build/Errores/L_Error');
    const CN_Error = require('../build/Errores/N_Error');
    const {TipoDato, Tipo, TipoAritmetico, TipoRelacional, TipoLogica} = require('../build/Abstracto/Retorno');
    const {Literal} = require('../build/Expresiones/Literal');
    const {Aritmetica} = require('../build/Expresiones/Aritmetica');
    const {Relacional} = require('../build/Expresiones/Relacional');
    const {Logica} = require('../build/Expresiones/Logica');
    const {Opeternario} = require('../build/Expresiones/Opeternario');
    const {Llamarfuncionexp} = require('../build/Expresiones/Llamarfuncionexp');
    const {Imprimir} = require('../build/Instrucciones/Imprimir');
    const {Graficarts} = require('../build/Instrucciones/Graficarts');
    const {Ifelse} = require('../build/Instrucciones/Ifelse');
    const {While} = require('../build/Instrucciones/While');
    const {For} = require('../build/Instrucciones/For/For');
    const {Forin} = require('../build/Instrucciones/For/Forin');
    const {Forof} = require('../build/Instrucciones/For/Forof');
    const {Dowhile} = require('../build/Instrucciones/Dowhile');
    const {Declaracion, N_Declaracion, N_Parametros} = require('../build/Instrucciones/Declaracion');
    const {Asignacion} = require('../build/Instrucciones/Asignacion');
    const {Statement} = require('../build/Instrucciones/Statement');
    const {Id} = require('../build/Expresiones/Id');
    const {Funcion, Parametrofunc} = require('../build/Instrucciones/Funcion');
    const {Llamarfuncion} = require('../build/Instrucciones/Llamarfuncion');
    const {Type, Nodo_Vtype} = require('../build/Instrucciones/Type');
    const {N_Type} = require('../build/Otros/L_Types');
    const {N_Tipo} = require('../build/Otros/N_Tipo');
    const {L_Array} = require('../build/Instrucciones/Array');
    const {AsignacionArray, AsignacionArrayExp, Obtenervalorarray, pushpopcondireccion} = require('../build/Instrucciones/AsignacionArray');
    const {SwitchCase, Case} = require('../build/Instrucciones/SwitchCase');
    const {BreakContinue} = require('../build/Instrucciones/BreakContinue');
    const {Returnt} = require('../build/Instrucciones/Returnt');
    const {AsigType} = require('../build/Instrucciones/AsigType');

%}

/*------------------------------------------------PARTE LEXICA--------------------------------------------------- */
%lex

%%

//Comentarios
\s+											// se ignoran espacios en blanco
"//".*										// comentario de una linea
"/*""/"*([^*/]|[^*]"/"|"*"[^/])*"*"*"*/"  /*Comentario multilinea*/

//Tipos de Datos
"let"               return 'tk_let'
"const"             return 'tk_const'
"string"            return 'tk_string'
"number"            return 'tk_number'
"boolean"           return 'tk_boolean'
"void"              return 'tk_void'
"null"              return 'tk_null'


//Palabras Reservadas
"if"                return 'tk_if'
"else"              return 'tk_else'
"switch"            return 'tk_switch'
"case"              return 'tk_case'
"default"           return 'tk_default'
"while"             return 'tk_while'
"do"                return 'tk_do'
"for"               return 'tk_for'
"continue"          return 'tk_continue'
"return"            return 'tk_return'
"break"             return 'tk_break'
"function"          return 'tk_function'
"console.log"       return 'tk_console'
"graficar_ts"       return 'tk_graficar_ts'
"type"              return 'tk_type'
"Array"             return 'tk_array'
"push"              return 'tk_push'
"pop"               return 'tk_pop'
"length"            return 'tk_length'
"in"                return 'tk_in'
"of"                return 'tk_of'

//Relacionales
"=="    return '=='
"!="    return '!='
">="    return '>='
">"     return '>'
"<="    return '<='
"<"     return '<' 


//Logicas
"&&"    return '&&'
"||"    return '||'
"!"     return '!'

//Unarias de Incremento y Decremento
"++"    return '++'
"--"    return '--'


//Otros
"{"     return '{'
"}"     return '}'
";"     return ';'
"="     return '='
"("     return '('
")"     return ')'
","     return ','
":"     return ':'
"."     return '.'
"["     return '['
"]"     return ']'
"?"     return '?'


//Expresiones Regulares
"true"|"false"                     return 'tk_bool'
[0-9]+"."[0-9]+                    return 'tk_decimal'
[0-9]+                             return 'tk_entero'
[\"|\']([^\"\n]|(\\\"))*[\"|\']    return 'tk_cadena'
([a-zA-Z])[a-zA-Z0-9_ñÑ]*	       return 'tk_id';


//Operaciones Aritmeticas
"**"    return '**'
"+"     return '+'
"-"     return '-'
"*"     return '*'
"/"     return '/'
"%"     return '%'

[ \t\r\n\f]                    %{ /*se ignoran*/ %}

<<EOF>>                        %{  return 'EOF';   %}

.                               {CL_Error.L_Errores.push(new CN_Error.N_Error("Lexico",yytext,"",yylineno,yylloc.first_column));}

/lex
%left '?'
%left '++' '--'
%left '||'
%left '&&'
%left '==', '!='
%nonassoc '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%left '**' '%'
%right '!'



%right UMENOS UMAS

/*------------------------------------------------PARTE SINTACTICA--------------------------------------------------- */

%start START
%% 

START:
    LInstrucciones EOF                  {return $1;}            
;

LInstrucciones:
    LInstrucciones Instruccion          {$1.push($2); $$ = $1;}
    | Instruccion                       {$$ = [$1];}
;

Instruccion:
    Declaracion             {$$=$1;}
    | Graficartst           {$$=$1;}
    | Asignacion            {$$=$1;} 
    | Impresion             {$$=$1;}
    | Ift                   {$$=$1;}
    | Whilet                {$$=$1;}
    | Dowhilet              {$$=$1;}
    | Fort                  {$$=$1;}
    | Forint                {$$=$1;}
    | Foroft                {$$=$1;}
    | BreakyContinue        {$$=$1;}
    | Types                 {$$=$1;}
    | Switcht               {$$=$1;}
    | Funciones             {$$=$1;}
    | Returnt               {$$=$1;}
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en la Instruccion "+yytext,"",this._$.first_line,this._$.first_column));}
;

Graficartst:
    tk_graficar_ts '(' ')' ';'
    {
        $$=new Graficarts(@1.first_line, @1.first_column);
    }
;

Declaracion:
    tk_let tk_id Tipodeclaracion Posiblearray PosibleAsignacion ';'  
    {
        $$ = new Declaracion(TipoDato.LET, $2, $3, $4, $5, @1.first_line, @1.first_column);
    }
    | tk_const tk_id Tipodeclaracion Posiblearray PosibleAsignacion ';'  
    {
        $$ = new Declaracion(TipoDato.CONST, $2, $3, $4, $5, @1.first_line, @1.first_column);
    }
;

Tipodeclaracion:
    ':' tk_number                       {$$ =new N_Tipo(Tipo.NUMBER, $2);}
    | ':' tk_string                     {$$ =new N_Tipo(Tipo.STRING, $2);}
    | ':' tk_boolean                    {$$ =new N_Tipo(Tipo.BOOLEAN, $2);}
    | ':' tk_void                       {$$ =new N_Tipo(Tipo.NULL, $2);}
    | ':' tk_id                         {$$ =new N_Tipo(Tipo.TYPE, $2);}
    | ':' tk_array '<' TipoDato '>'     {$$ =new N_Tipo(Tipo.ARRAY, $4);}
    | %empty                            {$$=null;} 
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error al definir tipo "+yytext,"",this._$.first_line,this._$.first_column))}
;

Posiblearray:
    arrayllaves                         {$$=$1;}
    | %empty                            {$$=null;} 
;

arrayllaves:
    arrayllaves '[' ']'
    {
        let valor=new L_Array(null,$1);
        $$=[valor];
    }
    | '['']'
    {
        $$=[new L_Array(null,null)];
    }  
;

PosibleAsignacion:
    '=' Expresion                       {$$=new N_Declaracion($2, null, null)}
    | '=' '[' Parametros ']'            {$$=new N_Declaracion(null, $3, null)}
    | '=' '{' ValoresTypes '}'          {$$=new N_Declaracion(null, null, $3);}
    | '=' '[' ']'                       {$$=new N_Declaracion(null, null, null)} 
    | %empty                            {$$=null;}
;

Parametros:
    Parametros ',' Expresion
    {
        $1.push($3);
        $$=$1;
    }
    | Expresion
    {
        $$=[$1];
    }
;

Asignacion:
    tk_id '=' Expresion ';'
    {
        $$ = new Asignacion($1, $3, null, @1.first_line, @1.first_column);
    }
    | tk_id '.' tk_push '(' Expresion ')' ';'
    {
        $$ = new AsignacionArray($1, $3, $5, @1.first_line, @1.first_column);
    }
    | tk_id '.' tk_pop '(' ')' ';'
    {
        $$ = new AsignacionArray($1, $3, null, @1.first_line, @1.first_column);
    }
    | tk_id Direccionarray '=' '[' ']' ';'
    {
        $$ = new AsignacionArray($1, $2, "", @1.first_line, @1.first_column);
    }
    | tk_id Direccionarray '=' Expresion ';'
    {
        $$ = new AsignacionArray($1, $2, $4, @1.first_line, @1.first_column);
    }
    | tk_id Direccionarray '.' tk_push '(' Expresion ')' ';'
    {
        $$ = new pushpopcondireccion($1, $2, $4, $6, @1.first_line, @1.first_column);
    }
    | tk_id Direccionarray '.' tk_pop '(' ')' ';'
    {
        $$ = new pushpopcondireccion($1, $2, $4, null, @1.first_line, @1.first_column);
    }
    | tk_id '=' '{' ValoresTypes '}' ';'
    {
        $$ = new AsigType( $1, $4 ,@1.first_line, @1.first_column);
    }
    | Incydec ';'
    {
        $$=$1;
    }
;

ValoresTypes:
    ValoresTypes ',' tk_id ':' Expresion
    {
        $1.push(new Nodo_Vtype($3,$5)); 
        $$ = $1;
    }
    | tk_id ':' Expresion
    {
        let nuevo=new Nodo_Vtype($1,$3);
        $$ = [nuevo];
    }
;

Direccionarray:
    Direccionarray '[' Expresion ']'
    {
        $1.push($3);
        $$=$1;
    }
    | '[' Expresion ']'
    {
        $$=[$2];
    }
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error al definir direccion array "+yytext,"",this._$.first_line,this._$.first_column))}
;

Impresion:
    tk_console '(' Expresion ')' ';'
    {
        $$ = new Imprimir($3, @1.first_line, @1.first_column);
    }
;

Ift:
    tk_if '(' Expresion ')' Cuerpo Elset
    {
        $$ = new Ifelse($3, $5, $6, @1.first_line, @1.first_column);
    }
;

Elset:
    tk_else Cuerpo                  {$$=$2;}
    | tk_else Ift                   {$$=$2;}
    | %empty                        {$$=null;}
;

Whilet:
    tk_while '(' Expresion ')' Cuerpo
    {
        $$ = new While($3, $5, @1.first_line, @1.first_column);
    }
;

Dowhilet:
    tk_do Cuerpo tk_while '(' Expresion ')' ';'
    {
        $$ = new Dowhile($5, $2, @1.first_line, @1.first_column);
    }
;

Fort:
    tk_for '(' Declaracion E_relacional ';' Incydec ')' Cuerpo
    {
        $$ = new For($3, $4, $6, $8, @1.first_line, @1.first_column);
    }
;

Forint:
    tk_for '(' tk_let tk_id tk_in tk_id ')' Cuerpo
    {
        $$ = new Forin(TipoDato.LET, $4, $6, $8, @1.first_line, @1.first_column);
    }
    | tk_for '(' tk_const tk_id tk_in tk_id ')' Cuerpo
    {
        $$ = new Forin(TipoDato.LET, $4, $6, $8, @1.first_line, @1.first_column);
    }
;

Foroft:
    tk_for '(' tk_let tk_id tk_of tk_id ')' Cuerpo
    {
        $$ = new Forof(TipoDato.LET, $4, $6, $8, @1.first_line, @1.first_column);
    }
    | tk_for '(' tk_const tk_id tk_of tk_id ')' Cuerpo
    {
        $$ = new Forof(TipoDato.LET, $4, $6, $8, @1.first_line, @1.first_column);
    }
;

BreakyContinue:
    tk_break ';'                    {$$=new BreakContinue($1, @1.first_line, @1.first_column);}
    | tk_continue ';'               {$$=new BreakContinue($1, @1.first_line, @1.first_column);}
;

Types:
    tk_type tk_id '=' '{' Parametostype'}' ';'
    {
        $$ = new Type($2, $5, @1.first_line, @1.first_column);
    }
;

Parametostype:
    Parametostype ',' tk_id Tipodeclaracion 
    {
        $1.push(new N_Type($3,$4));
        $$=$1;
    }
    }
    | Parametostype ';' tk_id Tipodeclaracion ';'
    {
        $1.push(new N_Type($3,$4));
        $$=$1;
    }
    | tk_id Tipodeclaracion
    {
        $$=[new N_Type($1,$2)];
    }
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en los parametros type "+yytext,"",this._$.first_line,this._$.first_column));}
;

Switcht:
    tk_switch '(' Expresion ')' '{' Casos Posibledefault '}'
    {
        $$= new SwitchCase($3,$6,$7,@1.first_line, @1.first_column);
    }
;

Casos:
    Casos tk_case  Expresion ':' LInstrucciones  
    {
        $1.push(new Case($3,$5));
        $$=$1;
    }
    | Casos tk_case  Expresion ':'
    {
        $1.push(new Case($3,new Array()));
        $$=$1;
    }
    | tk_case  Expresion ':' LInstrucciones 
    {
        $$=[new Case($2,$4)];
    }
    | tk_case  Expresion ':' 
    {
        $$=[new Case($2,new Array())];
    }
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error al definir case "+yytext,"",this._$.first_line,this._$.first_column))}
;

Posibledefault:
    tk_default ':' LInstrucciones 
    {
        $$=$3;
    }
    | %empty                        {$$=null;}
;

Funciones:
    tk_function tk_id '(' ParametrosFucnc ')' Posibleretorno '{' Posiblecuerpo '}'
    {
        $$ = new Funcion($2, $4, $6, $8, @1.first_line, @1.first_column);
    }
    | tk_id '(' PosibleParametrosllamada ')' ';'
    {
        $$ = new Llamarfuncion($1, $3, @1.first_line, @1.first_column);
    }
;

PosibleParametrosllamada:
    Parametros
    {
        $$=$1;
    }
    | %empty                                    {$$=null;}
;

Posibleretorno:
    ':' TipoDato                                {$$=$2}  
    | %empty                                    {$$=null;}
;

ParametrosFucnc:
    tk_id ':' TipoDato Posiblesllavesparafunc MasParametrosFucnc             
    {
        $$=[new Parametrofunc($1,$3,$4,@1.first_line, @1.first_column)];
        $$.push($5);
    }
    | tk_id ':' tk_array '<' TipoDato '>' MasParametrosFucnc             
    {
        $$=[new Parametrofunc($1,$5,"array",@1.first_line, @1.first_column)];
        $$.push($5);
    }
    | %empty                       {$$=null;}
;

MasParametrosFucnc:
    ',' tk_id ':' TipoDato Posiblesllavesparafunc MasParametrosFucnc        
    {
        $$=[new Parametrofunc($2,$4,$5,@1.first_line, @1.first_column)]
        $$.push($6);
    }
    | %empty                       {$$=null;}
;

Posiblesllavesparafunc:
    Llavesparafuncion
    {
        $$=$1;
    }
    | %empty                       {$$="";}
;

Llavesparafuncion:
    Llavesparafuncion '[' ']'
    {
        $$="array";
    }
    | '[' ']'
    {
        $$="array";
    }
;

Posiblecuerpo:
    LInstrucciones
    {
        $$=$1;
    }
    | %empty                       {$$=null;}
;

Cuerpo:
    '{' LInstrucciones '}' 
    {
        $$ = new Statement($2, @1.first_line, @1.first_column);
    }
    | '{' '}' 
    {
        $$ = new Statement(new Array(), @1.first_line, @1.first_column);
    }
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en las llaves {} "+yytext,"",this._$.first_line,this._$.first_column));}
;

Expresion:
    '(' Expresion ')'       {$$=$2;}
    | OpeTernario           {$$=$1;}
    | E_aritmetica          {$$=$1;}
    | E_relacional          {$$=$1;}
    | E_logica              {$$=$1;}
    | Factor                {$$=$1;}
    | E_Funcionexp          {$$=$1;}
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en la expresion "+yytext,"",this._$.first_line,this._$.first_column));}
;

OpeTernario:
    Expresion '?' Expresion ':' Expresion 
    {
        $$ = new Opeternario($1, $3, $5, @1.first_line,@1.first_column);
    }
;

E_aritmetica:
    Expresion '+' Expresion
    {
        $$ = new Aritmetica($1, $3, TipoAritmetico.MAS, @1.first_line,@1.first_column);
    }
    | Expresion '-' Expresion
    {
        $$ = new Aritmetica($1, $3, TipoAritmetico.MENOS, @1.first_line,@1.first_column);
    }
    | Expresion '*' Expresion
    {
        $$ = new Aritmetica($1, $3, TipoAritmetico.MULT, @1.first_line,@1.first_column);
    }
    | Expresion '/' Expresion
    {
        $$ = new Aritmetica($1, $3, TipoAritmetico.DIV, @1.first_line,@1.first_column);
    }
    | Expresion '**' Expresion
    {
        $$ = new Aritmetica($1, $3, TipoAritmetico.POT, @1.first_line,@1.first_column);
    }
    | Expresion '%' Expresion
    {
        $$ = new Aritmetica($1, $3, TipoAritmetico.MOD, @1.first_line,@1.first_column);
    }
    | '-' Expresion %prec UMENOS
    {
        $$ = new Aritmetica($2, null, TipoAritmetico.UMENOS, @1.first_line,@1.first_column);
    }
    | '+' Expresion %prec UMAS
    {
        $$ = new Aritmetica($2, null, TipoAritmetico.UMAS, @1.first_line,@1.first_column);
    }
;

E_Funcionexp:
    tk_id '(' PosibleParametrosllamada ')'
    {
        $$ = new Llamarfuncionexp($1, $3, @1.first_line, @1.first_column);
    }
;

E_relacional:
    Expresion '>' Expresion
    {
        $$ = new Relacional($1, $3,TipoRelacional.MAYORQUE, @1.first_line, @1.first_column);
    }
    | Expresion '<' Expresion
    {
        $$ = new Relacional($1, $3,TipoRelacional.MENORQUE, @1.first_line, @1.first_column);
    }
    | Expresion '>=' Expresion
    {
        $$ = new Relacional($1, $3,TipoRelacional.MAYORIGUAL, @1.first_line, @1.first_column);
    }
    | Expresion '<=' Expresion
    {
        $$ = new Relacional($1, $3,TipoRelacional.MENORIGUAL, @1.first_line, @1.first_column);
    }
    | Expresion '==' Expresion
    {
        $$ = new Relacional($1, $3,TipoRelacional.IGUAL, @1.first_line, @1.first_column);
    }
    | Expresion '!=' Expresion
    {
        $$ = new Relacional($1, $3,TipoRelacional.DIFERENCIA, @1.first_line, @1.first_column);
    }
;

E_logica:
    Expresion '&&' Expresion
    {
        $$ = new Logica($1, $3,TipoLogica.AND, @1.first_line, @1.first_column);
    }
    | Expresion '||' Expresion
    {
        $$ = new Logica($1, $3,TipoLogica.OR, @1.first_line, @1.first_column);
    }
    | '!' Expresion
    {
        $$ = new Logica($2, null,TipoLogica.NOT, @1.first_line, @1.first_column);
    }
;

Factor:
    tk_entero
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 0);
    }
    | tk_decimal
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 0);
    }
    | tk_cadena
    {
        $$ = new Literal($1.replace(/\"|\'/g,""), @1.first_line, @1.first_column, 1);
    }
    | tk_bool
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 2);
    }
    | tk_null
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, 3);
    }
    | tk_id
    {
        $$ = new Id($1, @1.first_line, @1.first_column);
    }
    | tk_id PosibleDireccionArray '.' tk_length 
    {
        $$ = new AsignacionArrayExp($1, $2, @1.first_line, @1.first_column);
    }
    | tk_id Direccionarray 
    {
        $$ = new Obtenervalorarray($1, $2, @1.first_line, @1.first_column);
    }
;

PosibleDireccionArray:
    Direccionarray                  {$$=$1;}
    | %empty                        {$$=null;}
;

Incydec:
    tk_id '++'
    {
        $$ = new Asignacion($1, null, TipoAritmetico.INC,@1.first_line, @1.first_column);
    }
    | tk_id '--'
    {
        $$ = new Asignacion($1, null, TipoAritmetico.DEC, @1.first_line, @1.first_column);
    }
;

TipoDato:
    tk_number                       {$$ = "number";}
    | tk_string                     {$$ = "string";}
    | tk_boolean                    {$$ = "boolean";}
    | tk_void                       {$$ = "void";}
    | tk_id                         {$$ = $1;}
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error al definir tipo "+yytext,"",this._$.first_line,this._$.first_column))}
;

Returnt:
    tk_return ';'
    {
        $$=new Returnt(null,@1.first_line, @1.first_column);
    }
    | tk_return Expresion ';'
    {
        $$=new Returnt($2,@1.first_line, @1.first_column);
    }
;