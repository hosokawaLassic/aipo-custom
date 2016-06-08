if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(D){var F=D.getMonth();
var E=[31,28,31,30,31,30,31,31,30,31,30,31];
if(F==1&&dojo.date.isLeapYear(D)){return 29
}return E[F]
};
dojo.date.isLeapYear=function(D){var C=D.getFullYear();
return !(C%400)||(!(C%4)&&!!(C%100))
};
dojo.date.getTimezoneName=function(K){var J=K.toString();
var H="";
var L;
var I=J.indexOf("(");
if(I>-1){H=J.substring(++I,J.indexOf(")"))
}else{var G=/([A-Z\/]+) \d{4}$/;
if((L=J.match(G))){H=L[1]
}else{J=K.toLocaleString();
G=/ ([A-Z\/]+)$/;
if((L=J.match(G))){H=L[1]
}}}return(H=="AM"||H=="PM")?"":H
};
dojo.date.compare=function(E,F,D){E=new Date(Number(E));
F=new Date(Number(F||new Date()));
if(typeof D!=="undefined"){if(D=="date"){E.setHours(0,0,0,0);
F.setHours(0,0,0,0)
}else{if(D=="time"){E.setFullYear(0,0,0);
F.setFullYear(0,0,0)
}}}if(E>F){return 1
}if(E<F){return -1
}return 0
};
dojo.date.add=function(M,N,X){var V=new Date(Number(M));
var O=false;
var R="Date";
switch(N){case"day":break;
case"weekday":var Q,P;
var T=0;
var S=X%5;
if(!S){Q=(X>0)?5:-5;
P=(X>0)?((X-5)/5):((X+5)/5)
}else{Q=S;
P=parseInt(X/5)
}var W=M.getDay();
if(W==6&&X>0){T=1
}else{if(W==0&&X<0){T=-1
}}var U=W+Q;
if(U==0||U==6){T=(X>0)?2:-2
}X=7*P+Q+T;
break;
case"year":R="FullYear";
O=true;
break;
case"week":X*=7;
break;
case"quarter":X*=3;
case"month":O=true;
R="Month";
break;
case"hour":case"minute":case"second":case"millisecond":R="UTC"+N.charAt(0).toUpperCase()+N.substring(1)+"s"
}if(R){V["set"+R](V["get"+R]()+X)
}if(O&&(V.getDate()<M.getDate())){V.setDate(0)
}return V
};
dojo.date.difference=function(W,Y,R){Y=Y||new Date();
R=R||"day";
var S=Y.getFullYear()-W.getFullYear();
var a=1;
switch(R){case"quarter":var V=W.getMonth();
var X=Y.getMonth();
var d=Math.floor(V/3)+1;
var e=Math.floor(X/3)+1;
e+=(S*4);
a=e-d;
break;
case"weekday":var Z=Math.round(dojo.date.difference(W,Y,"day"));
var U=parseInt(dojo.date.difference(W,Y,"week"));
var b=Z%7;
if(b==0){Z=U*5
}else{var c=0;
var f=W.getDay();
var h=Y.getDay();
U=parseInt(Z/7);
b=Z%7;
var g=new Date(W);
g.setDate(g.getDate()+(U*7));
var T=g.getDay();
if(Z>0){switch(true){case f==6:c=-1;
break;
case f==0:c=0;
break;
case h==6:c=-1;
break;
case h==0:c=-2;
break;
case (T+b)>5:c=-2
}}else{if(Z<0){switch(true){case f==6:c=0;
break;
case f==0:c=1;
break;
case h==6:c=2;
break;
case h==0:c=1;
break;
case (T+b)<0:c=2
}}}Z+=c;
Z-=(U*2)
}a=Z;
break;
case"year":a=S;
break;
case"month":a=(Y.getMonth()-W.getMonth())+(S*12);
break;
case"week":a=parseInt(dojo.date.difference(W,Y,"day")/7);
break;
case"day":a/=24;
case"hour":a/=60;
case"minute":a/=60;
case"second":a/=1000;
case"millisecond":a*=Y.getTime()-W.getTime()
}return Math.round(a)
}
};