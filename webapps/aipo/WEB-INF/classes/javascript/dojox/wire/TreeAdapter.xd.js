dojo._xdResourceLoaded({depends:[["provide","dojox.wire.TreeAdapter"],["require","dojox.wire.CompositeWire"]],defineResource:function(B){if(!B._hasResource["dojox.wire.TreeAdapter"]){B._hasResource["dojox.wire.TreeAdapter"]=true;
B.provide("dojox.wire.TreeAdapter");
B.require("dojox.wire.CompositeWire");
B.declare("dojox.wire.TreeAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TreeAdapter",constructor:function(A){this._initializeChildren(this.nodes)
},_getValue:function(I){if(!I||!this.nodes){return I
}var A=I;
if(!B.isArray(A)){A=[A]
}var J=[];
for(var H in A){for(var G in this.nodes){J=J.concat(this._getNodes(A[H],this.nodes[G]))
}}return J
},_setValue:function(D,A){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_initializeChildren:function(E){if(!E){return 
}for(var F in E){var A=E[F];
if(A.node){A.node.parent=this;
if(!dojox.wire.isWire(A.node)){A.node=dojox.wire.create(A.node)
}}if(A.title){A.title.parent=this;
if(!dojox.wire.isWire(A.title)){A.title=dojox.wire.create(A.title)
}}if(A.children){this._initializeChildren(A.children)
}}},_getNodes:function(O,A){var J=null;
if(A.node){J=A.node.getValue(O);
if(!J){return[]
}if(!B.isArray(J)){J=[J]
}}else{J=[O]
}var P=[];
for(var M in J){O=J[M];
var K={};
if(A.title){K.title=A.title.getValue(O)
}else{K.title=O
}if(A.children){var N=[];
for(var L in A.children){N=N.concat(this._getNodes(O,A.children[L]))
}if(N.length>0){K.children=N
}}P.push(K)
}return P
}})
}}});