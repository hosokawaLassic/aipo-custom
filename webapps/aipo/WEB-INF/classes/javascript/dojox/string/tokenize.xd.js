dojo._xdResourceLoaded({depends:[["provide","dojox.string.tokenize"]],defineResource:function(B){if(!B._hasResource["dojox.string.tokenize"]){B._hasResource["dojox.string.tokenize"]=true;
B.provide("dojox.string.tokenize");
dojox.string.tokenize=function(Q,M,O,N){var P=[];
var L,A,K=0;
while(L=M.exec(Q)){A=Q.substring(K,M.lastIndex-L[0].length);
if(A.length){P.push(A)
}if(O){var R=O.apply(N,L.slice(1));
if(typeof R!="undefined"){P.push(R)
}}K=M.lastIndex
}A=Q.substr(K);
if(A.length){P.push(A)
}return P
}
}}});