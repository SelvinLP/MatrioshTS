
%{
    const CL_Error = require('../build/Errores/L_Error');
    const CN_Error = require('../build/Errores/N_Error');
    const {Literal} = require('../build/Expresiones/Literal');
    const {Aritmetica} = require('../build/Expresiones/Aritmetica');
    const {TipoAritmetico} = require('../build/Abstracto/Retorno');
    const {Imprimir} = require('../build/Instrucciones/Imprimir');
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
"class"             return 'tk_class'
"import"            return 'tk_import'
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
"!"    return 'tk_not'

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
[0-9]+                             return 'tk_entero'
[0-9]+"."[0-9]+                    return 'tk_decimal'
[\"|\']([^\"\n]|(\\\"))*[\"|\']    return 'tk_cadena'
([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	       return 'tk_id';
"true"|"false"                     return 'tk_bool'

//Operaciones Aritmeticas
"+"     return '+'
"-"     return '-'
"*"     return '*'
"/"     return '/'
"%"     return '%'

[ \t\r\n\f]                    %{ /*se ignoran*/ %}

<<EOF>>                        %{  return 'EOF';   %}

.                               {CL_Error.L_Errores.push(new CN_Error.N_Error("Lexico",yytext,yylineno,yylloc.first_column))}


/lex

%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'

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
    | Impresion  
    {
        $$=$1;
    }
;

Declaracion:
    tk_id '=' Expresion ';'  
    {
        console.log("Reconocio Declaracion");
    }
;

Impresion:
    tk_console '(' Expresion ')' ';'
    {
        $$ = new Imprimir($3, @1.first_line, @1.first_column);
    }
;

Expresion:
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
    | Factor
    {
        $$=$1;
    }
;

Factor:
    '(' Expresion ')'
    { 
        $$ = $2;
    }
    | tk_cadena
    {
        $$ = new Literal($1.replace(/\"|\'/g,""), @1.first_line, @1.first_column, 0);
    }
    | tk_entero
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 1);
    }
    | tk_decimal
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 1);
    }
    | tk_bool
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 2);
    }
    | tk_id
    {
    }
;