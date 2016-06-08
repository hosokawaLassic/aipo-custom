if(!dojo._hasResource["dojox.wire.CompositeWire"]){dojo._hasResource["dojox.wire.CompositeWire"]=true;
dojo.provide("dojox.wire.CompositeWire");
dojo.require("dojox.wire._base");
dojo.require("dojox.wire.Wire");
dojo.declare("dojox.wire.CompositeWire",dojox.wire.Wire,{_wireClass:"dojox.wire.CompositeWire",constructor:function(B){this._initializeChildren(this.children)
},_getValue:function(D){if(!D||!this.children){return D
}var F=(dojo.isArray(this.children)?[]:{});
for(var E in this.children){F[E]=this.children[E].getValue(D)
}return F
},_setValue:function(D,F){if(!D||!this.children){return D
}for(var E in this.children){this.children[E].setValue(F[E],D)
}return D
},_initializeChildren:function(D){if(!D){return 
}for(var E in D){var F=D[E];
F.parent=this;
if(!dojox.wire.isWire(F)){D[E]=dojox.wire.create(F)
}}}})
};