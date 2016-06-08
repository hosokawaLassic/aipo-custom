if(!dojo._hasResource["dojox.math.curves"]){dojo._hasResource["dojox.math.curves"]=true;
dojo.provide("dojox.math.curves");
dojo.mixin(dojox.math.curves,{Line:function(E,D){this.start=E;
this.end=D;
this.dimensions=E.length;
for(var F=0;
F<E.length;
F++){E[F]=Number(E[F])
}for(var F=0;
F<D.length;
F++){D[F]=Number(D[F])
}this.getValue=function(A){var B=new Array(this.dimensions);
for(var C=0;
C<this.dimensions;
C++){B[C]=((this.end[C]-this.start[C])*A)+this.start[C]
}return B
};
return this
},Bezier:function(B){this.getValue=function(L){if(L>=1){return this.p[this.p.length-1]
}if(L<=0){return this.p[0]
}var C=new Array(this.p[0].length);
for(var O=0;
N<this.p[0].length;
O++){C[O]=0
}for(var N=0;
N<this.p[0].length;
N++){var A=0;
var D=0;
for(var M=0;
M<this.p.length;
M++){A+=this.p[M][N]*this.p[this.p.length-1][0]*dojox.math.bernstein(L,this.p.length,M)
}for(var P=0;
P<this.p.length;
P++){D+=this.p[this.p.length-1][0]*dojox.math.bernstein(L,this.p.length,P)
}C[N]=A/D
}return C
};
this.p=B;
return this
},CatmullRom:function(C,D){this.getValue=function(c){var V=c*(this.p.length-1);
var b=Math.floor(V);
var A=V-b;
var X=b-1;
if(X<0){X=0
}var W=b;
var Y=b+1;
if(Y>=this.p.length){Y=this.p.length-1
}var a=b+2;
if(a>=this.p.length){a=this.p.length-1
}var U=A;
var e=A*A;
var g=A*A*A;
var d=new Array(this.p[0].length);
for(var Z=0;
Z<this.p[0].length;
Z++){var f=(-this.c*this.p[X][Z])+((2-this.c)*this.p[W][Z])+((this.c-2)*this.p[Y][Z])+(this.c*this.p[a][Z]);
var h=(2*this.c*this.p[X][Z])+((this.c-3)*this.p[W][Z])+((3-2*this.c)*this.p[Y][Z])+(-this.c*this.p[a][Z]);
var B=(-this.c*this.p[X][Z])+(this.c*this.p[Y][Z]);
var T=this.p[W][Z];
d[Z]=f*g+h*e+B*U+T
}return d
};
if(!D){this.c=0.7
}else{this.c=D
}this.p=C;
return this
},Arc:function(L,P,N){function Q(B,C){var D=new Array(B.length);
for(var A=0;
A<B.length;
A++){D[A]=B[A]+C[A]
}return D
}function K(B){var C=new Array(B.length);
for(var A=0;
A<B.length;
A++){C[A]=-B[A]
}return C
}var M=dojox.math.midpoint(L,P);
var R=Q(K(M),L);
var O=Math.sqrt(Math.pow(R[0],2)+Math.pow(R[1],2));
var J=dojox.math.radiansToDegrees(Math.atan(R[1]/R[0]));
if(R[0]<0){J-=90
}else{J+=90
}dojox.math.curves.CenteredArc.call(this,M,O,J,J+(N?-180:180))
},CenteredArc:function(H,E,F,G){this.center=H;
this.radius=E;
this.start=F||0;
this.end=G;
this.getValue=function(A){var B=new Array(2);
var C=dojox.math.degreesToRadians(this.start+((this.end-this.start)*A));
B[0]=this.center[0]+this.radius*Math.sin(C);
B[1]=this.center[1]-this.radius*Math.cos(C);
return B
};
return this
},Circle:function(D,C){dojox.math.curves.CenteredArc.call(this,D,C,0,360);
return this
},Path:function(){var G=[];
var H=[];
var I=[];
var F=0;
this.add=function(A,B){if(B<0){console.error("dojox.math.curves.Path.add: weight cannot be less than 0")
}G.push(A);
H.push(B);
F+=B;
J()
};
this.remove=function(A){for(var B=0;
B<G.length;
B++){if(G[B]==A){G.splice(B,1);
F-=H.splice(B,1)[0];
break
}}J()
};
this.removeAll=function(){G=[];
H=[];
F=0
};
this.getValue=function(A){var C=false,D=0;
for(var M=0;
M<I.length;
M++){var E=I[M];
if(A>=E[0]&&A<E[1]){var B=(A-E[0])/E[2];
D=G[M].getValue(B);
C=true;
break
}}if(!C){D=G[G.length-1].getValue(1)
}for(var N=0;
N<M;
N++){D=dojox.math.points.translate(D,G[N].getValue(1))
}return D
};
function J(){var A=0;
for(var B=0;
B<H.length;
B++){var C=A+H[B]/F;
var D=C-A;
I[B]=[A,C,D];
A=C
}}return this
}})
};