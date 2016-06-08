if(!dojo._hasResource["dojox.lang.functional"]){dojo._hasResource["dojox.lang.functional"]=true;
dojo.provide("dojox.lang.functional");
(function(){var S=dojo,P=dojox.lang.functional,Q=/\bfor\b|\bif\b/gm,L={};
var R="ab".split(/a*/).length>1?String.prototype.split:function(A){var C=this.split.call(this,A),B=A.exec(this);
if(B&&B.index==0){C.unshift("")
}return C
};
var K=function(F){var A=[],C=R.call(F,/\s*->\s*/m);
if(C.length>1){while(C.length){F=C.pop();
A=C.pop().split(/\s*,\s*|\s+/m);
if(C.length){C.push("(function("+A+"){return ("+F+")})")
}}}else{if(F.match(/\b_\b/)){A=["_"]
}else{var B=F.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/m),E=F.match(/[+\-*\/%&|\^\.=<>!]\s*$/m);
if(B||E){if(B){A.push("$1");
F="$1"+F
}if(E){A.push("$2");
F=F+"$2"
}}else{var D=F.replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*:|this|true|false|null|undefined|typeof|instanceof|in|delete|new|void|arguments|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|dojo|dijit|dojox|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,"").match(/([a-z_$][a-z_$\d]*)/gi)||[];
var G={};
S.forEach(D,function(H){if(!(H in G)){A.push(H);
G[H]=1
}})
}}}return{args:A,body:"return ("+F+");"}
};
var N=function(E){var C=E.split(Q),A=E.match(Q),F=["var r = [];"],H=[];
for(var G=0;
G<A.length;
){var B=A[G],D=C[++G];
if(B=="for"&&!/^\s*\(\s*(;|var)/.test(D)){D=D.replace(/^\s*\(/,"(var ")
}F.push(B,D,"{");
H.push("}")
}return F.join("")+"r.push("+C[0]+");"+H.join("")+"return r;"
};
var M=function(A){return function(){if(arguments.length+A.args.length<A.arity){return M({func:A.func,arity:A.arity,args:Array.prototype.concat.apply(A.args,arguments)})
}return A.func.apply(this,Array.prototype.concat.apply(A.args,arguments))
}
};
var T=function(A){return A
};
var O=function(A){return A.length?function(){var C=A.length-1,B=P.lambda(A[C]).apply(this,arguments);
for(--C;
C>=0;
--C){B=P.lambda(A[C]).call(this,B)
}return B
}:T
};
S.mixin(P,{buildLambda:function(A){A=K(A);
return"function("+A.args.join(",")+"){"+A.body+"}"
},lambda:function(A){if(typeof A=="function"){return A
}if(A instanceof Array){return O(A)
}A=K(A);
return new Function(A.args,A.body)
},repeat:function(C,F,D,E){E=E||S.global;
F=P.lambda(F);
var A=new Array(C);
A[0]=D;
for(var B=1;
B<C;
A[B]=D=F.call(E,D),++B){}return A
},until:function(C,A,D,E){E=E||S.global;
A=P.lambda(A);
C=P.lambda(C);
var B=[];
for(;
!C.call(E,D);
B.push(D),D=A.call(E,D)){}return B
},buildListcomp:function(A){return"function(){"+N(A)+"}"
},compileListcomp:function(A){return new Function([],N(A))
},listcomp:function(A){return(new Function([],N(A)))()
},foldl:function(B,E,C,D){B=typeof B=="string"?B.split(""):B;
D=D||S.global;
E=P.lambda(E);
for(var A=0;
A<B.length;
C=E.call(D,C,B[A],A,B),++A){}return C
},foldl1:function(B,E,C){B=typeof B=="string"?B.split(""):B;
C=C||S.global;
E=P.lambda(E);
var D=B[0];
for(var A=1;
A<B.length;
D=E.call(C,D,B[A],A,B),++A){}return D
},scanl:function(B,F,D,E){B=typeof B=="string"?B.split(""):B;
E=E||S.global;
F=P.lambda(F);
var C=B.length,G=new Array(C+1);
G[0]=D;
for(var A=0;
A<C;
D=F.call(E,D,B[A],A,B),G[++A]=D){}return G
},scanl1:function(B,F,D,E){B=typeof B=="string"?B.split(""):B;
E=E||S.global;
F=P.lambda(F);
var C=B.length,G=new Array(C),D=B[0];
G[0]=D;
for(var A=1;
A<C;
D=F.call(E,D,B[A],A,B),G[A++]=D){}return G
},foldr:function(B,E,C,D){B=typeof B=="string"?B.split(""):B;
D=D||S.global;
E=P.lambda(E);
for(var A=B.length;
A>0;
--A,C=E.call(D,C,B[A],A,B)){}return C
},foldr1:function(B,F,D){B=typeof B=="string"?B.split(""):B;
D=D||S.global;
F=P.lambda(F);
var C=B.length,E=B[C-1];
for(var A=C-1;
A>0;
--A,E=F.call(D,E,B[A],A,B)){}return E
},scanr:function(B,F,D,E){B=typeof B=="string"?B.split(""):B;
E=E||S.global;
F=P.lambda(F);
var C=B.length,G=new Array(C+1);
G[C]=D;
for(var A=C;
A>0;
--A,D=F.call(E,D,B[A],A,B),G[A]=D){}return G
},scanr1:function(B,F,D,E){B=typeof B=="string"?B.split(""):B;
E=E||S.global;
F=P.lambda(F);
var C=B.length,G=new Array(C),D=B[C-1];
G[C-1]=D;
for(var A=C-1;
A>0;
--A,D=F.call(E,D,B[A],A,B),G[A]=D){}return G
},filter:function(B,E,D){B=typeof B=="string"?B.split(""):B;
D=D||S.global;
E=P.lambda(E);
var C=B.length,F=[],A;
for(var G=0;
G<C;
++G){A=B[G];
if(E.call(D,A,G,B)){F.push(A)
}}return F
},forEach:function(B,E,D){B=typeof B=="string"?B.split(""):B;
D=D||S.global;
E=P.lambda(E);
var C=B.length;
for(var A=0;
A<C;
E.call(D,B[A],A,B),++A){}},map:function(B,E,D){B=typeof B=="string"?B.split(""):B;
D=D||S.global;
E=P.lambda(E);
var C=B.length,F=new Array(C);
for(var A=0;
A<C;
F[A]=E.call(D,B[A],A,B),++A){}return F
},every:function(B,E,D){B=typeof B=="string"?B.split(""):B;
D=D||S.global;
E=P.lambda(E);
var C=B.length;
for(var A=0;
A<C;
++A){if(!E.call(D,B[A],A,B)){return false
}}return true
},some:function(B,E,D){B=typeof B=="string"?B.split(""):B;
D=D||S.global;
E=P.lambda(E);
var C=B.length;
for(var A=0;
A<C;
++A){if(E.call(D,B[A],A,B)){return true
}}return false
},reduce:function(B,A,C){return arguments.length<3?P.foldl1(B,A):P.foldl(B,A,C)
},reduceRight:function(B,A,C){return arguments.length<3?P.foldr1(B,A):P.foldr(B,A,C)
},curry:function(A,B){A=P.lambda(A);
B=typeof B=="number"?B:A.length;
return M({func:A,arity:B,args:[]})
},arg:{},partial:function(D){var B=arguments,A=new Array(B.length-1),C=[];
D=P.lambda(D);
for(var E=1;
E<B.length;
++E){var F=B[E];
A[E-1]=F;
if(F==P.arg){C.push(E-1)
}}return function(){var G=Array.prototype.slice.call(A,0);
for(var H=0;
H<C.length;
++H){G[C[H]]=arguments[H]
}return D.apply(this,G)
}
},mixer:function(A,B){A=P.lambda(A);
return function(){var C=new Array(B.length);
for(var D=0;
D<B.length;
++D){C[D]=arguments[B[D]]
}return A.apply(this,C)
}
},flip:function(A){A=P.lambda(A);
return function(){var E=arguments,B=E.length-1,C=new Array(B+1),D;
for(D=0;
D<=B;
++D){C[B-D]=E[D]
}return A.apply(this,C)
}
},zip:function(){var C=arguments[0].length,B=arguments.length,E;
for(E=1;
E<B;
C=Math.min(C,arguments[E++].length)){}var F=new Array(C),A;
for(E=0;
E<C;
++E){var D=new Array(B);
for(A=0;
A<B;
D[A]=arguments[A][E],++A){}F[E]=D
}return F
},unzip:function(A){return P.zip.apply(null,A)
},constFun:function(A){return function(){return A
}
},invoke:function(A){return function(B){return B[A].apply(B,Array.prototype.slice.call(arguments,1))
}
},pluck:function(A){return function(B){return B[A]
}
},forIn:function(D,A,C){C=C||S.global;
A=P.lambda(A);
for(var B in D){if(B in L){continue
}A.call(C,D[B],B,D)
}},forEachReversed:function(B,D,C){B=typeof B=="string"?B.split(""):B;
C=C||S.global;
D=P.lambda(D);
for(var A=B.length-1;
A>=0;
D.call(C,B[A],A,B),--A){}}});
dojo.declare("dojox.lang.functional.MaybeMonad",null,{constructor:function(A){if(arguments.length){this.value=A
}},bind:function(A,B,C){if(!("value" in A)){return new this.constructor()
}C=C||S.global;
B=P.lambda(B);
return B.call(C,A.value)
},isNothing:function(){return !("value" in this)
}});
P.MaybeMonad.returnMonad=function(A){return new P.MaybeMonad(A)
};
P.MaybeMonad.zero=new P.MaybeMonad()
})()
};