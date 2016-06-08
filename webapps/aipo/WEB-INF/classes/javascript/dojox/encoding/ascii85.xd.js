dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.ascii85"]],defineResource:function(B){if(!B._hasResource["dojox.encoding.ascii85"]){B._hasResource["dojox.encoding.ascii85"]=true;
B.provide("dojox.encoding.ascii85");
(function(){var A=function(N,K,O){var L,M,J,P=[0,0,0,0,0];
for(L=0;
L<K;
L+=4){J=((N[L]*256+N[L+1])*256+N[L+2])*256+N[L+3];
if(!J){O.push("z")
}else{for(M=0;
M<5;
P[M++]=J%85+33,J=Math.floor(J/85)){}}O.push(String.fromCharCode(P[4],P[3],P[2],P[1],P[0]))
}};
dojox.encoding.ascii85.encode=function(K){var M=[],L=K.length%4,I=K.length-L;
A(K,I,M);
if(L){var J=K.slice(I);
while(J.length<4){J.push(0)
}A(J,4,M);
var N=M.pop();
if(N=="z"){N="!!!!!"
}M.push(N.substr(0,L+1))
}return M.join("")
};
dojox.encoding.ascii85.decode=function(Q){var M=Q.length,N=[],R=[0,0,0,0,0],U,V,O,P,S,T;
for(U=0;
U<M;
++U){if(Q.charAt(U)=="z"){N.push(0,0,0,0);
continue
}for(V=0;
V<5;
++V){R[V]=Q.charCodeAt(U+V)-33
}T=M-U;
if(T<5){for(V=T;
V<4;
R[++V]=0){}R[T]=85
}O=(((R[0]*85+R[1])*85+R[2])*85+R[3])*85+R[4];
P=O&255;
O>>>=8;
S=O&255;
O>>>=8;
N.push(O>>>8,O&255,S,P);
for(V=T;
V<5;
++V,N.pop()){}U+=4
}return N
}
})()
}}});