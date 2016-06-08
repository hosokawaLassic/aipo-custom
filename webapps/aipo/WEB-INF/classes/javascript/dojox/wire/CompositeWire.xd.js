dojo._xdResourceLoaded({depends:[["provide","dojox.wire.CompositeWire"],["require","dojox.wire._base"],["require","dojox.wire.Wire"]],defineResource:function(B){if(!B._hasResource["dojox.wire.CompositeWire"]){B._hasResource["dojox.wire.CompositeWire"]=true;
B.provide("dojox.wire.CompositeWire");
B.require("dojox.wire._base");
B.require("dojox.wire.Wire");
B.declare("dojox.wire.CompositeWire",dojox.wire.Wire,{_wireClass:"dojox.wire.CompositeWire",constructor:function(A){this._initializeChildren(this.children)
},_getValue:function(F){if(!F||!this.children){return F
}var E=(B.isArray(this.children)?[]:{});
for(var A in this.children){E[A]=this.children[A].getValue(F)
}return E
},_setValue:function(F,E){if(!F||!this.children){return F
}for(var A in this.children){this.children[A].setValue(E[A],F)
}return F
},_initializeChildren:function(F){if(!F){return 
}for(var A in F){var E=F[A];
E.parent=this;
if(!dojox.wire.isWire(E)){F[A]=dojox.wire.create(E)
}}}})
}}});