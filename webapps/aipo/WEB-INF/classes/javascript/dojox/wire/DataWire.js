if(!dojo._hasResource["dojox.wire.DataWire"]){dojo._hasResource["dojox.wire.DataWire"]=true;
dojo.provide("dojox.wire.DataWire");
dojo.require("dojox.wire.Wire");
dojo.declare("dojox.wire.DataWire",dojox.wire.Wire,{_wireClass:"dojox.wire.DataWire",constructor:function(B){if(!this.dataStore&&this.parent){this.dataStore=this.parent.dataStore
}},_getValue:function(E){if(!E||!this.attribute||!this.dataStore){return E
}var F=E;
var G=this.attribute.split(".");
for(var H in G){F=this._getAttributeValue(F,G[H]);
if(!F){return undefined
}}return F
},_setValue:function(G,H){if(!G||!this.attribute||!this.dataStore){return G
}var J=G;
var I=this.attribute.split(".");
var K=I.length-1;
for(var L=0;
L<K;
L++){J=this._getAttributeValue(J,I[L]);
if(!J){return undefined
}}this._setAttributeValue(J,I[K],H);
return G
},_getAttributeValue:function(K,L){var J=undefined;
var M=L.indexOf("[");
if(M>=0){var N=L.indexOf("]");
var H=L.substring(M+1,N);
L=L.substring(0,M);
var I=this.dataStore.getValues(K,L);
if(I){if(!H){J=I
}else{J=I[H]
}}}else{J=this.dataStore.getValue(K,L)
}return J
},_setAttributeValue:function(K,L,J){var M=L.indexOf("[");
if(M>=0){var N=L.indexOf("]");
var H=L.substring(M+1,N);
L=L.substring(0,M);
var I=null;
if(!H){I=J
}else{I=this.dataStore.getValues(K,L);
if(!I){I=[]
}I[H]=J
}this.dataStore.setValues(K,L,I)
}else{this.dataStore.setValue(K,L,J)
}}})
};