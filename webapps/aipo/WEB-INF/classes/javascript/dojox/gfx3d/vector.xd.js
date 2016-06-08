dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.vector"]],defineResource:function(B){if(!B._hasResource["dojox.gfx3d.vector"]){B._hasResource["dojox.gfx3d.vector"]=true;
B.provide("dojox.gfx3d.vector");
B.mixin(dojox.gfx3d.vector,{sum:function(){var A={x:0,y:0,z:0};
B.forEach(arguments,function(D){A.x+=D.x;
A.y+=D.y;
A.z+=D.z
});
return A
},center:function(){var D=arguments.length;
if(D==0){return{x:0,y:0,z:0}
}var A=dojox.gfx3d.vector.sum(arguments);
return{x:A.x/D,y:A.y/D,z:A.z/D}
},substract:function(A,D){return{x:A.x-D.x,y:A.y-D.y,z:A.z-D.z}
},_crossProduct:function(L,A,H,I,J,K){return{x:A*K-H*J,y:H*I-L*K,z:L*J-A*I}
},crossProduct:function(K,L,A,H,I,J){if(arguments.length==6&&B.every(arguments,function(C){return typeof C=="number"
})){return dojox.gfx3d.vector._crossProduct(K,L,A,H,I,J)
}return dojox.gfx3d.vector._crossProduct(K.x,K.y,K.z,L.x,L.y,L.z)
},_dotProduct:function(L,A,H,I,J,K){return L*I+A*J+H*K
},dotProduct:function(K,L,A,H,I,J){if(arguments.length==6&&B.every(arguments,function(C){return typeof C=="number"
})){return dojox.gfx3d.vector._dotProduct(K,L,A,H,I,J)
}return dojox.gfx3d.vector._dotProduct(K.x,K.y,K.z,L.x,L.y,L.z)
},normalize:function(M,O,A){var N,P,J;
if(M instanceof Array){N=M[0];
P=M[1];
J=M[2]
}else{N=M;
P=O;
J=A
}var K=dojox.gfx3d.vector.substract(P,N);
var L=dojox.gfx3d.vector.substract(J,N);
return dojox.gfx3d.vector.crossProduct(K,L)
}})
}}});