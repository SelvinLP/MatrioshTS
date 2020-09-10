
%{
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
    const {For} = require('../build/Instrucciones/For');
    const {Dowhile} = require('../build/Instrucciones/Dowhile');
    const {Declaracion} = require('../build/Instrucciones/Declaracion');
    const {Asignacion} = require('../build/Instrucciones/Asignacion');
    const {Statement} = require('../build/Instrucciones/Statement');
    const {Id} = require('../build/Expresiones/Id');
    const {Funcion} = require('../build/Instrucciones/Funcion');
    const {Llamarfuncion} = require('../build/Instrucciones/Llamarfuncion');
%}

/*------------------------------------------------PARTE LEXICA--------------------------------------------------- */
%lex

%%

//Comentarios
("//".*\r\n)|("//".*\n)|("//".*\r)  /*Comentario de una*/
"/*""/"*([^*/]|[^*]"/"|"*"[^/])*"*"*"*/"  /*Comentario multilinea*/

//Tipos de Datos
"let"               return 'tk_let'
"const"             return 'tk_const'
"string"            return 'tk_string'
"number"            return 'tk_number'
"boolean"           return 'tk_boolean'
"void"              return 'tk_void'


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
"graficar_ts"       return 'graficar_ts'


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

.                               {CL_Error.L_Errores.push(new CN_Error.N_Error("Lexico",yytext,yylineno,yylloc.first_column))}

/lex

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
    | Asignacion            {$$=$1;} 
    | Impresion             {$$=$1;}
    | Ift                   {$$=$1;}
    | Whilet                {$$=$1;}
    | Dowhilet              {$$=$1;}
    | Fort                  {$$=$1;}
    | Funciones             {$$=$1;}
;

Declaracion:
    tk_let tk_id Tipodeclaracion PosibleAsignacion ';'  
    {
        $$ = new Declaracion(TipoDato.LET, $2, $3, $4, @1.first_line, @1.first_column);
    }
    | tk_const tk_id Tipodeclaracion PosibleAsignacion ';'  
    {
        $$ = new Declaracion(TipoDato.CONST, $2, $3, $4, @1.first_line, @1.first_column);
    }
;

Tipodeclaracion:
    ':' tk_number                       {$$=Tipo.NUMBER}
    | ':' tk_string                     {$$=Tipo.STRING}
    | ':' tk_boolean                    {$$=Tipo.BOOLEAN}
    | ':' tk_void                       {$$=Tipo.NULL}
    | %empty                            {$$=null;} 
;

PosibleAsignacion:
    '=' Expresion                   {$$=$2;}
    | %empty                        {$$=null;}
;

Asignacion:
    tk_id '=' Expresion ';'
    {
        $$ = new Asignacion($1, $3, null, @1.first_line, @1.first_column);
    }
    | Incydec ';'
    {
        $$=$1;
    }
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

Funciones:
    tk_function tk_id '(' ')' Cuerpo
    {
        $$ = new Funcion($2, [], $5, @1.first_line, @1.first_column);
    }
    | tk_id '(' ')' ';'
    {
        $$ = new Llamarfuncion($1, [], @1.first_line, @1.first_column);
    }
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
;

Expresion:
    '(' Expresion ')'       {$$=$2;}
    | E_aritmetica          {$$=$1;}
    | E_relacional          {$$=$1;}
    | E_logica              {$$=$1;}
    | Factor                {$$=$1;}
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
    | tk_id
    {
        $$ = new Id($1, @1.first_line, @1.first_column);
    }
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
