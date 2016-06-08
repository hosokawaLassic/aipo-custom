if(!dojo._hasResource["dojox.encoding.easy64"]){dojo._hasResource["dojox.encoding.easy64"]=true;
dojo.provide("dojox.encoding.easy64");
(function(){var B=function(G,A,H){for(var F=0;
F<A;
F+=3){H.push(String.fromCharCode((G[F]>>>2)+33),String.fromCharCode(((G[F]&3)<<4)+(G[F+1]>>>4)+33),String.fromCharCode(((G[F+1]&15)<<2)+(G[F+2]>>>6)+33),String.fromCharCode((G[F+2]&63)+33))
}};
dojox.encoding.easy64.encode=function(J){var L=[],K=J.length%3,A=J.length-K;
B(J,A,L);
if(K){var H=J.slice(A);
while(H.length<3){H.push(0)
}B(H,3,L);
for(var I=3;
I>K;
L.pop(),--I){}}return L.join("")
};
dojox.encoding.easy64.decode=function(M){var A=M.length,J=[],N=[0,0,0,0],K,L,I;
for(K=0;
K<A;
K+=4){for(L=0;
L<4;
++L){N[L]=M.charCodeAt(K+L)-33
}I=A-K;
for(L=I;
L<4;
N[++L]=0){}J.push((N[0]<<2)+(N[1]>>>4),((N[1]&15)<<4)+(N[2]>>>2),((N[2]&3)<<6)+N[3]);
for(L=I;
L<4;
++L,J.pop()){}}return J
}
})()
};