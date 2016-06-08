dojo._xdResourceLoaded({depends:[["provide","dojo.date"]],defineResource:function(B){if(!B._hasResource["dojo.date"]){B._hasResource["dojo.date"]=true;
B.provide("dojo.date");
B.date.getDaysInMonth=function(F){var E=F.getMonth();
var A=[31,28,31,30,31,30,31,31,30,31,30,31];
if(E==1&&B.date.isLeapYear(F)){return 29
}return A[E]
};
B.date.isLeapYear=function(A){var D=A.getFullYear();
return !(D%400)||(!(D%4)&&!!(D%100))
};
B.date.getTimezoneName=function(J){var I=J.toString();
var A="";
var K;
var H=I.indexOf("(");
if(H>-1){A=I.substring(++H,I.indexOf(")"))
}else{var L=/([A-Z\/]+) \d{4}$/;
if((K=I.match(L))){A=K[1]
}else{I=J.toLocaleString();
L=/ ([A-Z\/]+)$/;
if((K=I.match(L))){A=K[1]
}}}return(A=="AM"||A=="PM")?"":A
};
B.date.compare=function(A,E,F){A=new Date(Number(A));
E=new Date(Number(E||new Date()));
if(typeof F!=="undefined"){if(F=="date"){A.setHours(0,0,0,0);
E.setHours(0,0,0,0)
}else{if(F=="time"){A.setFullYear(0,0,0);
E.setFullYear(0,0,0)
}}}if(A>E){return 1
}if(A<E){return -1
}return 0
};
B.date.add=function(X,A,W){var U=new Date(Number(X));
var N=false;
var Q="Date";
switch(A){case"day":break;
case"weekday":var P,O;
var S=0;
var R=W%5;
if(!R){P=(W>0)?5:-5;
O=(W>0)?((W-5)/5):((W+5)/5)
}else{P=R;
O=parseInt(W/5)
}var V=X.getDay();
if(V==6&&W>0){S=1
}else{if(V==0&&W<0){S=-1
}}var T=V+P;
if(T==0||T==6){S=(W>0)?2:-2
}W=7*O+P+S;
break;
case"year":Q="FullYear";
N=true;
break;
case"week":W*=7;
break;
case"quarter":W*=3;
case"month":N=true;
Q="Month";
break;
case"hour":case"minute":case"second":case"millisecond":Q="UTC"+A.charAt(0).toUpperCase()+A.substring(1)+"s"
}if(Q){U["set"+Q](U["get"+Q]()+W)
}if(N&&(U.getDate()<X.getDate())){U.setDate(0)
}return U
};
B.date.difference=function(V,X,h){X=X||new Date();
h=h||"day";
var A=X.getFullYear()-V.getFullYear();
var Z=1;
switch(h){case"quarter":var U=V.getMonth();
var W=X.getMonth();
var c=Math.floor(U/3)+1;
var d=Math.floor(W/3)+1;
d+=(A*4);
Z=d-c;
break;
case"weekday":var Y=Math.round(B.date.difference(V,X,"day"));
var T=parseInt(B.date.difference(V,X,"week"));
var a=Y%7;
if(a==0){Y=T*5
}else{var b=0;
var e=V.getDay();
var g=X.getDay();
T=parseInt(Y/7);
a=Y%7;
var f=new Date(V);
f.setDate(f.getDate()+(T*7));
var S=f.getDay();
if(Y>0){switch(true){case e==6:b=-1;
break;
case e==0:b=0;
break;
case g==6:b=-1;
break;
case g==0:b=-2;
break;
case (S+a)>5:b=-2
}}else{if(Y<0){switch(true){case e==6:b=0;
break;
case e==0:b=1;
break;
case g==6:b=2;
break;
case g==0:b=1;
break;
case (S+a)<0:b=2
}}}Y+=b;
Y-=(T*2)
}Z=Y;
break;
case"year":Z=A;
break;
case"month":Z=(X.getMonth()-V.getMonth())+(A*12);
break;
case"week":Z=parseInt(B.date.difference(V,X,"day")/7);
break;
case"day":Z/=24;
case"hour":Z/=60;
case"minute":Z/=60;
case"second":Z/=1000;
case"millisecond":Z*=X.getTime()-V.getTime()
}return Math.round(Z)
}
}}});