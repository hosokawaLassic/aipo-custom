if(!dojo._hasResource["dojox.string.tokenize"]){dojo._hasResource["dojox.string.tokenize"]=true;
dojo.provide("dojox.string.tokenize");
dojox.string.tokenize=function(R,N,P,O){var Q=[];
var M,K,L=0;
while(M=N.exec(R)){K=R.substring(L,N.lastIndex-M[0].length);
if(K.length){Q.push(K)
}if(P){var J=P.apply(O,M.slice(1));
if(typeof J!="undefined"){Q.push(J)
}}L=N.lastIndex
}K=R.substr(L);
if(K.length){Q.push(K)
}return Q
}
};