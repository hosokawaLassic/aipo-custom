dojo._xdResourceLoaded({depends:[["provide","dojox.charting.scaler"]],defineResource:function(B){if(!B._hasResource["dojox.charting.scaler"]){B._hasResource["dojox.charting.scaler"]=true;
B.provide("dojox.charting.scaler");
(function(){var F=3;
var A=function(C,D){C=C.toLowerCase();
for(var H=0;
H<D.length;
++H){if(C==D[H]){return true
}}return false
};
var E=function(e,c,Z,h,n,C,d){Z=B.clone(Z);
if(!h){if(Z.fixUpper=="major"){Z.fixUpper="minor"
}if(Z.fixLower=="major"){Z.fixLower="minor"
}}if(!n){if(Z.fixUpper=="minor"){Z.fixUpper="micro"
}if(Z.fixLower=="minor"){Z.fixLower="micro"
}}if(!C){if(Z.fixUpper=="micro"){Z.fixUpper="none"
}if(Z.fixLower=="micro"){Z.fixLower="none"
}}var m=A(Z.fixLower,["major"])?Math.floor(e/h)*h:A(Z.fixLower,["minor"])?Math.floor(e/n)*n:A(Z.fixLower,["micro"])?Math.floor(e/C)*unit:e,j=A(Z.fixUpper,["major"])?Math.ceil(c/h)*h:A(Z.fixUpper,["minor"])?Math.ceil(c/n)*n:A(Z.fixUpper,["unit"])?Math.ceil(c/unit)*unit:c,p=(A(Z.fixLower,["major"])||!h)?m:Math.ceil(m/h)*h,k=(A(Z.fixLower,["major","minor"])||!n)?m:Math.ceil(m/n)*n,b=(A(Z.fixLower,["major","minor","micro"])||!C)?m:Math.ceil(m/C)*C,o=!h?0:(A(Z.fixUpper,["major"])?Math.round((j-p)/h):Math.floor((j-p)/h))+1,i=!n?0:(A(Z.fixUpper,["major","minor"])?Math.round((j-k)/n):Math.floor((j-k)/n))+1,a=!C?0:(A(Z.fixUpper,["major","minor","micro"])?Math.round((j-b)/C):Math.floor((j-b)/C))+1,f=n?Math.round(h/n):0,l=C?Math.round(n/C):0,D=h?Math.floor(Math.log(h)/Math.LN10):0,g=n?Math.floor(Math.log(n)/Math.LN10):0,Y=d/(j-m);
if(!isFinite(Y)){Y=1
}return{bounds:{lower:m,upper:j},major:{tick:h,start:p,count:o,prec:D},minor:{tick:n,start:k,count:i,prec:g},micro:{tick:C,start:b,count:a,prec:0},minorPerMajor:f,microPerMinor:l,scale:Y}
};
dojox.charting.scaler=function(U,O,C,Q){var R={fixUpper:"none",fixLower:"none",natural:false};
if(Q){if("fixUpper" in Q){R.fixUpper=String(Q.fixUpper)
}if("fixLower" in Q){R.fixLower=String(Q.fixLower)
}if("natural" in Q){R.natural=Boolean(Q.natural)
}}if(O<=U){return E(U,O,R,0,0,0,C)
}var T=Math.floor(Math.log(O-U)/Math.LN10),P=Q&&("majorTick" in Q)?Q.majorTick:Math.pow(10,T),S=0,V=0,D;
if(Q&&("minorTick" in Q)){S=Q.minorTick
}else{do{S=P/10;
if(!R.natural||S>0.9){D=E(U,O,R,P,S,0,C);
if(D.scale*D.minor.tick>F){break
}}S=P/5;
if(!R.natural||S>0.9){D=E(U,O,R,P,S,0,C);
if(D.scale*D.minor.tick>F){break
}}S=P/2;
if(!R.natural||S>0.9){D=E(U,O,R,P,S,0,C);
if(D.scale*D.minor.tick>F){break
}}return E(U,O,R,P,0,0,C)
}while(false)
}if(Q&&("microTick" in Q)){V=Q.microTick;
D=E(U,O,R,P,S,V,C)
}else{do{V=S/10;
if(!R.natural||V>0.9){D=E(U,O,R,P,S,V,C);
if(D.scale*D.micro.tick>F){break
}}V=S/5;
if(!R.natural||V>0.9){D=E(U,O,R,P,S,V,C);
if(D.scale*D.micro.tick>F){break
}}V=S/2;
if(!R.natural||V>0.9){D=E(U,O,R,P,S,V,C);
if(D.scale*D.micro.tick>F){break
}}V=0
}while(false)
}return V?D:E(U,O,R,P,S,0,C)
}
})()
}}});