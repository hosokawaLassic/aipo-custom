if(!dojo._hasResource["dojox.math.matrix"]){dojo._hasResource["dojox.math.matrix"]=true;
dojo.provide("dojox.math.matrix");
dojo.mixin(dojox.math.matrix,{iDF:0,ALMOST_ZERO:1e-10,multiply:function(P,Q){var O=P.length,N=P[0].length,T=Q.length,R=Q[0].length;
if(N!=T){console.warn("Can't multiply matricies of sizes "+N+","+O+" and "+R+","+T);
return[[0]]
}var S=[];
for(var L=0;
L<O;
L++){S[L]=[];
for(var K=0;
K<R;
K++){S[L][K]=0;
for(var M=0;
M<N;
M++){S[L][K]+=P[L][M]*Q[M][K]
}}}return S
},product:function(){if(arguments.length==0){console.warn("can't multiply 0 matrices!");
return 1
}var C=arguments[0];
for(var D=1;
D<arguments.length;
D++){C=this.multiply(C,arguments[D])
}return C
},sum:function(){if(arguments.length==0){console.warn("can't sum 0 matrices!");
return 0
}var N=this.copy(arguments[0]);
var K=N.length;
if(K==0){console.warn("can't deal with matrices of 0 rows!");
return 0
}var J=N[0].length;
if(J==0){console.warn("can't deal with matrices of 0 cols!");
return 0
}for(var M=1;
M<arguments.length;
++M){var H=arguments[M];
if(H.length!=K||H[0].length!=J){console.warn("can't add matrices of different dimensions: first dimensions were "+K+"x"+J+", current dimensions are "+H.length+"x"+H[0].length);
return 0
}for(var L=0;
L<K;
L++){for(var I=0;
I<J;
I++){N[L][I]+=H[L][I]
}}}return N
},inverse:function(N){if(N.length==1&&N[0].length==1){return[[1/N[0][0]]]
}var O=N.length,P=this.create(O,O),J=this.adjoint(N),K=this.determinant(N),I=0;
if(K==0){console.warn("Determinant Equals 0, Not Invertible.");
return[[0]]
}else{I=1/K
}for(var L=0;
L<O;
L++){for(var M=0;
M<O;
M++){P[L][M]=I*J[L][M]
}}return P
},determinant:function(K){if(K.length!=K[0].length){console.warn("Can't calculate the determinant of a non-squre matrix!");
return 0
}var L=K.length,I=1,G=this.upperTriangle(K);
for(var J=0;
J<L;
J++){var H=G[J][J];
if(Math.abs(H)<this.ALMOST_ZERO){return 0
}I*=H
}I*=this.iDF;
return I
},upperTriangle:function(L){L=this.copy(L);
var T=0,P=0,K=L.length,Q=1;
this.iDF=1;
for(var M=0;
M<K-1;
M++){if(typeof L[M][M]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+M+"]["+M+"]="+L[M][M])
}Q=1;
var R=0;
while((L[M][M]==0)&&!R){if(M+Q>=K){this.iDF=0;
R=1
}else{for(var N=0;
N<K;
N++){P=L[M][N];
L[M][N]=L[M+Q][N];
L[M+Q][N]=P
}Q++;
this.iDF*=-1
}}for(var O=M+1;
O<K;
O++){if(typeof L[O][M]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+O+"]["+M+"]="+L[O][M])
}if(typeof L[M][O]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+M+"]["+O+"]="+L[M][O])
}if(L[M][M]!=0){var T=(-1)*L[O][M]/L[M][M];
for(var S=M;
S<K;
S++){L[O][S]=T*L[M][S]+L[O][S]
}}}}return L
},create:function(K,L,H){H=H||0;
var G=[];
for(var I=0;
I<L;
I++){G[I]=[];
for(var J=0;
J<K;
J++){G[I][J]=H
}}return G
},ones:function(D,C){return this.create(D,C,1)
},zeros:function(D,C){return this.create(D,C)
},identity:function(H,G){G=G||1;
var F=[];
for(var I=0;
I<H;
I++){F[I]=[];
for(var J=0;
J<H;
J++){F[I][J]=(I==J?G:0)
}}return F
},adjoint:function(R){var M=R.length;
if(M<=1){console.warn("Can't find the adjoint of a matrix with a dimension less than 2");
return[[0]]
}if(R.length!=R[0].length){console.warn("Can't find the adjoint of a non-square matrix");
return[[0]]
}var N=this.create(M,M),V=this.create(M-1,M-1);
var Q=0,T=0,O=0,P=0,S=0;
for(var U=0;
U<M;
U++){for(var L=0;
L<M;
L++){O=0;
for(Q=0;
Q<M;
Q++){if(Q==U){continue
}P=0;
for(T=0;
T<M;
T++){if(T==L){continue
}V[O][P]=R[Q][T];
P++
}O++
}S=this.determinant(V);
N[U][L]=Math.pow(-1,(U+L))*S
}}return this.transpose(N)
},transpose:function(H){var E=this.create(H.length,H[0].length);
for(var F=0;
F<H.length;
F++){for(var G=0;
G<H[F].length;
G++){E[G][F]=H[F][G]
}}return E
},format:function(N,M){M=M||5;
function L(C,E){var A=Math.pow(10,E);
var B=Math.round(C*A)/A;
var D=B.toString();
if(D.charAt(0)!="-"){D=" "+D
}if(D.indexOf(".")>-1){D+="."
}while(D.length<E+3){D+="0"
}return D
}var O=N.length;
var J=O>0?N[0].length:0;
var P="";
for(var K=0;
K<O;
K++){P+="| ";
for(var I=0;
I<J;
I++){P+=L(N[K][I],M)+" "
}P+="|\n"
}return P
},copy:function(J){var K=J.length,H=J[0].length,L=this.create(H,K);
for(var I=0;
I<K;
I++){for(var G=0;
G<H;
G++){L[I][G]=J[I][G]
}}return L
},scale:function(K,J){K=this.copy(K);
var L=K.length,H=K[0].length;
for(var I=0;
I<L;
I++){for(var G=0;
G<H;
G++){K[I][G]*=J
}}return K
}})
};