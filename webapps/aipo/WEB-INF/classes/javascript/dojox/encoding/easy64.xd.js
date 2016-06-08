dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.easy64"]],defineResource:function(B){if(!B._hasResource["dojox.encoding.easy64"]){B._hasResource["dojox.encoding.easy64"]=true;
B.provide("dojox.encoding.easy64");
(function(){var A=function(I,G,J){for(var H=0;
H<G;
H+=3){J.push(String.fromCharCode((I[H]>>>2)+33),String.fromCharCode(((I[H]&3)<<4)+(I[H+1]>>>4)+33),String.fromCharCode(((I[H+1]&15)<<2)+(I[H+2]>>>6)+33),String.fromCharCode((I[H+2]&63)+33))
}};
dojox.encoding.easy64.encode=function(L){var N=[],M=L.length%3,I=L.length-M;
A(L,I,N);
if(M){var J=L.slice(I);
while(J.length<3){J.push(0)
}A(J,3,N);
for(var K=3;
K>M;
N.pop(),--K){}}return N.join("")
};
dojox.encoding.easy64.decode=function(O){var J=O.length,L=[],P=[0,0,0,0],M,N,K;
for(M=0;
M<J;
M+=4){for(N=0;
N<4;
++N){P[N]=O.charCodeAt(M+N)-33
}K=J-M;
for(N=K;
N<4;
P[++N]=0){}L.push((P[0]<<2)+(P[1]>>>4),((P[1]&15)<<4)+(P[2]>>>2),((P[2]&3)<<6)+P[3]);
for(N=K;
N<4;
++N,L.pop()){}}return L
}
})()
}}});