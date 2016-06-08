if(!dojo._hasResource["dojo.number"]){dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","number",null,"de,de-de,en,en-ca,en-us,es,es-es,fr,it,ja-jp,ko-kr,ROOT,pt,zh-cn,zh-tw");
dojo.require("dojo.string");
dojo.require("dojo.regexp");
dojo.number.format=function(G,I){I=dojo.mixin({},I||{});
var F=dojo.i18n.normalizeLocale(I.locale);
var J=dojo.i18n.getLocalization("dojo.cldr","number",F);
I.customs=J;
var H=I.pattern||J[(I.type||"decimal")+"Format"];
if(isNaN(G)){return null
}return dojo.number._applyPattern(G,H,I)
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(Q,R,N){N=N||{};
var P=N.customs.group;
var L=N.customs.decimal;
var M=R.split(";");
var O=M[0];
R=M[(Q<0)?1:0]||("-"+O);
if(R.indexOf("%")!=-1){Q*=100
}else{if(R.indexOf("\u2030")!=-1){Q*=1000
}else{if(R.indexOf("\u00a4")!=-1){P=N.customs.currencyGroup||P;
L=N.customs.currencyDecimal||L;
R=R.replace(/\u00a4{1,3}/,function(B){var A=["symbol","currency","displayName"][B.length-1];
return N[A]||N.currency||""
})
}else{if(R.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var J=dojo.number._numberPatternRE;
var K=O.match(J);
if(!K){throw new Error("unable to find a number expression in pattern: "+R)
}return R.replace(J,dojo.number._formatAbsolute(Q,K[0],{decimal:L,group:P,places:N.places}))
};
dojo.number.round=function(H,L,G){var I=String(H).split(".");
var J=(I[1]&&I[1].length)||0;
if(J>L){var K=Math.pow(10,L);
if(G>0){K*=10/G;
L++
}H=Math.round(H*K)/K;
I=String(H).split(".");
J=(I[1]&&I[1].length)||0;
if(J>L){I[1]=I[1].substr(0,L);
H=Number(I.join("."))
}}return H
};
dojo.number._formatAbsolute=function(a,c,V){V=V||{};
if(V.places===true){V.places=0
}if(V.places===Infinity){V.places=6
}var S=c.split(".");
var W=(V.places>=0)?V.places:(S[1]&&S[1].length)||0;
if(!(V.round<0)){a=dojo.number.round(a,W,V.round)
}var d=String(Math.abs(a)).split(".");
var f=d[1]||"";
if(V.places){d[1]=dojo.string.pad(f.substr(0,V.places),V.places,"0",true)
}else{if(S[1]&&V.places!==0){var g=S[1].lastIndexOf("0")+1;
if(g>f.length){d[1]=dojo.string.pad(f,g,"0",true)
}var U=S[1].length;
if(U<f.length){d[1]=f.substr(0,U)
}}else{if(d[1]){d.pop()
}}}var Y=S[0].replace(",","");
g=Y.indexOf("0");
if(g!=-1){g=Y.length-g;
if(g>d[0].length){d[0]=dojo.string.pad(d[0],g)
}if(Y.indexOf("#")==-1){d[0]=d[0].substr(d[0].length-g)
}}var e=S[0].lastIndexOf(",");
var Z,T;
if(e!=-1){Z=S[0].length-e-1;
var X=S[0].substr(0,e);
e=X.lastIndexOf(",");
if(e!=-1){T=X.length-e-1
}}var h=[];
for(var b=d[0];
b;
){var R=b.length-Z;
h.push((R>0)?b.substr(R):b);
b=(R>0)?b.slice(0,R):"";
if(T){Z=T;
delete T
}}d[0]=h.reverse().join(V.group||",");
return d.join(V.decimal||".")
};
dojo.number.regexp=function(B){return dojo.number._parseInfo(B).regexp
};
dojo.number._parseInfo=function(P){P=P||{};
var S=dojo.i18n.normalizeLocale(P.locale);
var O=dojo.i18n.getLocalization("dojo.cldr","number",S);
var K=P.pattern||O[(P.type||"decimal")+"Format"];
var R=O.group;
var L=O.decimal;
var T=1;
if(K.indexOf("%")!=-1){T/=100
}else{if(K.indexOf("\u2030")!=-1){T/=1000
}else{var M=K.indexOf("\u00a4")!=-1;
if(M){R=O.currencyGroup||R;
L=O.currencyDecimal||L
}}}var N=K.split(";");
if(N.length==1){N.push("-"+N[0])
}var Q=dojo.regexp.buildGroupRE(N,function(A){A="(?:"+dojo.regexp.escapeString(A,".")+")";
return A.replace(dojo.number._numberPatternRE,function(C){var F={signed:false,separator:P.strict?R:[R,""],fractional:P.fractional,decimal:L,exponent:false};
var D=C.split(".");
var E=P.places;
if(D.length==1||E===0){F.fractional=false
}else{if(typeof E=="undefined"){E=D[1].lastIndexOf("0")+1
}if(E&&P.fractional==undefined){F.fractional=true
}if(!P.places&&(E<D[1].length)){E+=","+D[1].length
}F.places=E
}var B=D[0].split(",");
if(B.length>1){F.groupSize=B.pop().length;
if(B.length>1){F.groupSize2=B.pop().length
}}return"("+dojo.number._realNumberRegexp(F)+")"
})
},true);
if(M){Q=Q.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(B,F,E,D){var C=["symbol","currency","displayName"][E.length-1];
var A=dojo.regexp.escapeString(P[C]||P.currency||"");
F=F?"\\s":"";
D=D?"\\s":"";
if(!P.strict){if(F){F+="*"
}if(D){D+="*"
}return"(?:"+F+A+D+")?"
}return F+A+D
})
}return{regexp:Q.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:R,decimal:L,factor:T}
};
dojo.number.parse=function(H,F){var I=dojo.number._parseInfo(F);
var J=(new RegExp("^"+I.regexp+"$")).exec(H);
if(!J){return NaN
}var G=J[1];
if(!J[1]){if(!J[2]){return NaN
}G=J[2];
I.factor*=-1
}G=G.replace(new RegExp("["+I.group+"\\s\\xa0]","g"),"").replace(I.decimal,".");
return Number(G)*I.factor
};
dojo.number._realNumberRegexp=function(F){F=F||{};
if(typeof F.places=="undefined"){F.places=Infinity
}if(typeof F.decimal!="string"){F.decimal="."
}if(typeof F.fractional=="undefined"||/^0/.test(F.places)){F.fractional=[true,false]
}if(typeof F.exponent=="undefined"){F.exponent=[true,false]
}if(typeof F.eSigned=="undefined"){F.eSigned=[true,false]
}var J=dojo.number._integerRegexp(F);
var G=dojo.regexp.buildGroupRE(F.fractional,function(A){var B="";
if(A&&(F.places!==0)){B="\\"+F.decimal;
if(F.places==Infinity){B="(?:"+B+"\\d+)?"
}else{B+="\\d{"+F.places+"}"
}}return B
},true);
var I=dojo.regexp.buildGroupRE(F.exponent,function(A){if(A){return"([eE]"+dojo.number._integerRegexp({signed:F.eSigned})+")"
}return""
});
var H=J+G;
if(G){H="(?:(?:"+H+")|(?:"+G+"))"
}return H+I
};
dojo.number._integerRegexp=function(D){D=D||{};
if(typeof D.signed=="undefined"){D.signed=[true,false]
}if(typeof D.separator=="undefined"){D.separator=""
}else{if(typeof D.groupSize=="undefined"){D.groupSize=3
}}var F=dojo.regexp.buildGroupRE(D.signed,function(A){return A?"[-+]":""
},true);
var E=dojo.regexp.buildGroupRE(D.separator,function(B){if(!B){return"(?:0|[1-9]\\d*)"
}B=dojo.regexp.escapeString(B);
if(B==" "){B="\\s"
}else{if(B=="\xa0"){B="\\s\\xa0"
}}var H=D.groupSize,C=D.groupSize2;
if(C){var A="(?:0|[1-9]\\d{0,"+(C-1)+"}(?:["+B+"]\\d{"+C+"})*["+B+"]\\d{"+H+"})";
return((H-C)>0)?"(?:"+A+"|(?:0|[1-9]\\d{0,"+(H-1)+"}))":A
}return"(?:0|[1-9]\\d{0,"+(H-1)+"}(?:["+B+"]\\d{"+H+"})*)"
},true);
return F+E
}
};