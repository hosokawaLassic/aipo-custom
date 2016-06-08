if(!dojo._hasResource["dojox.wire.TableAdapter"]){dojo._hasResource["dojox.wire.TableAdapter"]=true;
dojo.provide("dojox.wire.TableAdapter");
dojo.require("dojox.wire.CompositeWire");
dojo.declare("dojox.wire.TableAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TableAdapter",constructor:function(B){this._initializeChildren(this.columns)
},_getValue:function(F){if(!F||!this.columns){return F
}var G=F;
if(!dojo.isArray(G)){G=[G]
}var I=[];
for(var J in G){var H=this._getRow(G[J]);
I.push(H)
}return I
},_setValue:function(C,D){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_getRow:function(D){var F=(dojo.isArray(this.columns)?[]:{});
for(var E in this.columns){F[E]=this.columns[E].getValue(D)
}return F
}})
};