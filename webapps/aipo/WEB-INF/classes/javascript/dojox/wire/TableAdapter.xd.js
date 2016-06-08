dojo._xdResourceLoaded({depends:[["provide","dojox.wire.TableAdapter"],["require","dojox.wire.CompositeWire"]],defineResource:function(B){if(!B._hasResource["dojox.wire.TableAdapter"]){B._hasResource["dojox.wire.TableAdapter"]=true;
B.provide("dojox.wire.TableAdapter");
B.require("dojox.wire.CompositeWire");
B.declare("dojox.wire.TableAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TableAdapter",constructor:function(A){this._initializeChildren(this.columns)
},_getValue:function(J){if(!J||!this.columns){return J
}var A=J;
if(!B.isArray(A)){A=[A]
}var H=[];
for(var I in A){var G=this._getRow(A[I]);
H.push(G)
}return H
},_setValue:function(D,A){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_getRow:function(F){var E=(B.isArray(this.columns)?[]:{});
for(var A in this.columns){E[A]=this.columns[A].getValue(F)
}return E
}})
}}});