dojo._xdResourceLoaded({depends:[["provide","dojox.wire.DataWire"],["require","dojox.wire.Wire"]],defineResource:function(B){if(!B._hasResource["dojox.wire.DataWire"]){B._hasResource["dojox.wire.DataWire"]=true;
B.provide("dojox.wire.DataWire");
B.require("dojox.wire.Wire");
B.declare("dojox.wire.DataWire",dojox.wire.Wire,{_wireClass:"dojox.wire.DataWire",constructor:function(A){if(!this.dataStore&&this.parent){this.dataStore=this.parent.dataStore
}},_getValue:function(H){if(!H||!this.attribute||!this.dataStore){return H
}var A=H;
var F=this.attribute.split(".");
for(var G in F){A=this._getAttributeValue(A,F[G]);
if(!A){return undefined
}}return A
},_setValue:function(L,A){if(!L||!this.attribute||!this.dataStore){return L
}var I=L;
var H=this.attribute.split(".");
var J=H.length-1;
for(var K=0;
K<J;
K++){I=this._getAttributeValue(I,H[K]);
if(!I){return undefined
}}this._setAttributeValue(I,H[J],A);
return L
},_getAttributeValue:function(J,K){var I=undefined;
var L=K.indexOf("[");
if(L>=0){var M=K.indexOf("]");
var N=K.substring(L+1,M);
K=K.substring(0,L);
var A=this.dataStore.getValues(J,K);
if(A){if(!N){I=A
}else{I=A[N]
}}}else{I=this.dataStore.getValue(J,K)
}return I
},_setAttributeValue:function(J,K,I){var L=K.indexOf("[");
if(L>=0){var M=K.indexOf("]");
var N=K.substring(L+1,M);
K=K.substring(0,L);
var A=null;
if(!N){A=I
}else{A=this.dataStore.getValues(J,K);
if(!A){A=[]
}A[N]=I
}this.dataStore.setValues(J,K,A)
}else{this.dataStore.setValue(J,K,I)
}}})
}}});