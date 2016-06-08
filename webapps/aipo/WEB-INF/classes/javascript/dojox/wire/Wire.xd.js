dojo._xdResourceLoaded({depends:[["provide","dojox.wire.Wire"],["require","dojox.wire._base"]],defineResource:function(B){if(!B._hasResource["dojox.wire.Wire"]){B._hasResource["dojox.wire.Wire"]=true;
B.provide("dojox.wire.Wire");
B.require("dojox.wire._base");
B.declare("dojox.wire.Wire",null,{_wireClass:"dojox.wire.Wire",constructor:function(I){B.mixin(this,I);
if(this.converter){if(B.isString(this.converter)){var G=B.getObject(this.converter);
if(B.isFunction(G)){try{var J=new G();
if(J&&!B.isFunction(J.convert)){this.converter={convert:G}
}else{this.converter=J
}}catch(H){}}else{if(B.isObject(G)){if(B.isFunction(G.convert)){this.converter=G
}}}if(B.isString(this.converter)){var A=dojox.wire._getClass(this.converter);
if(A){this.converter=new A()
}else{this.converter=undefined
}}}else{if(B.isFunction(this.converter)){this.converter={convert:this.converter}
}}}},getValue:function(J){var I=undefined;
if(dojox.wire.isWire(this.object)){I=this.object.getValue(J)
}else{I=(this.object||J)
}if(this.property){var A=this.property.split(".");
for(var H in A){if(!I){return I
}I=this._getPropertyValue(I,A[H])
}}var G=undefined;
if(this._getValue){G=this._getValue(I)
}else{G=I
}if(G){if(this.type){if(this.type=="string"){G=G.toString()
}else{if(this.type=="number"){G=parseInt(G)
}else{if(this.type=="boolean"){G=(G!="false")
}else{if(this.type=="array"){if(!B.isArray(G)){G=[G]
}}}}}}if(this.converter&&this.converter.convert){G=this.converter.convert(G,this)
}}return G
},setValue:function(P,R){var A=undefined;
if(dojox.wire.isWire(this.object)){A=this.object.getValue(R)
}else{A=(this.object||R)
}var O=undefined;
if(this.property){if(!A){if(dojox.wire.isWire(this.object)){A={};
this.object.setValue(A,R)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}var Q=this.property.split(".");
var N=Q.length-1;
for(var T=0;
T<N;
T++){var M=Q[T];
var L=this._getPropertyValue(A,M);
if(!L){L={};
this._setPropertyValue(A,M,L)
}A=L
}O=Q[N]
}if(this._setValue){if(O){var L=this._getPropertyValue(A,O);
if(!L){L={};
this._setPropertyValue(A,O,L)
}A=L
}var S=this._setValue(A,P);
if(!A&&S){if(dojox.wire.isWire(this.object)){this.object.setValue(S,R)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}}else{if(O){this._setPropertyValue(A,O,P)
}else{if(dojox.wire.isWire(this.object)){this.object.setValue(P,R)
}else{throw new Error(this._wireClass+".setValue(): invalid property")
}}}},_getPropertyValue:function(N,J){var K=undefined;
var L=J.indexOf("[");
if(L>=0){var M=J.indexOf("]");
var O=J.substring(L+1,M);
var A=null;
if(L===0){A=N
}else{J=J.substring(0,L);
A=this._getPropertyValue(N,J);
if(A&&!B.isArray(A)){A=[A]
}}if(A){K=A[O]
}}else{if(N.getPropertyValue){K=N.getPropertyValue(J)
}else{var P="get"+J.charAt(0).toUpperCase()+J.substring(1);
if(N[P]){K=N[P]()
}else{K=N[J]
}}}return K
},_setPropertyValue:function(O,K,L){var M=K.indexOf("[");
if(M>=0){var N=K.indexOf("]");
var P=K.substring(M+1,N);
var A=null;
if(M===0){A=O
}else{K=K.substring(0,M);
A=this._getPropertyValue(O,K);
if(!A){A=[];
this._setPropertyValue(O,K,A)
}}A[P]=L
}else{if(O.setPropertyValue){O.setPropertyValue(K,L)
}else{var J="set"+K.charAt(0).toUpperCase()+K.substring(1);
if(O[J]){O[J](L)
}else{O[K]=L
}}}}})
}}});