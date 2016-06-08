dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.scheduler"],["provide","dojox.gfx3d.drawer"],["require","dojox.gfx3d.vector"]],defineResource:function(B){if(!B._hasResource["dojox.gfx3d.scheduler"]){B._hasResource["dojox.gfx3d.scheduler"]=true;
B.provide("dojox.gfx3d.scheduler");
B.provide("dojox.gfx3d.drawer");
B.require("dojox.gfx3d.vector");
B.mixin(dojox.gfx3d.scheduler,{zOrder:function(A,D){D=D?D:dojox.gfx3d.scheduler.order;
A.sort(function(C,F){return D(F)-D(C)
});
return A
},bsp:function(F,E){console.debug("BSP scheduler");
E=E?E:dojox.gfx3d.scheduler.outline;
var A=new dojox.gfx3d.scheduler.BinarySearchTree(F[0],E);
B.forEach(F.slice(1),function(C){A.add(C,E)
});
return A.iterate(E)
},order:function(A){return A.getZOrder()
},outline:function(A){return A.getOutline()
}});
B.declare("dojox.gfx3d.scheduler.BinarySearchTree",null,{constructor:function(E,F){this.plus=null;
this.minus=null;
this.object=E;
var A=F(E);
this.orient=A[0];
this.normal=dojox.gfx3d.vector.normalize(A)
},add:function(K,L){var A=0.5,J=L(K),M=dojox.gfx3d.vector,I=this.normal,N=this.orient;
if(B.every(J,function(C){return Math.floor(A+M.dotProduct(I,M.substract(C,N)))<=0
})){if(this.minus){this.minus.add(K,L)
}else{this.minus=new dojox.gfx3d.scheduler.BinarySearchTree(K,L)
}}else{if(B.every(J,function(C){return Math.floor(A+M.dotProduct(I,M.substract(C,N)))>=0
})){if(this.plus){this.plus.add(K,L)
}else{this.plus=new dojox.gfx3d.scheduler.BinarySearchTree(K,L)
}}else{B.forEach(J,function(C){console.debug(M.dotProduct(I,M.substract(C,N)))
});
throw"The case: polygon cross siblings' plate is not implemneted yet"
}}},iterate:function(H){var A=0.5;
var J=dojox.gfx3d.vector;
var K=[];
var I=null;
var L={x:0,y:0,z:-10000};
if(Math.floor(A+J.dotProduct(this.normal,J.substract(L,this.orient)))<=0){I=[this.plus,this.minus]
}else{I=[this.minus,this.plus]
}if(I[0]){K=K.concat(I[0].iterate())
}K.push(this.object);
if(I[1]){K=K.concat(I[1].iterate())
}return K
}});
B.mixin(dojox.gfx3d.drawer,{conservative:function(E,A,F){console.debug("conservative draw");
B.forEach(this.objects,function(C){C.destroy()
});
B.forEach(A,function(C){C.draw(F.lighting)
})
},chart:function(E,A,F){console.debug("chart draw");
B.forEach(this.todos,function(C){C.draw(F.lighting)
})
}})
}}});