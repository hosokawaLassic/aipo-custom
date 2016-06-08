dojo._xdResourceLoaded({depends:[["provide","dojox.crypto.MD5"],["require","dojox.crypto._base"]],defineResource:function(B){if(!B._hasResource["dojox.crypto.MD5"]){B._hasResource["dojox.crypto.MD5"]=true;
B.provide("dojox.crypto.MD5");
B.require("dojox.crypto._base");
dojox.crypto.MD5=new function(){var V=8;
var R=(1<<V)-1;
function a(E){var D=[];
for(var F=0;
F<E.length*V;
F+=V){D[F>>5]|=(E.charCodeAt(F/V)&R)<<(F%32)
}return D
}function A(D){var E=[];
for(var F=0;
F<D.length*32;
F+=V){E.push(String.fromCharCode((D[F>>5]>>>(F%32))&R))
}return E.join("")
}function b(D){var E="0123456789abcdef";
var F=[];
for(var G=0;
G<D.length*4;
G++){F.push(E.charAt((D[G>>2]>>((G%4)*8+4))&15)+E.charAt((D[G>>2]>>((G%4)*8))&15))
}return F.join("")
}function S(D){var E="=";
var F="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var G=[];
for(var H=0;
H<D.length*4;
H+=3){var I=(((D[H>>2]>>8*(H%4))&255)<<16)|(((D[H+1>>2]>>8*((H+1)%4))&255)<<8)|((D[H+2>>2]>>8*((H+2)%4))&255);
for(var J=0;
J<4;
J++){if(H*8+J*6>D.length*32){G.push(E)
}else{G.push(F.charAt((I>>6*(3-J))&63))
}}}return G.join("")
}function T(F,D){var E=(F&65535)+(D&65535);
var G=(F>>16)+(D>>16)+(E>>16);
return(G<<16)|(E&65535)
}function Y(D,E){return(D<<E)|(D>>>(32-E))
}function C(D,G,H,I,E,F){return T(Y(T(T(G,D),T(I,F)),E),H)
}function W(H,I,D,E,J,F,G){return C((I&D)|((~I)&E),H,I,J,F,G)
}function d(H,I,D,E,J,F,G){return C((I&E)|(D&(~E)),H,I,J,F,G)
}function U(H,I,D,E,J,F,G){return C(I^D^E,H,I,J,F,G)
}function Z(H,I,D,E,J,F,G){return C(D^(I|(~E)),H,I,J,F,G)
}function c(N,I){N[I>>5]|=128<<((I)%32);
N[(((I+64)>>>9)<<4)+14]=I;
var E=1732584193;
var F=-271733879;
var G=-1732584194;
var H=271733878;
for(var L=0;
L<N.length;
L+=16){var J=E;
var K=F;
var M=G;
var D=H;
E=W(E,F,G,H,N[L+0],7,-680876936);
H=W(H,E,F,G,N[L+1],12,-389564586);
G=W(G,H,E,F,N[L+2],17,606105819);
F=W(F,G,H,E,N[L+3],22,-1044525330);
E=W(E,F,G,H,N[L+4],7,-176418897);
H=W(H,E,F,G,N[L+5],12,1200080426);
G=W(G,H,E,F,N[L+6],17,-1473231341);
F=W(F,G,H,E,N[L+7],22,-45705983);
E=W(E,F,G,H,N[L+8],7,1770035416);
H=W(H,E,F,G,N[L+9],12,-1958414417);
G=W(G,H,E,F,N[L+10],17,-42063);
F=W(F,G,H,E,N[L+11],22,-1990404162);
E=W(E,F,G,H,N[L+12],7,1804603682);
H=W(H,E,F,G,N[L+13],12,-40341101);
G=W(G,H,E,F,N[L+14],17,-1502002290);
F=W(F,G,H,E,N[L+15],22,1236535329);
E=d(E,F,G,H,N[L+1],5,-165796510);
H=d(H,E,F,G,N[L+6],9,-1069501632);
G=d(G,H,E,F,N[L+11],14,643717713);
F=d(F,G,H,E,N[L+0],20,-373897302);
E=d(E,F,G,H,N[L+5],5,-701558691);
H=d(H,E,F,G,N[L+10],9,38016083);
G=d(G,H,E,F,N[L+15],14,-660478335);
F=d(F,G,H,E,N[L+4],20,-405537848);
E=d(E,F,G,H,N[L+9],5,568446438);
H=d(H,E,F,G,N[L+14],9,-1019803690);
G=d(G,H,E,F,N[L+3],14,-187363961);
F=d(F,G,H,E,N[L+8],20,1163531501);
E=d(E,F,G,H,N[L+13],5,-1444681467);
H=d(H,E,F,G,N[L+2],9,-51403784);
G=d(G,H,E,F,N[L+7],14,1735328473);
F=d(F,G,H,E,N[L+12],20,-1926607734);
E=U(E,F,G,H,N[L+5],4,-378558);
H=U(H,E,F,G,N[L+8],11,-2022574463);
G=U(G,H,E,F,N[L+11],16,1839030562);
F=U(F,G,H,E,N[L+14],23,-35309556);
E=U(E,F,G,H,N[L+1],4,-1530992060);
H=U(H,E,F,G,N[L+4],11,1272893353);
G=U(G,H,E,F,N[L+7],16,-155497632);
F=U(F,G,H,E,N[L+10],23,-1094730640);
E=U(E,F,G,H,N[L+13],4,681279174);
H=U(H,E,F,G,N[L+0],11,-358537222);
G=U(G,H,E,F,N[L+3],16,-722521979);
F=U(F,G,H,E,N[L+6],23,76029189);
E=U(E,F,G,H,N[L+9],4,-640364487);
H=U(H,E,F,G,N[L+12],11,-421815835);
G=U(G,H,E,F,N[L+15],16,530742520);
F=U(F,G,H,E,N[L+2],23,-995338651);
E=Z(E,F,G,H,N[L+0],6,-198630844);
H=Z(H,E,F,G,N[L+7],10,1126891415);
G=Z(G,H,E,F,N[L+14],15,-1416354905);
F=Z(F,G,H,E,N[L+5],21,-57434055);
E=Z(E,F,G,H,N[L+12],6,1700485571);
H=Z(H,E,F,G,N[L+3],10,-1894986606);
G=Z(G,H,E,F,N[L+10],15,-1051523);
F=Z(F,G,H,E,N[L+1],21,-2054922799);
E=Z(E,F,G,H,N[L+8],6,1873313359);
H=Z(H,E,F,G,N[L+15],10,-30611744);
G=Z(G,H,E,F,N[L+6],15,-1560198380);
F=Z(F,G,H,E,N[L+13],21,1309151649);
E=Z(E,F,G,H,N[L+4],6,-145523070);
H=Z(H,E,F,G,N[L+11],10,-1120210379);
G=Z(G,H,E,F,N[L+2],15,718787259);
F=Z(F,G,H,E,N[L+9],21,-343485551);
E=T(E,J);
F=T(F,K);
G=T(G,M);
H=T(H,D)
}return[E,F,G,H]
}function X(E,H){var D=a(H);
if(D.length>16){D=c(D,H.length*V)
}var J=[],F=[];
for(var I=0;
I<16;
I++){J[I]=D[I]^909522486;
F[I]=D[I]^1549556828
}var G=c(J.concat(a(E)),512+E.length*V);
return c(F.concat(G),640)
}this.compute=function(E,D){var F=D||dojox.crypto.outputTypes.Base64;
switch(F){case dojox.crypto.outputTypes.Hex:return b(c(a(E),E.length*V));
case dojox.crypto.outputTypes.String:return A(c(a(E),E.length*V));
default:return S(c(a(E),E.length*V))
}};
this.getHMAC=function(E,F,D){var G=D||dojox.crypto.outputTypes.Base64;
switch(G){case dojox.crypto.outputTypes.Hex:return b(X(E,F));
case dojox.crypto.outputTypes.String:return A(X(E,F));
default:return S(X(E,F))
}}
}()
}}});