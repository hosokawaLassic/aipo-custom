if(!dojo._hasResource["dojox.crypto.MD5"]){dojo._hasResource["dojox.crypto.MD5"]=true;
dojo.provide("dojox.crypto.MD5");
dojo.require("dojox.crypto._base");
dojox.crypto.MD5=new function(){var W=8;
var S=(1<<W)-1;
function b(B){var A=[];
for(var D=0;
D<B.length*W;
D+=W){A[D>>5]|=(B.charCodeAt(D/W)&S)<<(D%32)
}return A
}function Q(A){var B=[];
for(var D=0;
D<A.length*32;
D+=W){B.push(String.fromCharCode((A[D>>5]>>>(D%32))&S))
}return B.join("")
}function c(A){var B="0123456789abcdef";
var D=[];
for(var E=0;
E<A.length*4;
E++){D.push(B.charAt((A[E>>2]>>((E%4)*8+4))&15)+B.charAt((A[E>>2]>>((E%4)*8))&15))
}return D.join("")
}function T(A){var B="=";
var D="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var E=[];
for(var F=0;
F<A.length*4;
F+=3){var G=(((A[F>>2]>>8*(F%4))&255)<<16)|(((A[F+1>>2]>>8*((F+1)%4))&255)<<8)|((A[F+2>>2]>>8*((F+2)%4))&255);
for(var H=0;
H<4;
H++){if(F*8+H*6>A.length*32){E.push(B)
}else{E.push(D.charAt((G>>6*(3-H))&63))
}}}return E.join("")
}function U(D,A){var B=(D&65535)+(A&65535);
var E=(D>>16)+(A>>16)+(B>>16);
return(E<<16)|(B&65535)
}function Z(A,B){return(A<<B)|(A>>>(32-B))
}function R(A,E,F,G,B,D){return U(Z(U(U(E,A),U(G,D)),B),F)
}function X(F,G,A,B,H,D,E){return R((G&A)|((~G)&B),F,G,H,D,E)
}function C(F,G,A,B,H,D,E){return R((G&B)|(A&(~B)),F,G,H,D,E)
}function V(F,G,A,B,H,D,E){return R(G^A^B,F,G,H,D,E)
}function a(F,G,A,B,H,D,E){return R(A^(G|(~B)),F,G,H,D,E)
}function d(B,H){B[H>>5]|=128<<((H)%32);
B[(((H+64)>>>9)<<4)+14]=H;
var D=1732584193;
var E=-271733879;
var F=-1732584194;
var G=271733878;
for(var K=0;
K<B.length;
K+=16){var I=D;
var J=E;
var L=F;
var A=G;
D=X(D,E,F,G,B[K+0],7,-680876936);
G=X(G,D,E,F,B[K+1],12,-389564586);
F=X(F,G,D,E,B[K+2],17,606105819);
E=X(E,F,G,D,B[K+3],22,-1044525330);
D=X(D,E,F,G,B[K+4],7,-176418897);
G=X(G,D,E,F,B[K+5],12,1200080426);
F=X(F,G,D,E,B[K+6],17,-1473231341);
E=X(E,F,G,D,B[K+7],22,-45705983);
D=X(D,E,F,G,B[K+8],7,1770035416);
G=X(G,D,E,F,B[K+9],12,-1958414417);
F=X(F,G,D,E,B[K+10],17,-42063);
E=X(E,F,G,D,B[K+11],22,-1990404162);
D=X(D,E,F,G,B[K+12],7,1804603682);
G=X(G,D,E,F,B[K+13],12,-40341101);
F=X(F,G,D,E,B[K+14],17,-1502002290);
E=X(E,F,G,D,B[K+15],22,1236535329);
D=C(D,E,F,G,B[K+1],5,-165796510);
G=C(G,D,E,F,B[K+6],9,-1069501632);
F=C(F,G,D,E,B[K+11],14,643717713);
E=C(E,F,G,D,B[K+0],20,-373897302);
D=C(D,E,F,G,B[K+5],5,-701558691);
G=C(G,D,E,F,B[K+10],9,38016083);
F=C(F,G,D,E,B[K+15],14,-660478335);
E=C(E,F,G,D,B[K+4],20,-405537848);
D=C(D,E,F,G,B[K+9],5,568446438);
G=C(G,D,E,F,B[K+14],9,-1019803690);
F=C(F,G,D,E,B[K+3],14,-187363961);
E=C(E,F,G,D,B[K+8],20,1163531501);
D=C(D,E,F,G,B[K+13],5,-1444681467);
G=C(G,D,E,F,B[K+2],9,-51403784);
F=C(F,G,D,E,B[K+7],14,1735328473);
E=C(E,F,G,D,B[K+12],20,-1926607734);
D=V(D,E,F,G,B[K+5],4,-378558);
G=V(G,D,E,F,B[K+8],11,-2022574463);
F=V(F,G,D,E,B[K+11],16,1839030562);
E=V(E,F,G,D,B[K+14],23,-35309556);
D=V(D,E,F,G,B[K+1],4,-1530992060);
G=V(G,D,E,F,B[K+4],11,1272893353);
F=V(F,G,D,E,B[K+7],16,-155497632);
E=V(E,F,G,D,B[K+10],23,-1094730640);
D=V(D,E,F,G,B[K+13],4,681279174);
G=V(G,D,E,F,B[K+0],11,-358537222);
F=V(F,G,D,E,B[K+3],16,-722521979);
E=V(E,F,G,D,B[K+6],23,76029189);
D=V(D,E,F,G,B[K+9],4,-640364487);
G=V(G,D,E,F,B[K+12],11,-421815835);
F=V(F,G,D,E,B[K+15],16,530742520);
E=V(E,F,G,D,B[K+2],23,-995338651);
D=a(D,E,F,G,B[K+0],6,-198630844);
G=a(G,D,E,F,B[K+7],10,1126891415);
F=a(F,G,D,E,B[K+14],15,-1416354905);
E=a(E,F,G,D,B[K+5],21,-57434055);
D=a(D,E,F,G,B[K+12],6,1700485571);
G=a(G,D,E,F,B[K+3],10,-1894986606);
F=a(F,G,D,E,B[K+10],15,-1051523);
E=a(E,F,G,D,B[K+1],21,-2054922799);
D=a(D,E,F,G,B[K+8],6,1873313359);
G=a(G,D,E,F,B[K+15],10,-30611744);
F=a(F,G,D,E,B[K+6],15,-1560198380);
E=a(E,F,G,D,B[K+13],21,1309151649);
D=a(D,E,F,G,B[K+4],6,-145523070);
G=a(G,D,E,F,B[K+11],10,-1120210379);
F=a(F,G,D,E,B[K+2],15,718787259);
E=a(E,F,G,D,B[K+9],21,-343485551);
D=U(D,I);
E=U(E,J);
F=U(F,L);
G=U(G,A)
}return[D,E,F,G]
}function Y(B,F){var A=b(F);
if(A.length>16){A=d(A,F.length*W)
}var H=[],D=[];
for(var G=0;
G<16;
G++){H[G]=A[G]^909522486;
D[G]=A[G]^1549556828
}var E=d(H.concat(b(B)),512+B.length*W);
return d(D.concat(E),640)
}this.compute=function(B,A){var D=A||dojox.crypto.outputTypes.Base64;
switch(D){case dojox.crypto.outputTypes.Hex:return c(d(b(B),B.length*W));
case dojox.crypto.outputTypes.String:return Q(d(b(B),B.length*W));
default:return T(d(b(B),B.length*W))
}};
this.getHMAC=function(B,D,A){var E=A||dojox.crypto.outputTypes.Base64;
switch(E){case dojox.crypto.outputTypes.Hex:return c(Y(B,D));
case dojox.crypto.outputTypes.String:return Q(Y(B,D));
default:return T(Y(B,D))
}}
}()
};