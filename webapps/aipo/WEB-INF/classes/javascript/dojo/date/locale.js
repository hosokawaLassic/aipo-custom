if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.require("dojo.date");
dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.regexp");
dojo.require("dojo.string");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","gregorian",null,"de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn");
(function(){function F(B,C,A){return A.replace(/([a-z])\1*/ig,function(b){var X;
var Y=b.charAt(0);
var g=b.length;
var j;
var i=["abbr","wide","narrow"];
switch(Y){case"G":X=C[(g<4)?"eraAbbr":"eraNames"][B.getFullYear()<0?0:1];
break;
case"y":X=B.getFullYear();
switch(g){case 1:break;
case 2:X=String(X);
X=X.substr(X.length-2);
break;
default:j=true
}break;
case"Q":case"q":X=Math.ceil((B.getMonth()+1)/3);
j=true;
break;
case"M":case"L":var h=B.getMonth();
var l;
switch(g){case 1:case 2:X=h+1;
j=true;
break;
case 3:case 4:case 5:l=i[g-3];
break
}if(l){var Z=(Y=="L")?"standalone":"format";
var m=["months",Z,l].join("-");
X=C[m][h]
}break;
case"w":var n=0;
X=dojo.date.locale._getWeekOfYear(B,n);
j=true;
break;
case"d":X=B.getDate();
j=true;
break;
case"D":X=dojo.date.locale._getDayOfYear(B);
j=true;
break;
case"E":case"e":case"c":var a=B.getDay();
var l;
switch(g){case 1:case 2:if(Y=="e"){var c=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
a=(a-c+7)%7
}if(Y!="c"){X=a+1;
j=true;
break
}case 3:case 4:case 5:l=i[g-3];
break
}if(l){var Z=(Y=="c")?"standalone":"format";
var m=["days",Z,l].join("-");
X=C[m][a]
}break;
case"a":var k=(B.getHours()<12)?"am":"pm";
X=C[k];
break;
case"h":case"H":case"K":case"k":var d=B.getHours();
switch(Y){case"h":X=(d%12)||12;
break;
case"H":X=d;
break;
case"K":X=(d%12);
break;
case"k":X=d||24;
break
}j=true;
break;
case"m":X=B.getMinutes();
j=true;
break;
case"s":X=B.getSeconds();
j=true;
break;
case"S":X=Math.round(B.getMilliseconds()*Math.pow(10,g-3));
break;
case"v":case"z":X=dojo.date.getTimezoneName(B);
if(X){break
}g=4;
case"Z":var e=B.getTimezoneOffset();
var f=[(e<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(e)/60),2),dojo.string.pad(Math.abs(e)%60,2)];
if(g==4){f.splice(0,0,"GMT");
f.splice(3,0,":")
}X=f.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+A)
}if(j){X=dojo.string.pad(X,g)
}return X
})
}dojo.date.locale.format=function(U,O){O=O||{};
var R=dojo.i18n.normalizeLocale(O.locale);
var C=O.formatLength||"short";
var B=dojo.date.locale._getGregorianBundle(R);
var T=[];
var V=dojo.hitch(this,F,U,B);
if(O.selector=="year"){var S=U.getFullYear();
if(R.match(/^zh|^ja/)){S+="\u5E74"
}return S
}if(O.selector!="time"){var A=O.datePattern||B["dateFormat-"+C];
if(A){T.push(E(A,V))
}}if(O.selector!="date"){var P=O.timePattern||B["timeFormat-"+C];
if(P){T.push(E(P,V))
}}var Q=T.join(" ");
return Q
};
dojo.date.locale.regexp=function(A){return dojo.date.locale._parseInfo(A).regexp
};
dojo.date.locale._parseInfo=function(N){N=N||{};
var P=dojo.i18n.normalizeLocale(N.locale);
var C=dojo.date.locale._getGregorianBundle(P);
var M=N.formatLength||"short";
var A=N.datePattern||C["dateFormat-"+M];
var B=N.timePattern||C["timeFormat-"+M];
var R;
if(N.selector=="date"){R=A
}else{if(N.selector=="time"){R=B
}else{R=A+" "+B
}}var Q=[];
var O=E(R,dojo.hitch(this,D,Q,C,N));
return{regexp:O,tokens:Q,bundle:C}
};
dojo.date.locale.parse=function(R,C){var A=dojo.date.locale._parseInfo(C);
var U=A.tokens,B=A.bundle;
var Q=new RegExp("^"+A.regexp+"$");
var W=Q.exec(R);
if(!W){return null
}var X=["abbr","wide","narrow"];
var P=new Date(1972,0);
var V={};
var S="";
dojo.forEach(W,function(g,K){if(!K){return 
}var N=U[K-1];
var M=N.length;
switch(N.charAt(0)){case"y":if(M!=2){P.setFullYear(g);
V.year=g
}else{if(g<100){g=Number(g);
var h=""+new Date().getFullYear();
var L=h.substring(0,2)*100;
var I=Number(h.substring(2,4));
var d=Math.min(I+20,99);
var J=(g<d)?L+g:L-100+g;
P.setFullYear(J);
V.year=J
}else{if(C.strict){return null
}P.setFullYear(g);
V.year=g
}}break;
case"M":if(M>2){var e=B["months-format-"+X[M-3]].concat();
if(!C.strict){g=g.replace(".","").toLowerCase();
e=dojo.map(e,function(Y){return Y.replace(".","").toLowerCase()
})
}g=dojo.indexOf(e,g);
if(g==-1){return null
}}else{g--
}P.setMonth(g);
V.month=g;
break;
case"E":case"e":var f=B["days-format-"+X[M-3]].concat();
if(!C.strict){g=g.toLowerCase();
f=dojo.map(f,"".toLowerCase)
}g=dojo.indexOf(f,g);
if(g==-1){return null
}break;
case"d":P.setDate(g);
V.date=g;
break;
case"D":P.setMonth(0);
P.setDate(g);
break;
case"a":var H=C.am||B.am;
var O=C.pm||B.pm;
if(!C.strict){var G=/\./g;
g=g.replace(G,"").toLowerCase();
H=H.replace(G,"").toLowerCase();
O=O.replace(G,"").toLowerCase()
}if(C.strict&&g!=H&&g!=O){return null
}S=(g==O)?"p":(g==H)?"a":"";
break;
case"K":if(g==24){g=0
}case"h":case"H":case"k":if(g>23){return null
}P.setHours(g);
break;
case"m":P.setMinutes(g);
break;
case"s":P.setSeconds(g);
break;
case"S":P.setMilliseconds(g)
}});
var T=P.getHours();
if(S==="p"&&T<12){P.setHours(T+12)
}else{if(S==="a"&&T==12){P.setHours(0)
}}if(V.year&&P.getFullYear()!=V.year){return null
}if(V.month&&P.getMonth()!=V.month){return null
}if(V.date&&P.getDate()!=V.date){return null
}return P
};
function E(C,N,A,K){var M=function(G){return G
};
N=N||M;
A=A||M;
K=K||M;
var B=C.match(/(''|[^'])+/g);
var L=false;
dojo.forEach(B,function(H,G){if(!H){B[G]=""
}else{B[G]=(L?A:N)(H);
L=!L
}});
return K(B.join(""))
}function D(A,H,C,B){B=dojo.regexp.escapeString(B);
if(!C.strict){B=B.replace(" a"," ?a")
}return B.replace(/([a-z])\1*/ig,function(R){var P;
var T=R.charAt(0);
var S=R.length;
var U="",V="";
if(C.strict){if(S>1){U="0{"+(S-1)+"}"
}if(S>2){V="0{"+(S-2)+"}"
}}else{U="0?";
V="0{0,2}"
}switch(T){case"y":P="\\d{2,4}";
break;
case"M":P=(S>2)?"\\S+":U+"[1-9]|1[0-2]";
break;
case"D":P=U+"[1-9]|"+V+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":P=U+"[1-9]|[12]\\d|3[01]";
break;
case"w":P=U+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":P="\\S+";
break;
case"h":P=U+"[1-9]|1[0-2]";
break;
case"k":P=U+"\\d|1[01]";
break;
case"H":P=U+"\\d|1\\d|2[0-3]";
break;
case"K":P=U+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":P="[0-5]\\d";
break;
case"S":P="\\d{"+S+"}";
break;
case"a":var G=C.am||H.am||"AM";
var Q=C.pm||H.pm||"PM";
if(C.strict){P=G+"|"+Q
}else{P=G+"|"+Q;
if(G!=G.toLowerCase()){P+="|"+G.toLowerCase()
}if(Q!=Q.toLowerCase()){P+="|"+Q.toLowerCase()
}}break;
default:P=".*"
}if(A){A.push(R)
}return"("+P+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var B=[];
dojo.date.locale.addCustomFormats=function(D,A){B.push({pkg:D,name:A})
};
dojo.date.locale._getGregorianBundle=function(D){var A={};
dojo.forEach(B,function(C){var F=dojo.i18n.getLocalization(C.pkg,C.name,D);
A=dojo.mixin(A,F)
},this);
return A
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(J,K,N,H){var M;
var I=dojo.date.locale._getGregorianBundle(H);
var L=[J,N,K];
if(N=="standAlone"){M=I[L.join("-")]
}L[1]="format";
return(M||I[L.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(F,E){var G=dojo.cldr.supplemental.getWeekend(E);
var H=(F||new Date()).getDay();
if(G.end<G.start){G.end+=7;
if(H<G.start){H+=7
}}return H>=G.start&&H<=G.end
};
dojo.date.locale._getDayOfYear=function(B){return dojo.date.difference(new Date(B.getFullYear(),0,1),B)+1
};
dojo.date.locale._getWeekOfYear=function(G,J){if(arguments.length==1){J=0
}var I=new Date(G.getFullYear(),0,1).getDay();
var F=(I-J+7)%7;
var H=Math.floor((dojo.date.locale._getDayOfYear(G)+F-1)/7);
if(I==J){H++
}return H
}
};