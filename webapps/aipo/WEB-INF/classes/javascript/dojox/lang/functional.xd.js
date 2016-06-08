dojo._xdResourceLoaded({depends:[["provide","dojox.lang.functional"]],defineResource:function(B){if(!B._hasResource["dojox.lang.functional"]){B._hasResource["dojox.lang.functional"]=true;
B.provide("dojox.lang.functional");
(function(){var R=B,O=dojox.lang.functional,P=/\bfor\b|\bif\b/gm,A={};
var Q="ab".split(/a*/).length>1?String.prototype.split:function(E){var D=this.split.call(this,E),C=E.exec(this);
if(C&&C.index==0){D.unshift("")
}return D
};
var T=function(G){var I=[],D=Q.call(G,/\s*->\s*/m);
if(D.length>1){while(D.length){G=D.pop();
I=D.pop().split(/\s*,\s*|\s+/m);
if(D.length){D.push("(function("+I+"){return ("+G+")})")
}}}else{if(G.match(/\b_\b/)){I=["_"]
}else{var C=G.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/m),F=G.match(/[+\-*\/%&|\^\.=<>!]\s*$/m);
if(C||F){if(C){I.push("$1");
G="$1"+G
}if(F){I.push("$2");
G=G+"$2"
}}else{var E=G.replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*:|this|true|false|null|undefined|typeof|instanceof|in|delete|new|void|arguments|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|dojo|dijit|dojox|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,"").match(/([a-z_$][a-z_$\d]*)/gi)||[];
var H={};
R.forEach(E,function(J){if(!(J in H)){I.push(J);
H[J]=1
}})
}}}return{args:I,body:"return ("+G+");"}
};
var M=function(F){var D=F.split(P),J=F.match(P),G=["var r = [];"],I=[];
for(var H=0;
H<J.length;
){var C=J[H],E=D[++H];
if(C=="for"&&!/^\s*\(\s*(;|var)/.test(E)){E=E.replace(/^\s*\(/,"(var ")
}G.push(C,E,"{");
I.push("}")
}return G.join("")+"r.push("+D[0]+");"+I.join("")+"return r;"
};
var L=function(C){return function(){if(arguments.length+C.args.length<C.arity){return L({func:C.func,arity:C.arity,args:Array.prototype.concat.apply(C.args,arguments)})
}return C.func.apply(this,Array.prototype.concat.apply(C.args,arguments))
}
};
var S=function(C){return C
};
var N=function(C){return C.length?function(){var D=C.length-1,E=O.lambda(C[D]).apply(this,arguments);
for(--D;
D>=0;
--D){E=O.lambda(C[D]).call(this,E)
}return E
}:S
};
R.mixin(O,{buildLambda:function(C){C=T(C);
return"function("+C.args.join(",")+"){"+C.body+"}"
},lambda:function(C){if(typeof C=="function"){return C
}if(C instanceof Array){return N(C)
}C=T(C);
return new Function(C.args,C.body)
},repeat:function(D,G,E,F){F=F||R.global;
G=O.lambda(G);
var H=new Array(D);
H[0]=E;
for(var C=1;
C<D;
H[C]=E=G.call(F,E),++C){}return H
},until:function(D,G,E,F){F=F||R.global;
G=O.lambda(G);
D=O.lambda(D);
var C=[];
for(;
!D.call(F,E);
C.push(E),E=G.call(F,E)){}return C
},buildListcomp:function(C){return"function(){"+M(C)+"}"
},compileListcomp:function(C){return new Function([],M(C))
},listcomp:function(C){return(new Function([],M(C)))()
},foldl:function(C,F,D,E){C=typeof C=="string"?C.split(""):C;
E=E||R.global;
F=O.lambda(F);
for(var G=0;
G<C.length;
D=F.call(E,D,C[G],G,C),++G){}return D
},foldl1:function(C,F,D){C=typeof C=="string"?C.split(""):C;
D=D||R.global;
F=O.lambda(F);
var E=C[0];
for(var G=1;
G<C.length;
E=F.call(D,E,C[G],G,C),++G){}return E
},scanl:function(C,G,E,F){C=typeof C=="string"?C.split(""):C;
F=F||R.global;
G=O.lambda(G);
var D=C.length,H=new Array(D+1);
H[0]=E;
for(var I=0;
I<D;
E=G.call(F,E,C[I],I,C),H[++I]=E){}return H
},scanl1:function(C,G,E,F){C=typeof C=="string"?C.split(""):C;
F=F||R.global;
G=O.lambda(G);
var D=C.length,H=new Array(D),E=C[0];
H[0]=E;
for(var I=1;
I<D;
E=G.call(F,E,C[I],I,C),H[I++]=E){}return H
},foldr:function(C,F,D,E){C=typeof C=="string"?C.split(""):C;
E=E||R.global;
F=O.lambda(F);
for(var G=C.length;
G>0;
--G,D=F.call(E,D,C[G],G,C)){}return D
},foldr1:function(C,G,E){C=typeof C=="string"?C.split(""):C;
E=E||R.global;
G=O.lambda(G);
var D=C.length,F=C[D-1];
for(var H=D-1;
H>0;
--H,F=G.call(E,F,C[H],H,C)){}return F
},scanr:function(C,G,E,F){C=typeof C=="string"?C.split(""):C;
F=F||R.global;
G=O.lambda(G);
var D=C.length,H=new Array(D+1);
H[D]=E;
for(var I=D;
I>0;
--I,E=G.call(F,E,C[I],I,C),H[I]=E){}return H
},scanr1:function(C,G,E,F){C=typeof C=="string"?C.split(""):C;
F=F||R.global;
G=O.lambda(G);
var D=C.length,H=new Array(D),E=C[D-1];
H[D-1]=E;
for(var I=D-1;
I>0;
--I,E=G.call(F,E,C[I],I,C),H[I]=E){}return H
},filter:function(C,F,E){C=typeof C=="string"?C.split(""):C;
E=E||R.global;
F=O.lambda(F);
var D=C.length,G=[],I;
for(var H=0;
H<D;
++H){I=C[H];
if(F.call(E,I,H,C)){G.push(I)
}}return G
},forEach:function(C,F,E){C=typeof C=="string"?C.split(""):C;
E=E||R.global;
F=O.lambda(F);
var D=C.length;
for(var G=0;
G<D;
F.call(E,C[G],G,C),++G){}},map:function(C,F,E){C=typeof C=="string"?C.split(""):C;
E=E||R.global;
F=O.lambda(F);
var D=C.length,G=new Array(D);
for(var H=0;
H<D;
G[H]=F.call(E,C[H],H,C),++H){}return G
},every:function(C,F,E){C=typeof C=="string"?C.split(""):C;
E=E||R.global;
F=O.lambda(F);
var D=C.length;
for(var G=0;
G<D;
++G){if(!F.call(E,C[G],G,C)){return false
}}return true
},some:function(C,F,E){C=typeof C=="string"?C.split(""):C;
E=E||R.global;
F=O.lambda(F);
var D=C.length;
for(var G=0;
G<D;
++G){if(F.call(E,C[G],G,C)){return true
}}return false
},reduce:function(C,E,D){return arguments.length<3?O.foldl1(C,E):O.foldl(C,E,D)
},reduceRight:function(C,E,D){return arguments.length<3?O.foldr1(C,E):O.foldr(C,E,D)
},curry:function(D,C){D=O.lambda(D);
C=typeof C=="number"?C:D.length;
return L({func:D,arity:C,args:[]})
},arg:{},partial:function(E){var C=arguments,H=new Array(C.length-1),D=[];
E=O.lambda(E);
for(var F=1;
F<C.length;
++F){var G=C[F];
H[F-1]=G;
if(G==O.arg){D.push(F-1)
}}return function(){var I=Array.prototype.slice.call(H,0);
for(var J=0;
J<D.length;
++J){I[D[J]]=arguments[J]
}return E.apply(this,I)
}
},mixer:function(D,C){D=O.lambda(D);
return function(){var E=new Array(C.length);
for(var F=0;
F<C.length;
++F){E[F]=arguments[C[F]]
}return D.apply(this,E)
}
},flip:function(C){C=O.lambda(C);
return function(){var F=arguments,G=F.length-1,D=new Array(G+1),E;
for(E=0;
E<=G;
++E){D[G-E]=F[E]
}return C.apply(this,D)
}
},zip:function(){var D=arguments[0].length,C=arguments.length,F;
for(F=1;
F<C;
D=Math.min(D,arguments[F++].length)){}var G=new Array(D),H;
for(F=0;
F<D;
++F){var E=new Array(C);
for(H=0;
H<C;
E[H]=arguments[H][F],++H){}G[F]=E
}return G
},unzip:function(C){return O.zip.apply(null,C)
},constFun:function(C){return function(){return C
}
},invoke:function(C){return function(D){return D[C].apply(D,Array.prototype.slice.call(arguments,1))
}
},pluck:function(C){return function(D){return D[C]
}
},forIn:function(E,F,D){D=D||R.global;
F=O.lambda(F);
for(var C in E){if(C in A){continue
}F.call(D,E[C],C,E)
}},forEachReversed:function(C,E,D){C=typeof C=="string"?C.split(""):C;
D=D||R.global;
E=O.lambda(E);
for(var F=C.length-1;
F>=0;
E.call(D,C[F],F,C),--F){}}});
B.declare("dojox.lang.functional.MaybeMonad",null,{constructor:function(C){if(arguments.length){this.value=C
}},bind:function(E,C,D){if(!("value" in E)){return new this.constructor()
}D=D||R.global;
C=O.lambda(C);
return C.call(D,E.value)
},isNothing:function(){return !("value" in this)
}});
O.MaybeMonad.returnMonad=function(C){return new O.MaybeMonad(C)
};
O.MaybeMonad.zero=new O.MaybeMonad()
})()
}}});