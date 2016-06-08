dojo._xdResourceLoaded({depends:[["provide","dojox.color._base"],["require","dojo.colors"]],defineResource:function(B){if(!B._hasResource["dojox.color._base"]){B._hasResource["dojox.color._base"]=true;
B.provide("dojox.color._base");
B.require("dojo.colors");
dojox.color.Color=B.Color;
dojox.color.blend=B.blendColors;
dojox.color.fromRgb=B.colorFromRgb;
dojox.color.fromHex=B.colorFromHex;
dojox.color.fromArray=B.colorFromArray;
dojox.color.fromString=B.colorFromString;
dojox.color.greyscale=B.colors.makeGrey;
B.mixin(dojox.color,{fromCmy:function(H,K,A){if(B.isArray(H)){K=H[1],A=H[2],H=H[0]
}else{if(B.isObject(H)){K=H.m,A=H.y,H=H.c
}}H/=100,K/=100,A/=100;
var I=1-H,J=1-K,L=1-A;
return new dojox.color.Color({r:Math.round(I*255),g:Math.round(J*255),b:Math.round(L*255)})
},fromCmyk:function(J,M,I,A){if(B.isArray(J)){M=J[1],I=J[2],A=J[3],J=J[0]
}else{if(B.isObject(J)){M=J.m,I=J.y,A=J.b,J=J.c
}}J/=100,M/=100,I/=100,A/=100;
var K,L,N;
K=1-Math.min(1,J*(1-A)+A);
L=1-Math.min(1,M*(1-A)+A);
N=1-Math.min(1,I*(1-A)+A);
return new dojox.color.Color({r:Math.round(K*255),g:Math.round(L*255),b:Math.round(N*255)})
},fromHsl:function(K,A,J){if(B.isArray(K)){A=K[1],J=K[2],K=K[0]
}else{if(B.isObject(K)){A=K.s,J=K.l,K=K.h
}}A/=100;
J/=100;
while(K<0){K+=360
}while(K>=360){K-=360
}var H,I,L;
if(K<120){H=(120-K)/60,I=K/60,L=0
}else{if(K<240){H=0,I=(240-K)/60,L=(K-120)/60
}else{H=(K-240)/60,I=0,L=(360-K)/60
}}H=2*A*Math.min(H,1)+(1-A);
I=2*A*Math.min(I,1)+(1-A);
L=2*A*Math.min(L,1)+(1-A);
if(J<0.5){H*=J,I*=J,L*=J
}else{H=(1-J)*H+2*J-1;
I=(1-J)*I+2*J-1;
L=(1-J)*L+2*J-1
}return new dojox.color.Color({r:Math.round(H*255),g:Math.round(I*255),b:Math.round(L*255)})
},fromHsv:function(T,V,Q){if(B.isArray(T)){V=T[1],Q=T[2],T=T[0]
}else{if(B.isObject(T)){V=T.s,Q=T.v,T=T.h
}}if(T==360){T=0
}V/=100;
Q/=100;
var O,U,R;
if(V==0){O=Q,R=Q,U=Q
}else{var X=T/60,W=Math.floor(X),S=X-W;
var A=Q*(1-V);
var N=Q*(1-(V*S));
var P=Q*(1-(V*(1-S)));
switch(W){case 0:O=Q,U=P,R=A;
break;
case 1:O=N,U=Q,R=A;
break;
case 2:O=A,U=Q,R=P;
break;
case 3:O=A,U=N,R=Q;
break;
case 4:O=P,U=A,R=Q;
break;
case 5:O=Q,U=A,R=N;
break
}}return new dojox.color.Color({r:Math.round(O*255),g:Math.round(U*255),b:Math.round(R*255)})
}});
B.extend(dojox.color.Color,{toCmy:function(){var E=1-(this.r/255),F=1-(this.g/255),A=1-(this.b/255);
return{c:Math.round(E*100),m:Math.round(F*100),y:Math.round(A*100)}
},toCmyk:function(){var J,M,I,A;
var K=this.r/255,L=this.g/255,N=this.b/255;
A=Math.min(1-K,1-L,1-N);
J=(1-K-A)/(1-A);
M=(1-L-A)/(1-A);
I=(1-N-A)/(1-A);
return{c:Math.round(J*100),m:Math.round(M*100),y:Math.round(I*100),b:Math.round(A*100)}
},toHsl:function(){var L=this.r/255,Q=this.g/255,P=this.b/255;
var A=Math.min(L,P,Q),O=Math.max(L,Q,P);
var N=O-A;
var R=0,M=0,K=(A+O)/2;
if(K>0&&K<1){M=N/((K<0.5)?(2*K):(2-2*K))
}if(N>0){if(O==L&&O!=Q){R+=(Q-P)/N
}if(O==Q&&O!=P){R+=(2+(P-L)/N)
}if(O==P&&O!=L){R+=(4+(L-Q)/N)
}R*=60
}return{h:R,s:Math.round(M*100),l:Math.round(K*100)}
},toHsv:function(){var J=this.r/255,K=this.g/255,O=this.b/255;
var N=Math.min(J,O,K),P=Math.max(J,K,O);
var A=P-N;
var L=null,M=(P==0)?0:(A/P);
if(M==0){L=0
}else{if(J==P){L=60*(K-O)/A
}else{if(K==P){L=120+60*(O-J)/A
}else{L=240+60*(J-K)/A
}}if(L<0){L+=360
}}return{h:L,s:Math.round(M*100),v:Math.round(P*100)}
}})
}}});