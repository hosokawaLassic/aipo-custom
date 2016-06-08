dojo._xdResourceLoaded({depends:[["provide","dojo.date.locale"],["require","dojo.date"],["require","dojo.cldr.supplemental"],["require","dojo.regexp"],["require","dojo.string"],["require","dojo.i18n"],["requireLocalization","dojo.cldr","gregorian",null,"de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn","de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn"]],defineResource:function(B){if(!B._hasResource["dojo.date.locale"]){B._hasResource["dojo.date.locale"]=true;
B.provide("dojo.date.locale");
B.require("dojo.date");
B.require("dojo.cldr.supplemental");
B.require("dojo.regexp");
B.require("dojo.string");
B.require("dojo.i18n");
(function(){function E(D,H,C){return C.replace(/([a-z])\1*/ig,function(b){var G;
var Y=b.charAt(0);
var g=b.length;
var j;
var i=["abbr","wide","narrow"];
switch(Y){case"G":G=H[(g<4)?"eraAbbr":"eraNames"][D.getFullYear()<0?0:1];
break;
case"y":G=D.getFullYear();
switch(g){case 1:break;
case 2:G=String(G);
G=G.substr(G.length-2);
break;
default:j=true
}break;
case"Q":case"q":G=Math.ceil((D.getMonth()+1)/3);
j=true;
break;
case"M":case"L":var h=D.getMonth();
var l;
switch(g){case 1:case 2:G=h+1;
j=true;
break;
case 3:case 4:case 5:l=i[g-3];
break
}if(l){var Z=(Y=="L")?"standalone":"format";
var m=["months",Z,l].join("-");
G=H[m][h]
}break;
case"w":var n=0;
G=B.date.locale._getWeekOfYear(D,n);
j=true;
break;
case"d":G=D.getDate();
j=true;
break;
case"D":G=B.date.locale._getDayOfYear(D);
j=true;
break;
case"E":case"e":case"c":var a=D.getDay();
var l;
switch(g){case 1:case 2:if(Y=="e"){var c=B.cldr.supplemental.getFirstDayOfWeek(options.locale);
a=(a-c+7)%7
}if(Y!="c"){G=a+1;
j=true;
break
}case 3:case 4:case 5:l=i[g-3];
break
}if(l){var Z=(Y=="c")?"standalone":"format";
var m=["days",Z,l].join("-");
G=H[m][a]
}break;
case"a":var k=(D.getHours()<12)?"am":"pm";
G=H[k];
break;
case"h":case"H":case"K":case"k":var d=D.getHours();
switch(Y){case"h":G=(d%12)||12;
break;
case"H":G=d;
break;
case"K":G=(d%12);
break;
case"k":G=d||24;
break
}j=true;
break;
case"m":G=D.getMinutes();
j=true;
break;
case"s":G=D.getSeconds();
j=true;
break;
case"S":G=Math.round(D.getMilliseconds()*Math.pow(10,g-3));
break;
case"v":case"z":G=B.date.getTimezoneName(D);
if(G){break
}g=4;
case"Z":var e=D.getTimezoneOffset();
var f=[(e<=0?"+":"-"),B.string.pad(Math.floor(Math.abs(e)/60),2),B.string.pad(Math.abs(e)%60,2)];
if(g==4){f.splice(0,0,"GMT");
f.splice(3,0,":")
}G=f.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+C)
}if(j){G=B.string.pad(G,g)
}return G
})
}B.date.locale.format=function(V,P){P=P||{};
var S=B.i18n.normalizeLocale(P.locale);
var D=P.formatLength||"short";
var C=B.date.locale._getGregorianBundle(S);
var U=[];
var W=B.hitch(this,E,V,C);
if(P.selector=="year"){var T=V.getFullYear();
if(S.match(/^zh|^ja/)){T+="\u5E74"
}return T
}if(P.selector!="time"){var X=P.datePattern||C["dateFormat-"+D];
if(X){U.push(A(X,W))
}}if(P.selector!="date"){var Q=P.timePattern||C["timeFormat-"+D];
if(Q){U.push(A(Q,W))
}}var R=U.join(" ");
return R
};
B.date.locale.regexp=function(C){return B.date.locale._parseInfo(C).regexp
};
B.date.locale._parseInfo=function(O){O=O||{};
var Q=B.i18n.normalizeLocale(O.locale);
var D=B.date.locale._getGregorianBundle(Q);
var N=O.formatLength||"short";
var T=O.datePattern||D["dateFormat-"+N];
var C=O.timePattern||D["timeFormat-"+N];
var S;
if(O.selector=="date"){S=T
}else{if(O.selector=="time"){S=C
}else{S=T+" "+C
}}var R=[];
var P=A(S,B.hitch(this,F,R,D,O));
return{regexp:P,tokens:R,bundle:D}
};
B.date.locale.parse=function(S,D){var Z=B.date.locale._parseInfo(D);
var V=Z.tokens,C=Z.bundle;
var R=new RegExp("^"+Z.regexp+"$");
var X=R.exec(S);
if(!X){return null
}var Y=["abbr","wide","narrow"];
var Q=new Date(1972,0);
var W={};
var T="";
B.forEach(X,function(f,J){if(!J){return 
}var M=V[J-1];
var L=M.length;
switch(M.charAt(0)){case"y":if(L!=2){Q.setFullYear(f);
W.year=f
}else{if(f<100){f=Number(f);
var g=""+new Date().getFullYear();
var K=g.substring(0,2)*100;
var H=Number(g.substring(2,4));
var O=Math.min(H+20,99);
var I=(f<O)?K+f:K-100+f;
Q.setFullYear(I);
W.year=I
}else{if(D.strict){return null
}Q.setFullYear(f);
W.year=f
}}break;
case"M":if(L>2){var P=C["months-format-"+Y[L-3]].concat();
if(!D.strict){f=f.replace(".","").toLowerCase();
P=B.map(P,function(a){return a.replace(".","").toLowerCase()
})
}f=B.indexOf(P,f);
if(f==-1){return null
}}else{f--
}Q.setMonth(f);
W.month=f;
break;
case"E":case"e":var e=C["days-format-"+Y[L-3]].concat();
if(!D.strict){f=f.toLowerCase();
e=B.map(e,"".toLowerCase)
}f=B.indexOf(e,f);
if(f==-1){return null
}break;
case"d":Q.setDate(f);
W.date=f;
break;
case"D":Q.setMonth(0);
Q.setDate(f);
break;
case"a":var G=D.am||C.am;
var N=D.pm||C.pm;
if(!D.strict){var h=/\./g;
f=f.replace(h,"").toLowerCase();
G=G.replace(h,"").toLowerCase();
N=N.replace(h,"").toLowerCase()
}if(D.strict&&f!=G&&f!=N){return null
}T=(f==N)?"p":(f==G)?"a":"";
break;
case"K":if(f==24){f=0
}case"h":case"H":case"k":if(f>23){return null
}Q.setHours(f);
break;
case"m":Q.setMinutes(f);
break;
case"s":Q.setSeconds(f);
break;
case"S":Q.setMilliseconds(f)
}});
var U=Q.getHours();
if(T==="p"&&U<12){Q.setHours(U+12)
}else{if(T==="a"&&U==12){Q.setHours(0)
}}if(W.year&&Q.getFullYear()!=W.year){return null
}if(W.month&&Q.getMonth()!=W.month){return null
}if(W.date&&Q.getDate()!=W.date){return null
}return Q
};
function A(L,P,C,M){var O=function(G){return G
};
P=P||O;
C=C||O;
M=M||O;
var D=L.match(/(''|[^'])+/g);
var N=false;
B.forEach(D,function(G,H){if(!G){D[H]=""
}else{D[H]=(N?C:P)(G);
N=!N
}});
return M(D.join(""))
}function F(C,J,I,D){D=B.regexp.escapeString(D);
if(!I.strict){D=D.replace(" a"," ?a")
}return D.replace(/([a-z])\1*/ig,function(Q){var G;
var S=Q.charAt(0);
var R=Q.length;
var T="",U="";
if(I.strict){if(R>1){T="0{"+(R-1)+"}"
}if(R>2){U="0{"+(R-2)+"}"
}}else{T="0?";
U="0{0,2}"
}switch(S){case"y":G="\\d{2,4}";
break;
case"M":G=(R>2)?"\\S+":T+"[1-9]|1[0-2]";
break;
case"D":G=T+"[1-9]|"+U+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":G=T+"[1-9]|[12]\\d|3[01]";
break;
case"w":G=T+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":G="\\S+";
break;
case"h":G=T+"[1-9]|1[0-2]";
break;
case"k":G=T+"\\d|1[01]";
break;
case"H":G=T+"\\d|1\\d|2[0-3]";
break;
case"K":G=T+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":G="[0-5]\\d";
break;
case"S":G="\\d{"+R+"}";
break;
case"a":var V=I.am||J.am||"AM";
var H=I.pm||J.pm||"PM";
if(I.strict){G=V+"|"+H
}else{G=V+"|"+H;
if(V!=V.toLowerCase()){G+="|"+V.toLowerCase()
}if(H!=H.toLowerCase()){G+="|"+H.toLowerCase()
}}break;
default:G=".*"
}if(C){C.push(Q)
}return"("+G+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var A=[];
B.date.locale.addCustomFormats=function(F,E){A.push({pkg:F,name:E})
};
B.date.locale._getGregorianBundle=function(F){var E={};
B.forEach(A,function(C){var D=B.i18n.getLocalization(C.pkg,C.name,F);
E=B.mixin(E,D)
},this);
return E
}
})();
B.date.locale.addCustomFormats("dojo.cldr","gregorian");
B.date.locale.getNames=function(I,J,M,N){var L;
var A=B.date.locale._getGregorianBundle(N);
var K=[I,M,J];
if(M=="standAlone"){L=A[K.join("-")]
}K[1]="format";
return(L||A[K.join("-")]).concat()
};
B.date.locale.isWeekend=function(A,H){var F=B.cldr.supplemental.getWeekend(H);
var G=(A||new Date()).getDay();
if(F.end<F.start){F.end+=7;
if(G<F.start){G+=7
}}return G>=F.start&&G<=F.end
};
B.date.locale._getDayOfYear=function(A){return B.date.difference(new Date(A.getFullYear(),0,1),A)+1
};
B.date.locale._getWeekOfYear=function(A,I){if(arguments.length==1){I=0
}var H=new Date(A.getFullYear(),0,1).getDay();
var J=(H-I+7)%7;
var G=Math.floor((B.date.locale._getDayOfYear(A)+J-1)/7);
if(H==I){G++
}return G
}
}}});