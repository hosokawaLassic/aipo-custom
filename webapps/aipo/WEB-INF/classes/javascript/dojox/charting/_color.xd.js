dojo._xdResourceLoaded({depends:[["provide","dojox.charting._color"]],defineResource:function(B){if(!B._hasResource["dojox.charting._color"]){B._hasResource["dojox.charting._color"]=true;
B.provide("dojox.charting._color");
dojox.charting._color={};
dojox.charting._color.fromHsb=function(R,K,Q){R=Math.round(R);
K=Math.round((K/100)*255);
Q=Math.round((Q/100)*255);
var L,A,P;
if(K==0){L=A=P=Q
}else{var M=Q,N=(255-K)*Q/255,O=(M-N)*(R%60)/60;
if(R<60){L=M,A=N+O,P=N
}else{if(R<120){L=M-O,A=M,P=N
}else{if(R<180){L=N,A=M,P=N+O
}else{if(R<240){L=N,A=M-O,P=M
}else{if(R<300){L=N+O,A=N,P=M
}else{if(R<360){L=M,A=N,P=M-O
}}}}}}}L=Math.round(L);
A=Math.round(A);
P=Math.round(P);
return new B.Color({r:L,g:A,b:P})
};
dojox.charting._color.toHsb=function(N,A,Q){var O=N,U=A,S=Q;
if(B.isObject(N)){O=N.r,U=N.g,S=N.b
}var X=Math.min(O,U,S);
var R=Math.max(O,U,S);
var P=R-X;
var V=0,W=(R!=0?P/R:0),T=R/255;
if(W==0){V=0
}else{if(O==R){V=((R-S)/P)-((R-U)/P)
}else{if(U==R){V=2+(((R-O)/P)-((R-S)/P))
}else{V=4+(((R-U)/P)-((R-O)/P))
}}V/=6;
if(V<0){V++
}}V=Math.round(V*360);
W=Math.round(W*100);
T=Math.round(T*100);
return{h:V,s:W,b:T,hue:V,saturation:W,brightness:T}
}
}}});