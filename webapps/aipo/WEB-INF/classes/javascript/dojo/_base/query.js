if(!dojo._hasResource["dojo._base.query"]){dojo._hasResource["dojo._base.query"]=true;
dojo.provide("dojo._base.query");
dojo.require("dojo._base.NodeList");
(function(){var g=dojo;
var w=dojo.isIE?"children":"childNodes";
var k=function(M){if(M.charAt(M.length-1)==">"){M+=" *"
}M+=" ";
var V=function(X,Y){return g.trim(M.slice(X,Y))
};
var D=[];
var L=-1;
var Q=-1;
var F=-1;
var N=-1;
var W=-1;
var S=-1;
var G=-1;
var B="";
var C="";
var O;
var H=0;
var U=M.length;
var T=null;
var P=null;
var I=function(){if(G>=0){var X=(G==H)?null:V(G,H).toLowerCase();
T[(">~+".indexOf(X)<0)?"tag":"oper"]=X;
G=-1
}};
var R=function(){if(S>=0){T.id=V(S,H).replace(/\\/g,"");
S=-1
}};
var J=function(){if(W>=0){T.classes.push(V(W+1,H).replace(/\\/g,""));
W=-1
}};
var E=function(){R();
I();
J()
};
for(;
H<U,B=C,C=M.charAt(H);
H++){if(B=="\\"){continue
}if(!T){O=H;
T={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null};
G=H
}if(L>=0){if(C=="]"){if(!P.attr){P.attr=V(L+1,H)
}else{P.matchFor=V((F||L+1),H)
}var A=P.matchFor;
if(A){if((A.charAt(0)=='"')||(A.charAt(0)=="'")){P.matchFor=A.substring(1,A.length-1)
}}T.attrs.push(P);
P=null;
L=F=-1
}else{if(C=="="){var K=("|~^$*".indexOf(B)>=0)?B:"";
P.type=K+C;
P.attr=V(L+1,H-K.length);
F=H+1
}}}else{if(Q>=0){if(C==")"){if(N>=0){P.value=V(Q+1,H)
}N=Q=-1
}}else{if(C=="#"){E();
S=H+1
}else{if(C=="."){E();
W=H
}else{if(C==":"){E();
N=H
}else{if(C=="["){E();
L=H;
P={}
}else{if(C=="("){if(N>=0){P={name:V(N+1,H),value:null};
T.pseudos.push(P)
}Q=H
}else{if(C==" "&&B!=C){E();
if(N>=0){T.pseudos.push({name:V(N+1,H)})
}T.hasLoops=(T.pseudos.length||T.attrs.length||T.classes.length);
T.query=V(O,H);
T.tag=(T.oper)?null:(T.tag||"*");
D.push(T);
T=null
}}}}}}}}}return D
};
var j={"*=":function(B,A){return"[contains(@"+B+", '"+A+"')]"
},"^=":function(B,A){return"[starts-with(@"+B+", '"+A+"')]"
},"$=":function(B,A){return"[substring(@"+B+", string-length(@"+B+")-"+(A.length-1)+")='"+A+"']"
},"~=":function(B,A){return"[contains(concat(' ',@"+B+",' '), ' "+A+" ')]"
},"|=":function(B,A){return"[contains(concat(' ',@"+B+",' '), ' "+A+"-')]"
},"=":function(B,A){return"[@"+B+"='"+A+"']"
}};
var x=function(B,C,D,A){g.forEach(C.attrs,function(F){var E;
if(F.type&&B[F.type]){E=B[F.type](F.attr,F.matchFor)
}else{if(F.attr.length){E=D(F.attr)
}}if(E){A(E)
}})
};
var AD=function(A){var D=".";
var B=k(g.trim(A));
while(B.length){var E=B.shift();
var C;
if(E.oper==">"){C="/";
E=B.shift()
}else{C="//"
}D+=C+E.tag;
if(E.id){D+="[@id='"+E.id+"'][1]"
}g.forEach(E.classes,function(F){var H=F.length;
var G=" ";
if(F.charAt(H-1)=="*"){G="";
F=F.substr(0,H-1)
}D+="[contains(concat(' ',@class,' '), ' "+F+G+"')]"
});
x(j,E,function(F){return"[@"+F+"]"
},function(F){D+=F
})
}return D
};
var s={};
var r=function(A){if(s[A]){return s[A]
}var B=g.doc;
var D=AD(A);
var C=function(E){var F=[];
var G;
try{G=B.evaluate(D,E,null,XPathResult.ANY_TYPE,null)
}catch(I){console.debug("failure in exprssion:",D,"under:",E);
console.debug(I)
}var H=G.iterateNext();
while(H){F.push(H);
H=G.iterateNext()
}return F
};
return s[A]=C
};
var p={};
var AB={};
var t=function(A,B){if(!A){return B
}if(!B){return A
}return function(){return A.apply(window,arguments)&&B.apply(window,arguments)
}
};
var u=function(G,A,E,B){var K=B+1;
var L=(A.length==K);
var M=A[B];
if(M.oper==">"){var D=G[w];
if(!D||!D.length){return 
}K++;
L=(A.length==K);
var I=o(A[B+1]);
for(var C=0,J=D.length,H;
C<J,H=D[C];
C++){if(I(H)){if(L){E.push(H)
}else{u(H,A,E,K)
}}}}var F=y(M)(G);
if(L){while(F.length){E.push(F.shift())
}}else{while(F.length){u(F.shift(),A,E,K)
}}};
var q=function(B,C){var D=[];
var E=B.length-1,A;
while(A=B[E--]){u(A,C,D,0)
}return D
};
var o=function(A){if(p[A.query]){return p[A.query]
}var B=null;
if(A.tag){if(A.tag=="*"){B=t(B,function(C){return(C.nodeType==1)
})
}else{B=t(B,function(C){return((C.nodeType==1)&&(A.tag==C.tagName.toLowerCase()))
})
}}if(A.id){B=t(B,function(C){return((C.nodeType==1)&&(C.id==A.id))
})
}if(A.hasLoops){B=t(B,AA(A))
}return p[A.query]=B
};
var AE=function(B){var D=B.parentNode;
var E=D.childNodes;
var G=-1;
var A=D.firstChild;
if(!A){return G
}var C=B.__cachedIndex;
var F=D.__cachedLength;
if(((typeof F=="number")&&(F!=E.length))||(typeof C!="number")){D.__cachedLength=E.length;
var H=1;
do{if(A===B){G=H
}if(A.nodeType==1){A.__cachedIndex=H;
H++
}A=A.nextSibling
}while(A)
}else{G=C
}return G
};
var AJ=0;
var v="";
var AC=function(A,B){if(B=="class"){return A.className||v
}if(B=="for"){return A.htmlFor||v
}return A.getAttribute(B,2)||v
};
var l={"*=":function(B,A){return function(C){return(AC(C,B).indexOf(A)>=0)
}
},"^=":function(B,A){return function(C){return(AC(C,B).indexOf(A)==0)
}
},"$=":function(C,A){var B=" "+A;
return function(D){var E=" "+AC(D,C);
return(E.lastIndexOf(A)==(E.length-A.length))
}
},"~=":function(C,A){var B=" "+A+" ";
return function(D){var E=" "+AC(D,C)+" ";
return(E.indexOf(B)>=0)
}
},"|=":function(C,A){var B=" "+A+"-";
return function(D){var E=" "+(D.getAttribute(C,2)||"");
return((E==A)||(E.indexOf(B)==0))
}
},"=":function(B,A){return function(C){return(AC(C,B)==A)
}
}};
var z={"first-child":function(B,A){return function(C){if(C.nodeType!=1){return false
}var D=C.previousSibling;
while(D&&(D.nodeType!=1)){D=D.previousSibling
}return(!D)
}
},"last-child":function(B,A){return function(D){if(D.nodeType!=1){return false
}var C=D.nextSibling;
while(C&&(C.nodeType!=1)){C=C.nextSibling
}return(!C)
}
},empty:function(B,A){return function(D){var C=D.childNodes;
var F=D.childNodes.length;
for(var G=F-1;
G>=0;
G--){var E=C[G].nodeType;
if((E==1)||(E==3)){return false
}}return true
}
},not:function(C,A){var B=o(k(A)[0]);
return function(D){return(!B(D))
}
},"nth-child":function(E,A){var B=parseInt;
if(A=="odd"){return function(H){return(((AE(H))%2)==1)
}
}else{if((A=="2n")||(A=="even")){return function(H){return((AE(H)%2)==0)
}
}else{if(A.indexOf("0n+")==0){var C=B(A.substr(3));
return function(H){return(H.parentNode[w][C-1]===H)
}
}else{if((A.indexOf("n+")>0)&&(A.length>3)){var D=A.split("n+",2);
var F=B(D[0]);
var G=B(D[1]);
return function(H){return((AE(H)%F)==G)
}
}else{if(A.indexOf("n")==-1){var C=B(A);
return function(H){return(AE(H)==C)
}
}}}}}}};
var d=(g.isIE)?function(B){var A=B.toLowerCase();
return function(C){return C[B]||C[A]
}
}:function(A){return function(B){return(B&&B.getAttribute&&B.hasAttribute(A))
}
};
var AA=function(B){var A=(AB[B.query]||p[B.query]);
if(A){return A
}var C=null;
if(B.id){if(B.tag!="*"){C=t(C,function(D){return(D.tagName.toLowerCase()==B.tag)
})
}}g.forEach(B.classes,function(F,G,H){var D=F.charAt(F.length-1)=="*";
if(D){F=F.substr(0,F.length-1)
}var E=new RegExp("(?:^|\\s)"+F+(D?".*":"")+"(?:\\s|$)");
C=t(C,function(I){return E.test(I.className)
});
C.count=G
});
g.forEach(B.pseudos,function(D){if(z[D.name]){C=t(C,z[D.name](D.name,D.value))
}});
x(l,B,d,function(D){C=t(C,D)
});
if(!C){C=function(){return true
}
}return AB[B.query]=C
};
var AF={};
var y=function(B,F){var E=AF[B.query];
if(E){return E
}if(B.id&&!B.hasLoops&&!B.tag){return AF[B.query]=function(G){return[g.byId(B.id)]
}
}var C=AA(B);
var A;
if(B.tag&&B.id&&!B.hasLoops){A=function(H){var G=g.byId(B.id);
if(C(G)){return[G]
}}
}else{var D;
if(!B.hasLoops){A=function(G){var K=[];
var I,H=0,J=G.getElementsByTagName(B.tag);
while(I=J[H++]){K.push(I)
}return K
}
}else{A=function(G){var K=[];
var I,H=0,J=G.getElementsByTagName(B.tag);
while(I=J[H++]){if(C(I)){K.push(I)
}}return K
}
}}return AF[B.query]=A
};
var i={};
var m={"*":g.isIE?function(A){return A.all
}:function(A){return A.getElementsByTagName("*")
},">":function(D){var C=[];
var A,E=0,B=D[w];
while(A=B[E++]){if(A.nodeType==1){C.push(A)
}}return C
}};
var AH=function(A){var B=k(g.trim(A));
if(B.length==1){var C=y(B[0]);
C.nozip=true;
return C
}var D=function(G){var F=B.slice(0);
var E;
if(F[0].oper==">"){E=[G]
}else{E=y(F.shift())(G)
}return q(E,F)
};
return D
};
var AI=((document.evaluate&&!g.isSafari)?function(A){var B=A.split(" ");
if((document.evaluate)&&(A.indexOf(":")==-1)&&((true))){if(((B.length>2)&&(A.indexOf(">")==-1))||(B.length>3)||(A.indexOf("[")>=0)||((1==B.length)&&(0<=A.indexOf(".")))){return r(A)
}}return AH(A)
}:AH);
var n=function(C){if(m[C]){return m[C]
}if(0>C.indexOf(",")){return m[C]=AI(C)
}else{var A=C.split(/\s*,\s*/);
var B=function(G){var E=0;
var F=[];
var D;
while(D=A[E++]){F=F.concat(AI(D,D.indexOf(" "))(G))
}return F
};
return m[C]=B
}};
var h=0;
var AG=function(C){if(C&&C.nozip){return g.NodeList._wrap(C)
}var B=new g.NodeList();
if(!C){return B
}if(C[0]){B.push(C[0])
}if(C.length<2){return B
}h++;
C[0]["_zipIdx"]=h;
for(var D=1,A;
A=C[D];
D++){if(C[D]["_zipIdx"]!=h){B.push(A)
}A._zipIdx=h
}return B
};
g.query=function(A,B){if(A.constructor==g.NodeList){return A
}if(!g.isString(A)){return new g.NodeList(A)
}if(g.isString(B)){B=g.byId(B)
}return AG(n(A)(B||g.doc))
};
g._filterQueryResult=function(D,C){var A=new g.NodeList();
var E=(C)?o(k(C)[0]):function(){return true
};
for(var F=0,B;
B=D[F];
F++){if(E(B)){A.push(B)
}}return A
}
})()
};