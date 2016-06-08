if(!dojo._hasResource["dojox.wire.Wire"]){dojo._hasResource["dojox.wire.Wire"]=true;
dojo.provide("dojox.wire.Wire");
dojo.require("dojox.wire._base");
dojo.declare("dojox.wire.Wire",null,{_wireClass:"dojox.wire.Wire",constructor:function(J){dojo.mixin(this,J);
if(this.converter){if(dojo.isString(this.converter)){var H=dojo.getObject(this.converter);
if(dojo.isFunction(H)){try{var F=new H();
if(F&&!dojo.isFunction(F.convert)){this.converter={convert:H}
}else{this.converter=F
}}catch(I){}}else{if(dojo.isObject(H)){if(dojo.isFunction(H.convert)){this.converter=H
}}}if(dojo.isString(this.converter)){var G=dojox.wire._getClass(this.converter);
if(G){this.converter=new G()
}else{this.converter=undefined
}}}else{if(dojo.isFunction(this.converter)){this.converter={convert:this.converter}
}}}},getValue:function(F){var J=undefined;
if(dojox.wire.isWire(this.object)){J=this.object.getValue(F)
}else{J=(this.object||F)
}if(this.property){var G=this.property.split(".");
for(var I in G){if(!J){return J
}J=this._getPropertyValue(J,G[I])
}}var H=undefined;
if(this._getValue){H=this._getValue(J)
}else{H=J
}if(H){if(this.type){if(this.type=="string"){H=H.toString()
}else{if(this.type=="number"){H=parseInt(H)
}else{if(this.type=="boolean"){H=(H!="false")
}else{if(this.type=="array"){if(!dojo.isArray(H)){H=[H]
}}}}}}if(this.converter&&this.converter.convert){H=this.converter.convert(H,this)
}}return H
},setValue:function(Q,S){var L=undefined;
if(dojox.wire.isWire(this.object)){L=this.object.getValue(S)
}else{L=(this.object||S)
}var P=undefined;
if(this.property){if(!L){if(dojox.wire.isWire(this.object)){L={};
this.object.setValue(L,S)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}var R=this.property.split(".");
var O=R.length-1;
for(var K=0;
K<O;
K++){var N=R[K];
var M=this._getPropertyValue(L,N);
if(!M){M={};
this._setPropertyValue(L,N,M)
}L=M
}P=R[O]
}if(this._setValue){if(P){var M=this._getPropertyValue(L,P);
if(!M){M={};
this._setPropertyValue(L,P,M)
}L=M
}var T=this._setValue(L,Q);
if(!L&&T){if(dojox.wire.isWire(this.object)){this.object.setValue(T,S)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}}else{if(P){this._setPropertyValue(L,P,Q)
}else{if(dojox.wire.isWire(this.object)){this.object.setValue(Q,S)
}else{throw new Error(this._wireClass+".setValue(): invalid property")
}}}},_getPropertyValue:function(O,K){var L=undefined;
var M=K.indexOf("[");
if(M>=0){var N=K.indexOf("]");
var P=K.substring(M+1,N);
var J=null;
if(M===0){J=O
}else{K=K.substring(0,M);
J=this._getPropertyValue(O,K);
if(J&&!dojo.isArray(J)){J=[J]
}}if(J){L=J[P]
}}else{if(O.getPropertyValue){L=O.getPropertyValue(K)
}else{var I="get"+K.charAt(0).toUpperCase()+K.substring(1);
if(O[I]){L=O[I]()
}else{L=O[K]
}}}return L
},_setPropertyValue:function(P,L,M){var N=L.indexOf("[");
if(N>=0){var O=L.indexOf("]");
var I=L.substring(N+1,O);
var J=null;
if(N===0){J=P
}else{L=L.substring(0,N);
J=this._getPropertyValue(P,L);
if(!J){J=[];
this._setPropertyValue(P,L,J)
}}J[I]=M
}else{if(P.setPropertyValue){P.setPropertyValue(L,M)
}else{var K="set"+L.charAt(0).toUpperCase()+L.substring(1);
if(P[K]){P[K](M)
}else{P[L]=M
}}}}})
};