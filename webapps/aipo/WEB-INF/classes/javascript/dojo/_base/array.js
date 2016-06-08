if(!dojo._hasResource["dojo._base.array"]){dojo._hasResource["dojo._base.array"]=true;
dojo.require("dojo._base.lang");
dojo.provide("dojo._base.array");
(function(){var B=function(E,A,F){return[(dojo.isString(E)?E.split(""):E),(A||dojo.global),(dojo.isString(F)?(new Function("item","index","array",F)):F)]
};
dojo.mixin(dojo,{indexOf:function(A,I,K,L){var M=0,J=1,N=A.length;
if(L){M=N-1;
J=N=-1
}for(M=K||M;
M!=N;
M+=J){if(A[M]==I){return M
}}return -1
},lastIndexOf:function(A,E,F){return dojo.indexOf(A,E,F,true)
},forEach:function(K,A,H){if(!K||!K.length){return 
}var L=B(K,H,A);
K=L[0];
for(var I=0,J=L[0].length;
I<J;
I++){L[2].call(L[1],K[I],I,K)
}},_everyOrSome:function(J,N,A,K){var O=B(N,K,A);
N=O[0];
for(var L=0,M=N.length;
L<M;
L++){var P=!!O[2].call(O[1],N[L],L,N);
if(J^P){return P
}}return J
},every:function(F,A,E){return this._everyOrSome(true,F,A,E)
},some:function(F,A,E){return this._everyOrSome(false,F,A,E)
},map:function(K,I,H){var L=B(K,H,I);
K=L[0];
var A=((arguments[3])?(new arguments[3]()):[]);
for(var J=0;
J<K.length;
++J){A.push(L[2].call(L[1],K[J],J,K))
}return A
},filter:function(K,A,I){var L=B(K,I,A);
K=L[0];
var H=[];
for(var J=0;
J<K.length;
J++){if(L[2].call(L[1],K[J],J,K)){H.push(K[J])
}}return H
}})
})()
};