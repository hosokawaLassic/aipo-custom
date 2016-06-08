dojo._xdResourceLoaded({depends:[["provide","dojox.date.posix"],["require","dojo.date"],["require","dojo.date.locale"],["require","dojo.string"]],defineResource:function(B){if(!B._hasResource["dojox.date.posix"]){B._hasResource["dojox.date.posix"]=true;
B.provide("dojox.date.posix");
B.require("dojo.date");
B.require("dojo.date.locale");
B.require("dojo.string");
dojox.date.posix.strftime=function(Z,W,X){var R=null;
var U=function(D,C){return B.string.pad(D,C||2,R||"0")
};
var T=B.date.locale._getGregorianBundle(X);
var d=function(C){switch(C){case"a":return B.date.locale.getNames("days","abbr","format",X)[Z.getDay()];
case"A":return B.date.locale.getNames("days","wide","format",X)[Z.getDay()];
case"b":case"h":return B.date.locale.getNames("months","abbr","format",X)[Z.getMonth()];
case"B":return B.date.locale.getNames("months","wide","format",X)[Z.getMonth()];
case"c":return B.date.locale.format(Z,{formatLength:"full",locale:X});
case"C":return U(Math.floor(Z.getFullYear()/100));
case"d":return U(Z.getDate());
case"D":return d("m")+"/"+d("d")+"/"+d("y");
case"e":if(R==null){R=" "
}return U(Z.getDate());
case"f":if(R==null){R=" "
}return U(Z.getMonth()+1);
case"g":break;
case"G":B.unimplemented("unimplemented modifier 'G'");
break;
case"F":return d("Y")+"-"+d("m")+"-"+d("d");
case"H":return U(Z.getHours());
case"I":return U(Z.getHours()%12||12);
case"j":return U(B.date.locale._getDayOfYear(Z),3);
case"k":if(R==null){R=" "
}return U(Z.getHours());
case"l":if(R==null){R=" "
}return U(Z.getHours()%12||12);
case"m":return U(Z.getMonth()+1);
case"M":return U(Z.getMinutes());
case"n":return"\n";
case"p":return T[Z.getHours()<12?"am":"pm"];
case"r":return d("I")+":"+d("M")+":"+d("S")+" "+d("p");
case"R":return d("H")+":"+d("M");
case"S":return U(Z.getSeconds());
case"t":return"\t";
case"T":return d("H")+":"+d("M")+":"+d("S");
case"u":return String(Z.getDay()||7);
case"U":return U(B.date.locale._getWeekOfYear(Z));
case"V":return U(dojox.date.posix.getIsoWeekOfYear(Z));
case"W":return U(B.date.locale._getWeekOfYear(Z,1));
case"w":return String(Z.getDay());
case"x":return B.date.locale.format(Z,{selector:"date",formatLength:"full",locale:X});
case"X":return B.date.locale.format(Z,{selector:"time",formatLength:"full",locale:X});
case"y":return U(Z.getFullYear()%100);
case"Y":return String(Z.getFullYear());
case"z":var D=Z.getTimezoneOffset();
return(D>0?"-":"+")+U(Math.floor(Math.abs(D)/60))+":"+U(Math.abs(D)%60);
case"Z":return B.date.getTimezoneName(Z);
case"%":return"%"
}};
var c="";
var e=0;
var a=0;
var A=null;
while((a=W.indexOf("%",e))!=-1){c+=W.substring(e,a++);
switch(W.charAt(a++)){case"_":R=" ";
break;
case"-":R="";
break;
case"0":R="0";
break;
case"^":A="upper";
break;
case"*":A="lower";
break;
case"#":A="swap";
break;
default:R=null;
a--;
break
}var V=d(W.charAt(a++));
switch(A){case"upper":V=V.toUpperCase();
break;
case"lower":V=V.toLowerCase();
break;
case"swap":var b=V.toLowerCase();
var Y="";
var S="";
for(var f=0;
f<V.length;
f++){S=V.charAt(f);
Y+=(S==b.charAt(f))?S.toUpperCase():S.toLowerCase()
}V=Y;
break;
default:break
}A=null;
c+=V;
e=a
}c+=W.substring(e);
return c
};
dojox.date.posix.getStartOfWeek=function(F,H){if(isNaN(H)){H=B.cldr.supplemental.getFirstDayOfWeek?B.cldr.supplemental.getFirstDayOfWeek():0
}var A=H;
if(F.getDay()>=H){A-=F.getDay()
}else{A-=(7-F.getDay())
}var G=new Date(F);
G.setHours(0,0,0,0);
return B.date.add(G,"day",A)
};
dojox.date.posix.setIsoWeekOfYear=function(G,I){if(!I){return G
}var J=dojox.date.posix.getIsoWeekOfYear(G);
var A=I-J;
if(I<0){var H=dojox.date.posix.getIsoWeeksInYear(G);
A=(H+I+1)-J
}return B.date.add(G,"week",A)
};
dojox.date.posix.getIsoWeekOfYear=function(F){var H=dojox.date.posix.getStartOfWeek(F,1);
var G=new Date(F.getFullYear(),0,4);
G=dojox.date.posix.getStartOfWeek(G,1);
var A=H.getTime()-G.getTime();
if(A<0){return dojox.date.posix.getIsoWeeksInYear(H)
}return Math.ceil(A/604800000)+1
};
dojox.date.posix.getIsoWeeksInYear=function(F){function E(C){return C+Math.floor(C/4)-Math.floor(C/100)+Math.floor(C/400)
}var A=F.getFullYear();
return(E(A)%7==4||E(A-1)%7==3)?53:52
}
}}});