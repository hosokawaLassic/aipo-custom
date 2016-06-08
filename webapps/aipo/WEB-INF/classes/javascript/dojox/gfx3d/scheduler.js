if(!dojo._hasResource["dojox.gfx3d.scheduler"]){dojo._hasResource["dojox.gfx3d.scheduler"]=true;
dojo.provide("dojox.gfx3d.scheduler");
dojo.provide("dojox.gfx3d.drawer");
dojo.require("dojox.gfx3d.vector");
dojo.mixin(dojox.gfx3d.scheduler,{zOrder:function(D,C){C=C?C:dojox.gfx3d.scheduler.order;
D.sort(function(A,B){return C(B)-C(A)
});
return D
},bsp:function(D,F){console.debug("BSP scheduler");
F=F?F:dojox.gfx3d.scheduler.outline;
var E=new dojox.gfx3d.scheduler.BinarySearchTree(D[0],F);
dojo.forEach(D.slice(1),function(A){E.add(A,F)
});
return E.iterate(F)
},order:function(B){return B.getZOrder()
},outline:function(B){return B.getOutline()
}});
dojo.declare("dojox.gfx3d.scheduler.BinarySearchTree",null,{constructor:function(F,D){this.plus=null;
this.minus=null;
this.object=F;
var E=D(F);
this.orient=E[0];
this.normal=dojox.gfx3d.vector.normalize(E)
},add:function(L,M){var I=0.5,K=M(L),N=dojox.gfx3d.vector,J=this.normal,H=this.orient;
if(dojo.every(K,function(A){return Math.floor(I+N.dotProduct(J,N.substract(A,H)))<=0
})){if(this.minus){this.minus.add(L,M)
}else{this.minus=new dojox.gfx3d.scheduler.BinarySearchTree(L,M)
}}else{if(dojo.every(K,function(A){return Math.floor(I+N.dotProduct(J,N.substract(A,H)))>=0
})){if(this.plus){this.plus.add(L,M)
}else{this.plus=new dojox.gfx3d.scheduler.BinarySearchTree(L,M)
}}else{dojo.forEach(K,function(A){console.debug(N.dotProduct(J,N.substract(A,H)))
});
throw"The case: polygon cross siblings' plate is not implemneted yet"
}}},iterate:function(I){var H=0.5;
var K=dojox.gfx3d.vector;
var L=[];
var J=null;
var G={x:0,y:0,z:-10000};
if(Math.floor(H+K.dotProduct(this.normal,K.substract(G,this.orient)))<=0){J=[this.plus,this.minus]
}else{J=[this.minus,this.plus]
}if(J[0]){L=L.concat(J[0].iterate())
}L.push(this.object);
if(J[1]){L=L.concat(J[1].iterate())
}return L
}});
dojo.mixin(dojox.gfx3d.drawer,{conservative:function(F,E,D){console.debug("conservative draw");
dojo.forEach(this.objects,function(A){A.destroy()
});
dojo.forEach(E,function(A){A.draw(D.lighting)
})
},chart:function(F,E,D){console.debug("chart draw");
dojo.forEach(this.todos,function(A){A.draw(D.lighting)
})
}})
};