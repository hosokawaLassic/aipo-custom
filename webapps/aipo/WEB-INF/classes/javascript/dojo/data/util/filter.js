if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(H,J){var F="^";
var G=null;
for(var I=0;
I<H.length;
I++){G=H.charAt(I);
switch(G){case"\\":F+=G;
I++;
F+=H.charAt(I);
break;
case"*":F+=".*";
break;
case"?":F+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":F+="\\";
default:F+=G
}}F+="$";
if(J){return new RegExp(F,"i")
}else{return new RegExp(F)
}}
};