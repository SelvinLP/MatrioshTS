
%{
    const CL_Error=require('../Errores/L_Error');
    let CN_Error=require('../Errores/N_Error');
%}

/*------------------------------------------------PARTE LEXICA--------------------------------------------------- */
%lex

%%

//Comentarios
("//".*\r\n)|("//".*\n)|("//".*\r)  /*Comentario de una*/
"/*""/"*([^*/]|[^*]"/"|"*"[^/])*"*"*"*/"  /*Comentario multilinea*/

//Tipos de Datos
"int"|"Int"                   return 'tk_int'
"double"|"Double"             return 'tk_double'
"boolean"|"Boolean"           return 'tk_boolean'
"char"|"Char"                 return 'tk_char'
"string"|"String"             return 'tk_string'

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

"system"|"System"            return 'tk_system'
"out"                        return 'tk_out'
"println"                    return 'tk_print'
"print"                      return 'tk_print'

//Relacionales
"=="    return 'tk_igual'
"!="    return 'tk_dif'
">="    return 'tk_mayIgual'
">"     return 'tk_may'
"<="    return 'tk_menIgual'
"<"     return 'tk_men' 


//Logicas
"&&"    return 'tk_and'
"||"    return 'tk_or'
"!"    return 'tk_not'

//Unarias de Incremento y Decremento
"++"    return 'tk_inc'
"--"    return 'tk_dec'


//Otros
"{"     return 'tk_llavei';
"}"     return 'tk_llaved'
";"     return ';'
"="     return '='
"("     return 'tk_pabre'
")"     return 'tk_pcierra'
","     return 'tk_coma'
":"     return 'tk_dospuntos'
"."     return 'tk_punto'


//Exprsiones Regulares
[-]?[0-9]+("."[0-9]+)?             return 'tk_digito'
"true"|"false"                     return 'tk_booleano'
[\"]([^\"\n]|(\\\"))*[\"]          return 'tk_cadena'
[\'][a-zA-Z| ][\']                 return 'tk_caracter'
([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	        return 'tk_id';

//Operaciones Aritmeticas
"+"     return 'tk_sum'
"-"     return 'tk_res'
"*"     return 'tk_mul'
"/"     return 'tk_div'
"^"     return 'tk_pot'
"%"     return 'tk_mod'

[ \t\r\n\f]                    %{ /*se ignoran*/ %}

<<EOF>>                        %{  return 'EOF';   %}

.                               {CL_Error.push(new CN_Error.N_Error("Lexico",yytext,yylineno,yylloc.first_column))}


/lex

/*------------------------------------------------PARTE SINTACTICA--------------------------------------------------- */

%star START
%% 

START:
    LInstrucciones EOF 
;

LInstrucciones:
    LInstrucciones Instruccion 
    | Instruccion
;

Instruccion:
    Declaracion
;

Declaracion:
    tk_id '='  ';'  {console.log("hola");}
;