dojo._xdResourceLoaded({depends:[["provide","dojo._base.query"],["require","dojo._base.NodeList"]],defineResource:function(B){if(!B._hasResource["dojo._base.query"]){B._hasResource["dojo._base.query"]=true;
B.provide("dojo._base.query");
B.require("dojo._base.NodeList");
(function(){var A=B;
var v=B.isIE?"children":"childNodes";
var j=function(N){if(N.charAt(N.length-1)==">"){N+=" *"
}N+=" ";
var X=function(Z,a){return A.trim(N.slice(Z,a))
};
var E=[];
var M=-1;
var R=-1;
var G=-1;
var O=-1;
var Y=-1;
var T=-1;
var H=-1;
var C="";
var D="";
var P;
var I=0;
var W=N.length;
var V=null;
var Q=null;
var J=function(){if(H>=0){var Z=(H==I)?null:X(H,I).toLowerCase();
V[(">~+".indexOf(Z)<0)?"tag":"oper"]=Z;
H=-1
}};
var S=function(){if(T>=0){V.id=X(T,I).replace(/\\/g,"");
T=-1
}};
var K=function(){if(Y>=0){V.classes.push(X(Y+1,I).replace(/\\/g,""));
Y=-1
}};
var F=function(){S();
J();
K()
};
for(;
I<W,C=D,D=N.charAt(I);
I++){if(C=="\\"){continue
}if(!V){P=I;
V={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null};
H=I
}if(M>=0){if(D=="]"){if(!Q.attr){Q.attr=X(M+1,I)
}else{Q.matchFor=X((G||M+1),I)
}var U=Q.matchFor;
if(U){if((U.charAt(0)=='"')||(U.charAt(0)=="'")){Q.matchFor=U.substring(1,U.length-1)
}}V.attrs.push(Q);
Q=null;
M=G=-1
}else{if(D=="="){var L=("|~^$*".indexOf(C)>=0)?C:"";
Q.type=L+D;
Q.attr=X(M+1,I-L.length);
G=I+1
}}}else{if(R>=0){if(D==")"){if(O>=0){Q.value=X(R+1,I)
}O=R=-1
}}else{if(D=="#"){F();
T=I+1
}else{if(D=="."){F();
Y=I
}else{if(D==":"){F();
O=I
}else{if(D=="["){F();
M=I;
Q={}
}else{if(D=="("){if(O>=0){Q={name:X(O+1,I),value:null};
V.pseudos.push(Q)
}R=I
}else{if(D==" "&&C!=D){F();
if(O>=0){V.pseudos.push({name:X(O+1,I)})
}V.hasLoops=(V.pseudos.length||V.attrs.length||V.classes.length);
V.query=X(P,I);
V.tag=(V.oper)?null:(V.tag||"*");
E.push(V);
V=null
}}}}}}}}}return E
};
var i={"*=":function(D,C){return"[contains(@"+D+", '"+C+"')]"
},"^=":function(D,C){return"[starts-with(@"+D+", '"+C+"')]"
},"$=":function(D,C){return"[substring(@"+D+", string-length(@"+D+")-"+(C.length-1)+")='"+C+"']"
},"~=":function(D,C){return"[contains(concat(' ',@"+D+",' '), ' "+C+" ')]"
},"|=":function(D,C){return"[contains(concat(' ',@"+D+",' '), ' "+C+"-')]"
},"=":function(D,C){return"[@"+D+"='"+C+"']"
}};
var w=function(D,E,F,C){A.forEach(E.attrs,function(H){var G;
if(H.type&&D[H.type]){G=D[H.type](H.attr,H.matchFor)
}else{if(H.attr.length){G=F(H.attr)
}}if(G){C(G)
}})
};
var AC=function(C){var F=".";
var D=j(A.trim(C));
while(D.length){var G=D.shift();
var E;
if(G.oper==">"){E="/";
G=D.shift()
}else{E="//"
}F+=E+G.tag;
if(G.id){F+="[@id='"+G.id+"'][1]"
}A.forEach(G.classes,function(J){var I=J.length;
var H=" ";
if(J.charAt(I-1)=="*"){H="";
J=J.substr(0,I-1)
}F+="[contains(concat(' ',@class,' '), ' "+J+H+"')]"
});
w(i,G,function(H){return"[@"+H+"]"
},function(H){F+=H
})
}return F
};
var r={};
var q=function(C){if(r[C]){return r[C]
}var D=A.doc;
var F=AC(C);
var E=function(K){var G=[];
var H;
try{H=D.evaluate(F,K,null,XPathResult.ANY_TYPE,null)
}catch(J){console.debug("failure in exprssion:",F,"under:",K);
console.debug(J)
}var I=H.iterateNext();
while(I){G.push(I);
I=H.iterateNext()
}return G
};
return r[C]=E
};
var o={};
var AA={};
var s=function(C,D){if(!C){return D
}if(!D){return C
}return function(){return C.apply(window,arguments)&&D.apply(window,arguments)
}
};
var t=function(H,O,F,C){var L=C+1;
var M=(O.length==L);
var N=O[C];
if(N.oper==">"){var E=H[v];
if(!E||!E.length){return 
}L++;
M=(O.length==L);
var J=n(O[C+1]);
for(var D=0,K=E.length,I;
D<K,I=E[D];
D++){if(J(I)){if(M){F.push(I)
}else{t(I,O,F,L)
}}}}var G=x(N)(H);
if(M){while(G.length){F.push(G.shift())
}}else{while(G.length){t(G.shift(),O,F,L)
}}};
var p=function(D,E){var F=[];
var G=D.length-1,C;
while(C=D[G--]){t(C,E,F,0)
}return F
};
var n=function(C){if(o[C.query]){return o[C.query]
}var D=null;
if(C.tag){if(C.tag=="*"){D=s(D,function(E){return(E.nodeType==1)
})
}else{D=s(D,function(E){return((E.nodeType==1)&&(C.tag==E.tagName.toLowerCase()))
})
}}if(C.id){D=s(D,function(E){return((E.nodeType==1)&&(E.id==C.id))
})
}if(C.hasLoops){D=s(D,z(C))
}return o[C.query]=D
};
var AD=function(C){var E=C.parentNode;
var F=E.childNodes;
var H=-1;
var J=E.firstChild;
if(!J){return H
}var D=C.__cachedIndex;
var G=E.__cachedLength;
if(((typeof G=="number")&&(G!=F.length))||(typeof D!="number")){E.__cachedLength=F.length;
var I=1;
do{if(J===C){H=I
}if(J.nodeType==1){J.__cachedIndex=I;
I++
}J=J.nextSibling
}while(J)
}else{H=D
}return H
};
var AI=0;
var u="";
var AB=function(C,D){if(D=="class"){return C.className||u
}if(D=="for"){return C.htmlFor||u
}return C.getAttribute(D,2)||u
};
var k={"*=":function(D,C){return function(E){return(AB(E,D).indexOf(C)>=0)
}
},"^=":function(D,C){return function(E){return(AB(E,D).indexOf(C)==0)
}
},"$=":function(E,C){var D=" "+C;
return function(F){var G=" "+AB(F,E);
return(G.lastIndexOf(C)==(G.length-C.length))
}
},"~=":function(E,C){var D=" "+C+" ";
return function(F){var G=" "+AB(F,E)+" ";
return(G.indexOf(D)>=0)
}
},"|=":function(E,C){var D=" "+C+"-";
return function(F){var G=" "+(F.getAttribute(E,2)||"");
return((G==C)||(G.indexOf(D)==0))
}
},"=":function(D,C){return function(E){return(AB(E,D)==C)
}
}};
var y={"first-child":function(D,C){return function(E){if(E.nodeType!=1){return false
}var F=E.previousSibling;
while(F&&(F.nodeType!=1)){F=F.previousSibling
}return(!F)
}
},"last-child":function(D,C){return function(F){if(F.nodeType!=1){return false
}var E=F.nextSibling;
while(E&&(E.nodeType!=1)){E=E.nextSibling
}return(!E)
}
},empty:function(D,C){return function(F){var E=F.childNodes;
var H=F.childNodes.length;
for(var I=H-1;
I>=0;
I--){var G=E[I].nodeType;
if((G==1)||(G==3)){return false
}}return true
}
},not:function(E,C){var D=n(j(C)[0]);
return function(F){return(!D(F))
}
},"nth-child":function(G,C){var D=parseInt;
if(C=="odd"){return function(J){return(((AD(J))%2)==1)
}
}else{if((C=="2n")||(C=="even")){return function(J){return((AD(J)%2)==0)
}
}else{if(C.indexOf("0n+")==0){var E=D(C.substr(3));
return function(J){return(J.parentNode[v][E-1]===J)
}
}else{if((C.indexOf("n+")>0)&&(C.length>3)){var F=C.split("n+",2);
var H=D(F[0]);
var I=D(F[1]);
return function(J){return((AD(J)%H)==I)
}
}else{if(C.indexOf("n")==-1){var E=D(C);
return function(J){return(AD(J)==E)
}
}}}}}}};
var AJ=(A.isIE)?function(D){var C=D.toLowerCase();
return function(E){return E[D]||E[C]
}
}:function(C){return function(D){return(D&&D.getAttribute&&D.hasAttribute(C))
}
};
var z=function(D){var C=(AA[D.query]||o[D.query]);
if(C){return C
}var E=null;
if(D.id){if(D.tag!="*"){E=s(E,function(F){return(F.tagName.toLowerCase()==D.tag)
})
}}A.forEach(D.classes,function(G,H,I){var J=G.charAt(G.length-1)=="*";
if(J){G=G.substr(0,G.length-1)
}var F=new RegExp("(?:^|\\s)"+G+(J?".*":"")+"(?:\\s|$)");
E=s(E,function(K){return F.test(K.className)
});
E.count=H
});
A.forEach(D.pseudos,function(F){if(y[F.name]){E=s(E,y[F.name](F.name,F.value))
}});
w(k,D,AJ,function(F){E=s(E,F)
});
if(!E){E=function(){return true
}
}return AA[D.query]=E
};
var AE={};
var x=function(D,H){var G=AE[D.query];
if(G){return G
}if(D.id&&!D.hasLoops&&!D.tag){return AE[D.query]=function(I){return[A.byId(D.id)]
}
}var E=z(D);
var C;
if(D.tag&&D.id&&!D.hasLoops){C=function(I){var J=A.byId(D.id);
if(E(J)){return[J]
}}
}else{var F;
if(!D.hasLoops){C=function(M){var L=[];
var J,I=0,K=M.getElementsByTagName(D.tag);
while(J=K[I++]){L.push(J)
}return L
}
}else{C=function(M){var L=[];
var J,I=0,K=M.getElementsByTagName(D.tag);
while(J=K[I++]){if(E(J)){L.push(J)
}}return L
}
}}return AE[D.query]=C
};
var h={};
var l={"*":A.isIE?function(C){return C.all
}:function(C){return C.getElementsByTagName("*")
},">":function(F){var E=[];
var C,G=0,D=F[v];
while(C=D[G++]){if(C.nodeType==1){E.push(C)
}}return E
}};
var AG=function(C){var D=j(A.trim(C));
if(D.length==1){var E=x(D[0]);
E.nozip=true;
return E
}var F=function(I){var H=D.slice(0);
var G;
if(H[0].oper==">"){G=[I]
}else{G=x(H.shift())(I)
}return p(G,H)
};
return F
};
var AH=((document.evaluate&&!A.isSafari)?function(C){var D=C.split(" ");
if((document.evaluate)&&(C.indexOf(":")==-1)&&((true))){if(((D.length>2)&&(C.indexOf(">")==-1))||(D.length>3)||(C.indexOf("[")>=0)||((1==D.length)&&(0<=C.indexOf(".")))){return q(C)
}}return AG(C)
}:AG);
var m=function(E){if(l[E]){return l[E]
}if(0>E.indexOf(",")){return l[E]=AH(E)
}else{var C=E.split(/\s*,\s*/);
var D=function(I){var G=0;
var H=[];
var F;
while(F=C[G++]){H=H.concat(AH(F,F.indexOf(" "))(I))
}return H
};
return l[E]=D
}};
var d=0;
var AF=function(E){if(E&&E.nozip){return A.NodeList._wrap(E)
}var D=new A.NodeList();
if(!E){return D
}if(E[0]){D.push(E[0])
}if(E.length<2){return D
}d++;
E[0]["_zipIdx"]=d;
for(var F=1,C;
C=E[F];
F++){if(E[F]["_zipIdx"]!=d){D.push(C)
}C._zipIdx=d
}return D
};
A.query=function(C,D){if(C.constructor==A.NodeList){return C
}if(!A.isString(C)){return new A.NodeList(C)
}if(A.isString(D)){D=A.byId(D)
}return AF(m(C)(D||A.doc))
};
A._filterQueryResult=function(F,E){var C=new A.NodeList();
var G=(E)?n(j(E)[0]):function(){return true
};
for(var H=0,D;
D=F[H];
H++){if(G(D)){C.push(D)
}}return C
}
})()
}}});