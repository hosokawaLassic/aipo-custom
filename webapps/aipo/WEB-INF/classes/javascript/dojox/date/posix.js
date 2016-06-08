if(!dojo._hasResource["dojox.date.posix"]){dojo._hasResource["dojox.date.posix"]=true;
dojo.provide("dojox.date.posix");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.string");
dojox.date.posix.strftime=function(a,X,Y){var S=null;
var V=function(B,A){return dojo.string.pad(B,A||2,S||"0")
};
var U=dojo.date.locale._getGregorianBundle(Y);
var e=function(A){switch(A){case"a":return dojo.date.locale.getNames("days","abbr","format",Y)[a.getDay()];
case"A":return dojo.date.locale.getNames("days","wide","format",Y)[a.getDay()];
case"b":case"h":return dojo.date.locale.getNames("months","abbr","format",Y)[a.getMonth()];
case"B":return dojo.date.locale.getNames("months","wide","format",Y)[a.getMonth()];
case"c":return dojo.date.locale.format(a,{formatLength:"full",locale:Y});
case"C":return V(Math.floor(a.getFullYear()/100));
case"d":return V(a.getDate());
case"D":return e("m")+"/"+e("d")+"/"+e("y");
case"e":if(S==null){S=" "
}return V(a.getDate());
case"f":if(S==null){S=" "
}return V(a.getMonth()+1);
case"g":break;
case"G":dojo.unimplemented("unimplemented modifier 'G'");
break;
case"F":return e("Y")+"-"+e("m")+"-"+e("d");
case"H":return V(a.getHours());
case"I":return V(a.getHours()%12||12);
case"j":return V(dojo.date.locale._getDayOfYear(a),3);
case"k":if(S==null){S=" "
}return V(a.getHours());
case"l":if(S==null){S=" "
}return V(a.getHours()%12||12);
case"m":return V(a.getMonth()+1);
case"M":return V(a.getMinutes());
case"n":return"\n";
case"p":return U[a.getHours()<12?"am":"pm"];
case"r":return e("I")+":"+e("M")+":"+e("S")+" "+e("p");
case"R":return e("H")+":"+e("M");
case"S":return V(a.getSeconds());
case"t":return"\t";
case"T":return e("H")+":"+e("M")+":"+e("S");
case"u":return String(a.getDay()||7);
case"U":return V(dojo.date.locale._getWeekOfYear(a));
case"V":return V(dojox.date.posix.getIsoWeekOfYear(a));
case"W":return V(dojo.date.locale._getWeekOfYear(a,1));
case"w":return String(a.getDay());
case"x":return dojo.date.locale.format(a,{selector:"date",formatLength:"full",locale:Y});
case"X":return dojo.date.locale.format(a,{selector:"time",formatLength:"full",locale:Y});
case"y":return V(a.getFullYear()%100);
case"Y":return String(a.getFullYear());
case"z":var B=a.getTimezoneOffset();
return(B>0?"-":"+")+V(Math.floor(Math.abs(B)/60))+":"+V(Math.abs(B)%60);
case"Z":return dojo.date.getTimezoneName(a);
case"%":return"%"
}};
var d="";
var f=0;
var b=0;
var R=null;
while((b=X.indexOf("%",f))!=-1){d+=X.substring(f,b++);
switch(X.charAt(b++)){case"_":S=" ";
break;
case"-":S="";
break;
case"0":S="0";
break;
case"^":R="upper";
break;
case"*":R="lower";
break;
case"#":R="swap";
break;
default:S=null;
b--;
break
}var W=e(X.charAt(b++));
switch(R){case"upper":W=W.toUpperCase();
break;
case"lower":W=W.toLowerCase();
break;
case"swap":var c=W.toLowerCase();
var Z="";
var T="";
for(var Q=0;
Q<W.length;
Q++){T=W.charAt(Q);
Z+=(T==c.charAt(Q))?T.toUpperCase():T.toLowerCase()
}W=Z;
break;
default:break
}R=null;
d+=W;
f=b
}d+=X.substring(f);
return d
};
dojox.date.posix.getStartOfWeek=function(G,E){if(isNaN(E)){E=dojo.cldr.supplemental.getFirstDayOfWeek?dojo.cldr.supplemental.getFirstDayOfWeek():0
}var F=E;
if(G.getDay()>=E){F-=G.getDay()
}else{F-=(7-G.getDay())
}var H=new Date(G);
H.setHours(0,0,0,0);
return dojo.date.add(H,"day",F)
};
dojox.date.posix.setIsoWeekOfYear=function(H,J){if(!J){return H
}var F=dojox.date.posix.getIsoWeekOfYear(H);
var G=J-F;
if(J<0){var I=dojox.date.posix.getIsoWeeksInYear(H);
G=(I+J+1)-F
}return dojo.date.add(H,"week",G)
};
dojox.date.posix.getIsoWeekOfYear=function(G){var E=dojox.date.posix.getStartOfWeek(G,1);
var H=new Date(G.getFullYear(),0,4);
H=dojox.date.posix.getStartOfWeek(H,1);
var F=E.getTime()-H.getTime();
if(F<0){return dojox.date.posix.getIsoWeeksInYear(E)
}return Math.ceil(F/604800000)+1
};
dojox.date.posix.getIsoWeeksInYear=function(D){function F(A){return A+Math.floor(A/4)-Math.floor(A/100)+Math.floor(A/400)
}var E=D.getFullYear();
return(F(E)%7==4||F(E-1)%7==3)?53:52
}
};