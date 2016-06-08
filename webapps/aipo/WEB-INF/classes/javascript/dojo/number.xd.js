dojo._xdResourceLoaded({depends:[["provide","dojo.number"],["require","dojo.i18n"],["requireLocalization","dojo.cldr","number",null,"de,de-de,en,en-ca,en-us,es,es-es,fr,it,ja-jp,ko-kr,ROOT,pt,zh-cn,zh-tw","de,de-de,en,en-ca,en-us,es,es-es,fr,it,ja-jp,ko-kr,ROOT,pt,zh-cn,zh-tw"],["require","dojo.string"],["require","dojo.regexp"]],defineResource:function(B){if(!B._hasResource["dojo.number"]){B._hasResource["dojo.number"]=true;
B.provide("dojo.number");
B.require("dojo.i18n");
B.require("dojo.string");
B.require("dojo.regexp");
B.number.format=function(A,H){H=B.mixin({},H||{});
var J=B.i18n.normalizeLocale(H.locale);
var I=B.i18n.getLocalization("dojo.cldr","number",J);
H.customs=I;
var G=H.pattern||I[(H.type||"decimal")+"Format"];
if(isNaN(A)){return null
}return B.number._applyPattern(A,G,H)
};
B.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
B.number._applyPattern=function(P,Q,M){M=M||{};
var O=M.customs.group;
var K=M.customs.decimal;
var L=Q.split(";");
var N=L[0];
Q=L[(P<0)?1:0]||("-"+N);
if(Q.indexOf("%")!=-1){P*=100
}else{if(Q.indexOf("\u2030")!=-1){P*=1000
}else{if(Q.indexOf("\u00a4")!=-1){O=M.customs.currencyGroup||O;
K=M.customs.currencyDecimal||K;
Q=Q.replace(/\u00a4{1,3}/,function(D){var C=["symbol","currency","displayName"][D.length-1];
return M[C]||M.currency||""
})
}else{if(Q.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var R=B.number._numberPatternRE;
var A=N.match(R);
if(!A){throw new Error("unable to find a number expression in pattern: "+Q)
}return Q.replace(R,B.number._formatAbsolute(P,A[0],{decimal:K,group:O,places:M.places}))
};
B.number.round=function(A,K,L){var H=String(A).split(".");
var I=(H[1]&&H[1].length)||0;
if(I>K){var J=Math.pow(10,K);
if(L>0){J*=10/L;
K++
}A=Math.round(A*J)/J;
H=String(A).split(".");
I=(H[1]&&H[1].length)||0;
if(I>K){H[1]=H[1].substr(0,K);
A=Number(H.join("."))
}}return A
};
B.number._formatAbsolute=function(Z,b,U){U=U||{};
if(U.places===true){U.places=0
}if(U.places===Infinity){U.places=6
}var A=b.split(".");
var V=(U.places>=0)?U.places:(A[1]&&A[1].length)||0;
if(!(U.round<0)){Z=B.number.round(Z,V,U.round)
}var c=String(Math.abs(Z)).split(".");
var e=c[1]||"";
if(U.places){c[1]=B.string.pad(e.substr(0,U.places),U.places,"0",true)
}else{if(A[1]&&U.places!==0){var f=A[1].lastIndexOf("0")+1;
if(f>e.length){c[1]=B.string.pad(e,f,"0",true)
}var T=A[1].length;
if(T<e.length){c[1]=e.substr(0,T)
}}else{if(c[1]){c.pop()
}}}var X=A[0].replace(",","");
f=X.indexOf("0");
if(f!=-1){f=X.length-f;
if(f>c[0].length){c[0]=B.string.pad(c[0],f)
}if(X.indexOf("#")==-1){c[0]=c[0].substr(c[0].length-f)
}}var d=A[0].lastIndexOf(",");
var Y,S;
if(d!=-1){Y=A[0].length-d-1;
var W=A[0].substr(0,d);
d=W.lastIndexOf(",");
if(d!=-1){S=W.length-d-1
}}var g=[];
for(var a=c[0];
a;
){var h=a.length-Y;
g.push((h>0)?a.substr(h):a);
a=(h>0)?a.slice(0,h):"";
if(S){Y=S;
delete S
}}c[0]=g.reverse().join(U.group||",");
return c.join(U.decimal||".")
};
B.number.regexp=function(A){return B.number._parseInfo(A).regexp
};
B.number._parseInfo=function(O){O=O||{};
var R=B.i18n.normalizeLocale(O.locale);
var N=B.i18n.getLocalization("dojo.cldr","number",R);
var T=O.pattern||N[(O.type||"decimal")+"Format"];
var Q=N.group;
var A=N.decimal;
var S=1;
if(T.indexOf("%")!=-1){S/=100
}else{if(T.indexOf("\u2030")!=-1){S/=1000
}else{var L=T.indexOf("\u00a4")!=-1;
if(L){Q=N.currencyGroup||Q;
A=N.currencyDecimal||A
}}}var M=T.split(";");
if(M.length==1){M.push("-"+M[0])
}var P=B.regexp.buildGroupRE(M,function(C){C="(?:"+B.regexp.escapeString(C,".")+")";
return C.replace(B.number._numberPatternRE,function(D){var G={signed:false,separator:O.strict?Q:[Q,""],fractional:O.fractional,decimal:A,exponent:false};
var E=D.split(".");
var F=O.places;
if(E.length==1||F===0){G.fractional=false
}else{if(typeof F=="undefined"){F=E[1].lastIndexOf("0")+1
}if(F&&O.fractional==undefined){G.fractional=true
}if(!O.places&&(F<E[1].length)){F+=","+E[1].length
}G.places=F
}var H=E[0].split(",");
if(H.length>1){G.groupSize=H.pop().length;
if(H.length>1){G.groupSize2=H.pop().length
}}return"("+B.number._realNumberRegexp(G)+")"
})
},true);
if(L){P=P.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(C,G,F,E){var D=["symbol","currency","displayName"][F.length-1];
var H=B.regexp.escapeString(O[D]||O.currency||"");
G=G?"\\s":"";
E=E?"\\s":"";
if(!O.strict){if(G){G+="*"
}if(E){E+="*"
}return"(?:"+G+H+E+")?"
}return G+H+E
})
}return{regexp:P.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:Q,decimal:A,factor:S}
};
B.number.parse=function(G,J){var H=B.number._parseInfo(J);
var I=(new RegExp("^"+H.regexp+"$")).exec(G);
if(!I){return NaN
}var A=I[1];
if(!I[1]){if(!I[2]){return NaN
}A=I[2];
H.factor*=-1
}A=A.replace(new RegExp("["+H.group+"\\s\\xa0]","g"),"").replace(H.decimal,".");
return Number(A)*H.factor
};
B.number._realNumberRegexp=function(J){J=J||{};
if(typeof J.places=="undefined"){J.places=Infinity
}if(typeof J.decimal!="string"){J.decimal="."
}if(typeof J.fractional=="undefined"||/^0/.test(J.places)){J.fractional=[true,false]
}if(typeof J.exponent=="undefined"){J.exponent=[true,false]
}if(typeof J.eSigned=="undefined"){J.eSigned=[true,false]
}var I=B.number._integerRegexp(J);
var A=B.regexp.buildGroupRE(J.fractional,function(C){var D="";
if(C&&(J.places!==0)){D="\\"+J.decimal;
if(J.places==Infinity){D="(?:"+D+"\\d+)?"
}else{D+="\\d{"+J.places+"}"
}}return D
},true);
var H=B.regexp.buildGroupRE(J.exponent,function(C){if(C){return"([eE]"+B.number._integerRegexp({signed:J.eSigned})+")"
}return""
});
var G=I+A;
if(A){G="(?:(?:"+G+")|(?:"+A+"))"
}return G+H
};
B.number._integerRegexp=function(F){F=F||{};
if(typeof F.signed=="undefined"){F.signed=[true,false]
}if(typeof F.separator=="undefined"){F.separator=""
}else{if(typeof F.groupSize=="undefined"){F.groupSize=3
}}var E=B.regexp.buildGroupRE(F.signed,function(C){return C?"[-+]":""
},true);
var A=B.regexp.buildGroupRE(F.separator,function(D){if(!D){return"(?:0|[1-9]\\d*)"
}D=B.regexp.escapeString(D);
if(D==" "){D="\\s"
}else{if(D=="\xa0"){D="\\s\\xa0"
}}var J=F.groupSize,I=F.groupSize2;
if(I){var C="(?:0|[1-9]\\d{0,"+(I-1)+"}(?:["+D+"]\\d{"+I+"})*["+D+"]\\d{"+J+"})";
return((J-I)>0)?"(?:"+C+"|(?:0|[1-9]\\d{0,"+(J-1)+"}))":C
}return"(?:0|[1-9]\\d{0,"+(J-1)+"}(?:["+D+"]\\d{"+J+"})*)"
},true);
return E+A
}
}}});