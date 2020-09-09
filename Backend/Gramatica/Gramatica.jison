
%{
    const CL_Error = require('../build/Errores/L_Error');
    const CN_Error = require('../build/Errores/N_Error');
    const {TipoAritmetico, TipoRelacional, TipoLogica} = require('../build/Abstracto/Retorno');
    const {Literal} = require('../build/Expresiones/Literal');
    const {Aritmetica} = require('../build/Expresiones/Aritmetica');
    const {Relacional} = require('../build/Expresiones/Relacional');
    const {Logica} = require('../build/Expresiones/Logica');
    const {Imprimir} = require('../build/Instrucciones/Imprimir');
    const {Ifelse} = require('../build/Instrucciones/Ifelse');
    const {While} = require('../build/Instrucciones/While');
    const {Declaracion} = require('../build/Instrucciones/Declaracion');
    const {Statement} = require('../build/Instrucciones/Statement');
    const {Id} = require('../build/Expresiones/Id');
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
"void"              return 'tk_void'
"console.log"       return 'tk_console'


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
"++"    return 'tk_inc'
"--"    return 'tk_dec'


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

%left '+' '-'
%left '*' '/'
%left '**' '%'
%left '||'
%left '&&'
%right '!'
%left '==', '!='
%left '>=', '<=', '<', '>'

/*------------------------------------------------PARTE SINTACTICA--------------------------------------------------- */

%start START
%% 

START:
    LInstrucciones EOF  
    {
        return $1;
    }            
;

LInstrucciones:
    LInstrucciones Instruccion 
    {
        $1.push($2);
        $$ = $1;
    }
    | Instruccion
    {
        $$ = [$1];
    }
;

Instruccion:
    Declaracion
    {
        $$=$1;
    }
    | Impresion  
    {
        $$=$1;
    }
    | Ift
    {
        $$=$1;
    }
    | Whilet
    {
        $$=$1;
    }
;

Declaracion:
    tk_let tk_id '=' Expresion ';'  
    {
        $$ = new Declaracion($2, $4, @1.first_line, @1.first_column);
    }

    | tk_const tk_id '=' Expresion ';'  
    {
        $$ = new Declaracion($2, $4, @1.first_line, @1.first_column);
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
    tk_else Cuerpo
    {
        $$=$2;
    }
    | tk_else Ift
    {
        $$=$2;
    }
    | %empty
    {
        $$=null;
    }
;

Whilet:
    tk_while '(' Expresion ')' Cuerpo
    {
        $$ = new While($3, $5, @1.first_line, @1.first_column);
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
    E_aritmetica
    {
        $$=$1;
    }
    | E_relacional
    {
        $$=$1;
    }
    | E_logica
    {
        $$=$1;
    }
    | Factor
    {
        $$=$1;
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
    '(' Expresion ')'
    { 
        $$ = $2;
    }
    | tk_entero
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
