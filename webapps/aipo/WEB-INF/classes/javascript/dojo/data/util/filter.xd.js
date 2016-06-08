dojo._xdResourceLoaded({depends:[["provide","dojo.data.util.filter"]],defineResource:function(B){if(!B._hasResource["dojo.data.util.filter"]){B._hasResource["dojo.data.util.filter"]=true;
B.provide("dojo.data.util.filter");
B.data.util.filter.patternToRegExp=function(G,I){var J="^";
var A=null;
for(var H=0;
H<G.length;
H++){A=G.charAt(H);
switch(A){case"\\":J+=A;
H++;
J+=G.charAt(H);
break;
case"*":J+=".*";
break;
case"?":J+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":J+="\\";
default:J+=A
}}J+="$";
if(I){return new RegExp(J,"i")
}else{return new RegExp(J)
}}
}}});