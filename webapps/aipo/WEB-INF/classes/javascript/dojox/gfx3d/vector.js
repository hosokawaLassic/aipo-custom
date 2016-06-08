if(!dojo._hasResource["dojox.gfx3d.vector"]){dojo._hasResource["dojox.gfx3d.vector"]=true;
dojo.provide("dojox.gfx3d.vector");
dojo.mixin(dojox.gfx3d.vector,{sum:function(){var B={x:0,y:0,z:0};
dojo.forEach(arguments,function(A){B.x+=A.x;
B.y+=A.y;
B.z+=A.z
});
return B
},center:function(){var C=arguments.length;
if(C==0){return{x:0,y:0,z:0}
}var D=dojox.gfx3d.vector.sum(arguments);
return{x:D.x/C,y:D.y/C,z:D.z/C}
},substract:function(D,C){return{x:D.x-C.x,y:D.y-C.y,z:D.z-C.z}
},_crossProduct:function(G,H,I,J,K,L){return{x:H*L-I*K,y:I*J-G*L,z:G*K-H*J}
},crossProduct:function(L,G,H,I,J,K){if(arguments.length==6&&dojo.every(arguments,function(A){return typeof A=="number"
})){return dojox.gfx3d.vector._crossProduct(L,G,H,I,J,K)
}return dojox.gfx3d.vector._crossProduct(L.x,L.y,L.z,G.x,G.y,G.z)
},_dotProduct:function(G,H,I,J,K,L){return G*J+H*K+I*L
},dotProduct:function(L,G,H,I,J,K){if(arguments.length==6&&dojo.every(arguments,function(A){return typeof A=="number"
})){return dojox.gfx3d.vector._dotProduct(L,G,H,I,J,K)
}return dojox.gfx3d.vector._dotProduct(L.x,L.y,L.z,G.x,G.y,G.z)
},normalize:function(N,P,J){var O,I,K;
if(N instanceof Array){O=N[0];
I=N[1];
K=N[2]
}else{O=N;
I=P;
K=J
}var L=dojox.gfx3d.vector.substract(I,O);
var M=dojox.gfx3d.vector.substract(K,O);
return dojox.gfx3d.vector.crossProduct(L,M)
}})
};