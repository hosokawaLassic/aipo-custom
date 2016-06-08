if(!dojo._hasResource["dojox.wire.TextAdapter"]){dojo._hasResource["dojox.wire.TextAdapter"]=true;
dojo.provide("dojox.wire.TextAdapter");
dojo.require("dojox.wire.CompositeWire");
dojo.declare("dojox.wire.TextAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TextAdapter",constructor:function(B){this._initializeChildren(this.segments);
if(!this.delimiter){this.delimiter=""
}},_getValue:function(E){if(!E||!this.segments){return E
}var F="";
for(var H in this.segments){var G=this.segments[H].getValue(E);
F=this._addSegment(F,G)
}return F
},_setValue:function(C,D){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_addSegment:function(D,C){if(!C){return D
}else{if(!D){return C
}else{return D+this.delimiter+C
}}}})
};