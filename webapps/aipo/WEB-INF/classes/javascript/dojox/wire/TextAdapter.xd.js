dojo._xdResourceLoaded({depends:[["provide","dojox.wire.TextAdapter"],["require","dojox.wire.CompositeWire"]],defineResource:function(B){if(!B._hasResource["dojox.wire.TextAdapter"]){B._hasResource["dojox.wire.TextAdapter"]=true;
B.provide("dojox.wire.TextAdapter");
B.require("dojox.wire.CompositeWire");
B.declare("dojox.wire.TextAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TextAdapter",constructor:function(A){this._initializeChildren(this.segments);
if(!this.delimiter){this.delimiter=""
}},_getValue:function(H){if(!H||!this.segments){return H
}var A="";
for(var G in this.segments){var F=this.segments[G].getValue(H);
A=this._addSegment(A,F)
}return A
},_setValue:function(D,A){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_addSegment:function(A,D){if(!D){return A
}else{if(!A){return D
}else{return A+this.delimiter+D
}}}})
}}});