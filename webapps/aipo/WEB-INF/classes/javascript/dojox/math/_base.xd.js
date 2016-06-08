dojo._xdResourceLoaded({depends:[["provide","dojox.math._base"]],defineResource:function(B){if(!B._hasResource["dojox.math._base"]){B._hasResource["dojox.math._base"]=true;
B.provide("dojox.math._base");
B.mixin(dojox.math,{degreesToRadians:function(A){return(A*Math.PI)/180
},radiansToDegrees:function(A){return(A*180)/Math.PI
},factoral:function(A){if(A<1){return 0
}var F=1;
for(var E=1;
E<=A;
E++){F*=E
}return F
},permutations:function(A,D){if(A==0||D==0){return 1
}return(this.factoral(A)/this.factoral(A-D))
},combinations:function(A,D){if(A==0||D==0){return 1
}return(this.factoral(A)/(this.factoral(A-D)*this.factoral(D)))
},bernstein:function(E,A,F){return(this.combinations(A,F)*Math.pow(E,F)*Math.pow(1-E,A-F))
},gaussian:function(){var F=2;
do{var A=2*Math.random()-1;
var E=2*Math.random()-1;
F=A*A+E*E
}while(F>=1);
return(A*Math.sqrt((-2*Math.log(F))/F))
},sd:function(A){return Math.sqrt(this.variance(A))
},variance:function(E){var F=0,A=0;
B.forEach(E,function(C){F+=C;
A+=Math.pow(C,2)
});
return(A/E.length)-Math.pow(F/E.length,2)
},range:function(K,L,A){if(arguments.length<2){L=K,K=0
}var H=A||1;
var J=[];
if(H>0){for(var I=K;
I<L;
I+=H){J.push(I)
}}else{if(H<0){for(var I=K;
I>L;
I+=H){J.push(I)
}}else{throw new Error("dojox.math.range: step must not be zero.")
}}return J
},distance:function(A,D){return Math.sqrt(Math.pow(D[0]-A[0],2)+Math.pow(D[1]-A[1],2))
},midpoint:function(F,G){if(F.length!=G.length){console.error("dojox.math.midpoint: Points A and B are not the same dimensionally.",F,G)
}var H=[];
for(var A=0;
A<F.length;
A++){H[A]=(F[A]+G[A])/2
}return H
}})
}}});