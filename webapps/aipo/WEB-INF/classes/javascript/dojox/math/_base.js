if(!dojo._hasResource["dojox.math._base"]){dojo._hasResource["dojox.math._base"]=true;
dojo.provide("dojox.math._base");
dojo.mixin(dojox.math,{degreesToRadians:function(B){return(B*Math.PI)/180
},radiansToDegrees:function(B){return(B*180)/Math.PI
},factoral:function(E){if(E<1){return 0
}var D=1;
for(var F=1;
F<=E;
F++){D*=F
}return D
},permutations:function(D,C){if(D==0||C==0){return 1
}return(this.factoral(D)/this.factoral(D-C))
},combinations:function(D,C){if(D==0||C==0){return 1
}return(this.factoral(D)/(this.factoral(D-C)*this.factoral(C)))
},bernstein:function(F,E,D){return(this.combinations(E,D)*Math.pow(F,D)*Math.pow(1-F,E-D))
},gaussian:function(){var D=2;
do{var E=2*Math.random()-1;
var F=2*Math.random()-1;
D=E*E+F*F
}while(D>=1);
return(E*Math.sqrt((-2*Math.log(D))/D))
},sd:function(B){return Math.sqrt(this.variance(B))
},variance:function(F){var D=0,E=0;
dojo.forEach(F,function(A){D+=A;
E+=Math.pow(A,2)
});
return(E/F.length)-Math.pow(D/F.length,2)
},range:function(L,G,H){if(arguments.length<2){G=L,L=0
}var I=H||1;
var K=[];
if(I>0){for(var J=L;
J<G;
J+=I){K.push(J)
}}else{if(I<0){for(var J=L;
J>G;
J+=I){K.push(J)
}}else{throw new Error("dojox.math.range: step must not be zero.")
}}return K
},distance:function(D,C){return Math.sqrt(Math.pow(C[0]-D[0],2)+Math.pow(C[1]-D[1],2))
},midpoint:function(G,H){if(G.length!=H.length){console.error("dojox.math.midpoint: Points A and B are not the same dimensionally.",G,H)
}var E=[];
for(var F=0;
F<G.length;
F++){E[F]=(G[F]+H[F])/2
}return E
}})
};