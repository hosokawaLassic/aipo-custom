if(!dojo._hasResource["dojox.wire.TreeAdapter"]){dojo._hasResource["dojox.wire.TreeAdapter"]=true;
dojo.provide("dojox.wire.TreeAdapter");
dojo.require("dojox.wire.CompositeWire");
dojo.declare("dojox.wire.TreeAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TreeAdapter",constructor:function(B){this._initializeChildren(this.nodes)
},_getValue:function(J){if(!J||!this.nodes){return J
}var G=J;
if(!dojo.isArray(G)){G=[G]
}var F=[];
for(var I in G){for(var H in this.nodes){F=F.concat(this._getNodes(G[I],this.nodes[H]))
}}return F
},_setValue:function(C,D){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_initializeChildren:function(F){if(!F){return 
}for(var D in F){var E=F[D];
if(E.node){E.node.parent=this;
if(!dojox.wire.isWire(E.node)){E.node=dojox.wire.create(E.node)
}}if(E.title){E.title.parent=this;
if(!dojox.wire.isWire(E.title)){E.title=dojox.wire.create(E.title)
}}if(E.children){this._initializeChildren(E.children)
}}},_getNodes:function(P,J){var K=null;
if(J.node){K=J.node.getValue(P);
if(!K){return[]
}if(!dojo.isArray(K)){K=[K]
}}else{K=[P]
}var I=[];
for(var N in K){P=K[N];
var L={};
if(J.title){L.title=J.title.getValue(P)
}else{L.title=P
}if(J.children){var O=[];
for(var M in J.children){O=O.concat(this._getNodes(P,J.children[M]))
}if(O.length>0){L.children=O
}}I.push(L)
}return I
}})
};