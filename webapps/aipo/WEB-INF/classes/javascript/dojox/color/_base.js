if(!dojo._hasResource["dojox.color._base"]){dojo._hasResource["dojox.color._base"]=true;
dojo.provide("dojox.color._base");
dojo.require("dojo.colors");
dojox.color.Color=dojo.Color;
dojox.color.blend=dojo.blendColors;
dojox.color.fromRgb=dojo.colorFromRgb;
dojox.color.fromHex=dojo.colorFromHex;
dojox.color.fromArray=dojo.colorFromArray;
dojox.color.fromString=dojo.colorFromString;
dojox.color.greyscale=dojo.colors.makeGrey;
dojo.mixin(dojox.color,{fromCmy:function(I,L,H){if(dojo.isArray(I)){L=I[1],H=I[2],I=I[0]
}else{if(dojo.isObject(I)){L=I.m,H=I.y,I=I.c
}}I/=100,L/=100,H/=100;
var J=1-I,K=1-L,G=1-H;
return new dojox.color.Color({r:Math.round(J*255),g:Math.round(K*255),b:Math.round(G*255)})
},fromCmyk:function(K,N,J,I){if(dojo.isArray(K)){N=K[1],J=K[2],I=K[3],K=K[0]
}else{if(dojo.isObject(K)){N=K.m,J=K.y,I=K.b,K=K.c
}}K/=100,N/=100,J/=100,I/=100;
var L,M,H;
L=1-Math.min(1,K*(1-I)+I);
M=1-Math.min(1,N*(1-I)+I);
H=1-Math.min(1,J*(1-I)+I);
return new dojox.color.Color({r:Math.round(L*255),g:Math.round(M*255),b:Math.round(H*255)})
},fromHsl:function(L,H,K){if(dojo.isArray(L)){H=L[1],K=L[2],L=L[0]
}else{if(dojo.isObject(L)){H=L.s,K=L.l,L=L.h
}}H/=100;
K/=100;
while(L<0){L+=360
}while(L>=360){L-=360
}var I,J,G;
if(L<120){I=(120-L)/60,J=L/60,G=0
}else{if(L<240){I=0,J=(240-L)/60,G=(L-120)/60
}else{I=(L-240)/60,J=0,G=(360-L)/60
}}I=2*H*Math.min(I,1)+(1-H);
J=2*H*Math.min(J,1)+(1-H);
G=2*H*Math.min(G,1)+(1-H);
if(K<0.5){I*=K,J*=K,G*=K
}else{I=(1-K)*I+2*K-1;
J=(1-K)*J+2*K-1;
G=(1-K)*G+2*K-1
}return new dojox.color.Color({r:Math.round(I*255),g:Math.round(J*255),b:Math.round(G*255)})
},fromHsv:function(U,W,R){if(dojo.isArray(U)){W=U[1],R=U[2],U=U[0]
}else{if(dojo.isObject(U)){W=U.s,R=U.v,U=U.h
}}if(U==360){U=0
}W/=100;
R/=100;
var P,V,S;
if(W==0){P=R,S=R,V=R
}else{var M=U/60,X=Math.floor(M),T=M-X;
var N=R*(1-W);
var O=R*(1-(W*T));
var Q=R*(1-(W*(1-T)));
switch(X){case 0:P=R,V=Q,S=N;
break;
case 1:P=O,V=R,S=N;
break;
case 2:P=N,V=R,S=Q;
break;
case 3:P=N,V=O,S=R;
break;
case 4:P=Q,V=N,S=R;
break;
case 5:P=R,V=N,S=O;
break
}}return new dojox.color.Color({r:Math.round(P*255),g:Math.round(V*255),b:Math.round(S*255)})
}});
dojo.extend(dojox.color.Color,{toCmy:function(){var F=1-(this.r/255),D=1-(this.g/255),E=1-(this.b/255);
return{c:Math.round(F*100),m:Math.round(D*100),y:Math.round(E*100)}
},toCmyk:function(){var K,N,J,I;
var L=this.r/255,M=this.g/255,H=this.b/255;
I=Math.min(1-L,1-M,1-H);
K=(1-L-I)/(1-I);
N=(1-M-I)/(1-I);
J=(1-H-I)/(1-I);
return{c:Math.round(K*100),m:Math.round(N*100),y:Math.round(J*100),b:Math.round(I*100)}
},toHsl:function(){var M=this.r/255,R=this.g/255,Q=this.b/255;
var K=Math.min(M,Q,R),P=Math.max(M,R,Q);
var O=P-K;
var J=0,N=0,L=(K+P)/2;
if(L>0&&L<1){N=O/((L<0.5)?(2*L):(2-2*L))
}if(O>0){if(P==M&&P!=R){J+=(R-Q)/O
}if(P==R&&P!=Q){J+=(2+(Q-M)/O)
}if(P==Q&&P!=M){J+=(4+(M-R)/O)
}J*=60
}return{h:J,s:Math.round(N*100),l:Math.round(L*100)}
},toHsv:function(){var K=this.r/255,L=this.g/255,P=this.b/255;
var O=Math.min(K,P,L),I=Math.max(K,L,P);
var J=I-O;
var M=null,N=(I==0)?0:(J/I);
if(N==0){M=0
}else{if(K==I){M=60*(L-P)/J
}else{if(L==I){M=120+60*(P-K)/J
}else{M=240+60*(K-L)/J
}}if(M<0){M+=360
}}return{h:M,s:Math.round(N*100),v:Math.round(I*100)}
}})
};