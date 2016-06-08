dojo._xdResourceLoaded({depends:[["provide","dojox.math.curves"]],defineResource:function(B){if(!B._hasResource["dojox.math.curves"]){B._hasResource["dojox.math.curves"]=true;
B.provide("dojox.math.curves");
B.mixin(dojox.math.curves,{Line:function(A,F){this.start=A;
this.end=F;
this.dimensions=A.length;
for(var E=0;
E<A.length;
E++){A[E]=Number(A[E])
}for(var E=0;
E<F.length;
E++){F[E]=Number(F[E])
}this.getValue=function(C){var D=new Array(this.dimensions);
for(var H=0;
H<this.dimensions;
H++){D[H]=((this.end[H]-this.start[H])*C)+this.start[H]
}return D
};
return this
},Bezier:function(A){this.getValue=function(N){if(N>=1){return this.p[this.p.length-1]
}if(N<=0){return this.p[0]
}var D=new Array(this.p[0].length);
for(var Q=0;
P<this.p[0].length;
Q++){D[Q]=0
}for(var P=0;
P<this.p[0].length;
P++){var C=0;
var M=0;
for(var O=0;
O<this.p.length;
O++){C+=this.p[O][P]*this.p[this.p.length-1][0]*dojox.math.bernstein(N,this.p.length,O)
}for(var R=0;
R<this.p.length;
R++){M+=this.p[this.p.length-1][0]*dojox.math.bernstein(N,this.p.length,R)
}D[P]=C/M
}return D
};
this.p=A;
return this
},CatmullRom:function(D,A){this.getValue=function(d){var W=d*(this.p.length-1);
var c=Math.floor(W);
var j=W-c;
var Y=c-1;
if(Y<0){Y=0
}var X=c;
var Z=c+1;
if(Z>=this.p.length){Z=this.p.length-1
}var b=c+2;
if(b>=this.p.length){b=this.p.length-1
}var V=j;
var f=j*j;
var h=j*j*j;
var e=new Array(this.p[0].length);
for(var a=0;
a<this.p[0].length;
a++){var g=(-this.c*this.p[Y][a])+((2-this.c)*this.p[X][a])+((this.c-2)*this.p[Z][a])+(this.c*this.p[b][a]);
var i=(2*this.c*this.p[Y][a])+((this.c-3)*this.p[X][a])+((3-2*this.c)*this.p[Z][a])+(-this.c*this.p[b][a]);
var C=(-this.c*this.p[Y][a])+(this.c*this.p[Z][a]);
var U=this.p[X][a];
e[a]=g*h+i*f+C*V+U
}return e
};
if(!A){this.c=0.7
}else{this.c=A
}this.p=D;
return this
},Arc:function(K,O,M){function P(C,D){var E=new Array(C.length);
for(var F=0;
F<C.length;
F++){E[F]=C[F]+D[F]
}return E
}function A(C){var D=new Array(C.length);
for(var E=0;
E<C.length;
E++){D[E]=-C[E]
}return D
}var L=dojox.math.midpoint(K,O);
var Q=P(A(L),K);
var N=Math.sqrt(Math.pow(Q[0],2)+Math.pow(Q[1],2));
var R=dojox.math.radiansToDegrees(Math.atan(Q[1]/Q[0]));
if(Q[0]<0){R-=90
}else{R+=90
}dojox.math.curves.CenteredArc.call(this,L,N,R,R+(M?-180:180))
},CenteredArc:function(G,H,A,F){this.center=G;
this.radius=H;
this.start=A||0;
this.end=F;
this.getValue=function(C){var D=new Array(2);
var E=dojox.math.degreesToRadians(this.start+((this.end-this.start)*C));
D[0]=this.center[0]+this.radius*Math.sin(E);
D[1]=this.center[1]-this.radius*Math.cos(E);
return D
};
return this
},Circle:function(A,D){dojox.math.curves.CenteredArc.call(this,A,D,0,360);
return this
},Path:function(){var A=[];
var G=[];
var H=[];
var J=0;
this.add=function(C,D){if(D<0){console.error("dojox.math.curves.Path.add: weight cannot be less than 0")
}A.push(C);
G.push(D);
J+=D;
I()
};
this.remove=function(C){for(var D=0;
D<A.length;
D++){if(A[D]==C){A.splice(D,1);
J-=G.splice(D,1)[0];
break
}}I()
};
this.removeAll=function(){A=[];
G=[];
J=0
};
this.getValue=function(P){var D=false,E=0;
for(var N=0;
N<H.length;
N++){var F=H[N];
if(P>=F[0]&&P<F[1]){var C=(P-F[0])/F[2];
E=A[N].getValue(C);
D=true;
break
}}if(!D){E=A[A.length-1].getValue(1)
}for(var O=0;
O<N;
O++){E=dojox.math.points.translate(E,A[O].getValue(1))
}return E
};
function I(){var C=0;
for(var D=0;
D<G.length;
D++){var E=C+G[D]/J;
var F=E-C;
H[D]=[C,E,F];
C=E
}}return this
}})
}}});