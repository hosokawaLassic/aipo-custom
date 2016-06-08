dojo._xdResourceLoaded({depends:[["require","dojo._base.lang"],["provide","dojo._base.array"]],defineResource:function(B){if(!B._hasResource["dojo._base.array"]){B._hasResource["dojo._base.array"]=true;
B.require("dojo._base.lang");
B.provide("dojo._base.array");
(function(){var A=function(G,F,H){return[(B.isString(G)?G.split(""):G),(F||B.global),(B.isString(H)?(new Function("item","index","array",H)):H)]
};
B.mixin(B,{indexOf:function(J,K,M,N){var O=0,L=1,P=J.length;
if(N){O=P-1;
L=P=-1
}for(O=M||O;
O!=P;
O+=L){if(J[O]==K){return O
}}return -1
},lastIndexOf:function(F,G,H){return B.indexOf(F,G,H,true)
},forEach:function(M,I,J){if(!M||!M.length){return 
}var N=A(M,J,I);
M=N[0];
for(var K=0,L=N[0].length;
K<L;
K++){N[2].call(N[1],M[K],K,M)
}},_everyOrSome:function(L,P,K,M){var Q=A(P,M,K);
P=Q[0];
for(var N=0,O=P.length;
N<O;
N++){var R=!!Q[2].call(Q[1],P[N],N,P);
if(L^R){return R
}}return L
},every:function(H,F,G){return this._everyOrSome(true,H,F,G)
},some:function(H,F,G){return this._everyOrSome(false,H,F,G)
},map:function(M,K,J){var N=A(M,J,K);
M=N[0];
var I=((arguments[3])?(new arguments[3]()):[]);
for(var L=0;
L<M.length;
++L){I.push(N[2].call(N[1],M[L],L,M))
}return I
},filter:function(M,I,K){var N=A(M,K,I);
M=N[0];
var J=[];
for(var L=0;
L<M.length;
L++){if(N[2].call(N[1],M[L],L,M)){J.push(M[L])
}}return J
}})
})()
}}});