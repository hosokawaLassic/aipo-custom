dojo._xdResourceLoaded({depends:[["provide","dojox.math.matrix"]],defineResource:function(B){if(!B._hasResource["dojox.math.matrix"]){B._hasResource["dojox.math.matrix"]=true;
B.provide("dojox.math.matrix");
B.mixin(dojox.math.matrix,{iDF:0,ALMOST_ZERO:1e-10,multiply:function(O,P){var N=O.length,M=O[0].length,S=P.length,Q=P[0].length;
if(M!=S){console.warn("Can't multiply matricies of sizes "+M+","+N+" and "+Q+","+S);
return[[0]]
}var R=[];
for(var A=0;
A<N;
A++){R[A]=[];
for(var T=0;
T<Q;
T++){R[A][T]=0;
for(var L=0;
L<M;
L++){R[A][T]+=O[A][L]*P[L][T]
}}}return R
},product:function(){if(arguments.length==0){console.warn("can't multiply 0 matrices!");
return 1
}var D=arguments[0];
for(var A=1;
A<arguments.length;
A++){D=this.multiply(D,arguments[A])
}return D
},sum:function(){if(arguments.length==0){console.warn("can't sum 0 matrices!");
return 0
}var M=this.copy(arguments[0]);
var J=M.length;
if(J==0){console.warn("can't deal with matrices of 0 rows!");
return 0
}var I=M[0].length;
if(I==0){console.warn("can't deal with matrices of 0 cols!");
return 0
}for(var L=1;
L<arguments.length;
++L){var N=arguments[L];
if(N.length!=J||N[0].length!=I){console.warn("can't add matrices of different dimensions: first dimensions were "+J+"x"+I+", current dimensions are "+N.length+"x"+N[0].length);
return 0
}for(var K=0;
K<J;
K++){for(var A=0;
A<I;
A++){M[K][A]+=N[K][A]
}}}return M
},inverse:function(M){if(M.length==1&&M[0].length==1){return[[1/M[0][0]]]
}var N=M.length,O=this.create(N,N),A=this.adjoint(M),J=this.determinant(M),P=0;
if(J==0){console.warn("Determinant Equals 0, Not Invertible.");
return[[0]]
}else{P=1/J
}for(var K=0;
K<N;
K++){for(var L=0;
L<N;
L++){O[K][L]=P*A[K][L]
}}return O
},determinant:function(J){if(J.length!=J[0].length){console.warn("Can't calculate the determinant of a non-squre matrix!");
return 0
}var K=J.length,H=1,L=this.upperTriangle(J);
for(var I=0;
I<K;
I++){var A=L[I][I];
if(Math.abs(A)<this.ALMOST_ZERO){return 0
}H*=A
}H*=this.iDF;
return H
},upperTriangle:function(A){A=this.copy(A);
var S=0,O=0,T=A.length,P=1;
this.iDF=1;
for(var L=0;
L<T-1;
L++){if(typeof A[L][L]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+L+"]["+L+"]="+A[L][L])
}P=1;
var Q=0;
while((A[L][L]==0)&&!Q){if(L+P>=T){this.iDF=0;
Q=1
}else{for(var M=0;
M<T;
M++){O=A[L][M];
A[L][M]=A[L+P][M];
A[L+P][M]=O
}P++;
this.iDF*=-1
}}for(var N=L+1;
N<T;
N++){if(typeof A[N][L]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+N+"]["+L+"]="+A[N][L])
}if(typeof A[L][N]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+L+"]["+N+"]="+A[L][N])
}if(A[L][L]!=0){var S=(-1)*A[N][L]/A[L][L];
for(var R=L;
R<T;
R++){A[N][R]=S*A[L][R]+A[N][R]
}}}}return A
},create:function(J,K,A){A=A||0;
var L=[];
for(var H=0;
H<K;
H++){L[H]=[];
for(var I=0;
I<J;
I++){L[H][I]=A
}}return L
},ones:function(A,D){return this.create(A,D,1)
},zeros:function(A,D){return this.create(A,D)
},identity:function(G,A){A=A||1;
var J=[];
for(var H=0;
H<G;
H++){J[H]=[];
for(var I=0;
I<G;
I++){J[H][I]=(H==I?A:0)
}}return J
},adjoint:function(Q){var A=Q.length;
if(A<=1){console.warn("Can't find the adjoint of a matrix with a dimension less than 2");
return[[0]]
}if(Q.length!=Q[0].length){console.warn("Can't find the adjoint of a non-square matrix");
return[[0]]
}var M=this.create(A,A),U=this.create(A-1,A-1);
var P=0,S=0,N=0,O=0,R=0;
for(var T=0;
T<A;
T++){for(var V=0;
V<A;
V++){N=0;
for(P=0;
P<A;
P++){if(P==T){continue
}O=0;
for(S=0;
S<A;
S++){if(S==V){continue
}U[N][O]=Q[P][S];
O++
}N++
}R=this.determinant(U);
M[T][V]=Math.pow(-1,(T+V))*R
}}return this.transpose(M)
},transpose:function(G){var H=this.create(G.length,G[0].length);
for(var A=0;
A<G.length;
A++){for(var F=0;
F<G[A].length;
F++){H[F][A]=G[A][F]
}}return H
},format:function(M,L){L=L||5;
function K(D,F){var G=Math.pow(10,F);
var C=Math.round(D*G)/G;
var E=C.toString();
if(E.charAt(0)!="-"){E=" "+E
}if(E.indexOf(".")>-1){E+="."
}while(E.length<F+3){E+="0"
}return E
}var N=M.length;
var A=N>0?M[0].length:0;
var O="";
for(var J=0;
J<N;
J++){O+="| ";
for(var P=0;
P<A;
P++){O+=K(M[J][P],L)+" "
}O+="|\n"
}return O
},copy:function(I){var J=I.length,A=I[0].length,K=this.create(A,J);
for(var H=0;
H<J;
H++){for(var L=0;
L<A;
L++){K[H][L]=I[H][L]
}}return K
},scale:function(J,I){J=this.copy(J);
var K=J.length,A=J[0].length;
for(var H=0;
H<K;
H++){for(var L=0;
L<A;
L++){J[H][L]*=I
}}return J
}})
}}});