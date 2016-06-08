if(!dojo._hasResource["dojox.charting._color"]){dojo._hasResource["dojox.charting._color"]=true;
dojo.provide("dojox.charting._color");
dojox.charting._color={};
dojox.charting._color.fromHsb=function(J,L,R){J=Math.round(J);
L=Math.round((L/100)*255);
R=Math.round((R/100)*255);
var M,K,Q;
if(L==0){M=K=Q=R
}else{var N=R,O=(255-L)*R/255,P=(N-O)*(J%60)/60;
if(J<60){M=N,K=O+P,Q=O
}else{if(J<120){M=N-P,K=N,Q=O
}else{if(J<180){M=O,K=N,Q=O+P
}else{if(J<240){M=O,K=N-P,Q=N
}else{if(J<300){M=O+P,K=O,Q=N
}else{if(J<360){M=N,K=O,Q=N-P
}}}}}}}M=Math.round(M);
K=Math.round(K);
Q=Math.round(Q);
return new dojo.Color({r:M,g:K,b:Q})
};
dojox.charting._color.toHsb=function(O,N,R){var P=O,V=N,T=R;
if(dojo.isObject(O)){P=O.r,V=O.g,T=O.b
}var M=Math.min(P,V,T);
var S=Math.max(P,V,T);
var Q=S-M;
var W=0,X=(S!=0?Q/S:0),U=S/255;
if(X==0){W=0
}else{if(P==S){W=((S-T)/Q)-((S-V)/Q)
}else{if(V==S){W=2+(((S-P)/Q)-((S-T)/Q))
}else{W=4+(((S-V)/Q)-((S-P)/Q))
}}W/=6;
if(W<0){W++
}}W=Math.round(W*360);
X=Math.round(X*100);
U=Math.round(U*100);
return{h:W,s:X,b:U,hue:W,saturation:X,brightness:U}
}
};