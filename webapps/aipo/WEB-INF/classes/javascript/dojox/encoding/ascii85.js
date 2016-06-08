if(!dojo._hasResource["dojox.encoding.ascii85"]){dojo._hasResource["dojox.encoding.ascii85"]=true;
dojo.provide("dojox.encoding.ascii85");
(function(){var B=function(L,I,M){var J,K,A,N=[0,0,0,0,0];
for(J=0;
J<I;
J+=4){A=((L[J]*256+L[J+1])*256+L[J+2])*256+L[J+3];
if(!A){M.push("z")
}else{for(K=0;
K<5;
N[K++]=A%85+33,A=Math.floor(A/85)){}}M.push(String.fromCharCode(N[4],N[3],N[2],N[1],N[0]))
}};
dojox.encoding.ascii85.encode=function(I){var K=[],J=I.length%4,A=I.length-J;
B(I,A,K);
if(J){var H=I.slice(A);
while(H.length<4){H.push(0)
}B(H,4,K);
var L=K.pop();
if(L=="z"){L="!!!!!"
}K.push(L.substr(0,J+1))
}return K.join("")
};
dojox.encoding.ascii85.decode=function(P){var L=P.length,M=[],Q=[0,0,0,0,0],T,A,N,O,R,S;
for(T=0;
T<L;
++T){if(P.charAt(T)=="z"){M.push(0,0,0,0);
continue
}for(A=0;
A<5;
++A){Q[A]=P.charCodeAt(T+A)-33
}S=L-T;
if(S<5){for(A=S;
A<4;
Q[++A]=0){}Q[S]=85
}N=(((Q[0]*85+Q[1])*85+Q[2])*85+Q[3])*85+Q[4];
O=N&255;
N>>>=8;
R=N&255;
N>>>=8;
M.push(N>>>8,N&255,R,O);
for(A=S;
A<5;
++A,M.pop()){}T+=4
}return M
}
})()
};