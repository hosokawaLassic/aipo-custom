dojo._xdResourceLoaded({depends:[["provide","dojo.data.ItemFileWriteStore"],["require","dojo.data.ItemFileReadStore"]],defineResource:function(B){if(!B._hasResource["dojo.data.ItemFileWriteStore"]){B._hasResource["dojo.data.ItemFileWriteStore"]=true;
B.provide("dojo.data.ItemFileWriteStore");
B.require("dojo.data.ItemFileReadStore");
B.declare("dojo.data.ItemFileWriteStore",B.data.ItemFileReadStore,{constructor:function(A){this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap.Date.serialize){this._datatypeMap.Date.serialize=function(D){return B.date.stamp.toISOString(D,{zulu:true})
}
}this._saveInProgress=false
},_assert:function(A){if(!A){throw new Error("assertion failed in ItemFileWriteStore")
}},_getIdentifierAttribute:function(){var A=this.getFeatures()["dojo.data.api.Identity"];
return A
},newItem:function(N,M){this._assert(!this._saveInProgress);
if(!this._loadFinished){this._forceLoad()
}if(typeof N!="object"&&typeof N!="undefined"){throw new Error("newItem() was passed something other than an object")
}var S=null;
var L=this._getIdentifierAttribute();
if(L===Number){S=this._arrayOfAllItems.length
}else{S=N[L];
if(typeof S==="undefined"){throw new Error("newItem() was not passed an identity for the new item")
}if(B.isArray(S)){throw new Error("newItem() was not passed an single-valued identity")
}}if(this._itemsByIdentity){this._assert(typeof this._itemsByIdentity[S]==="undefined")
}this._assert(typeof this._pending._newItems[S]==="undefined");
this._assert(typeof this._pending._deletedItems[S]==="undefined");
var A={};
A[this._storeRefPropName]=this;
A[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){this._itemsByIdentity[S]=A
}this._arrayOfAllItems.push(A);
var Q=null;
if(M&&M.parent&&M.attribute){Q={item:M.parent,attribute:M.attribute,oldValue:undefined};
var O=this.getValues(M.parent,M.attribute);
if(O&&O.length>0){var T=O.slice(0,O.length);
if(O.length===1){Q.oldValue=O[0]
}else{Q.oldValue=O.slice(0,O.length)
}T.push(A);
this._setValueOrValues(M.parent,M.attribute,T,false);
Q.newValue=this.getValues(M.parent,M.attribute)
}else{this._setValueOrValues(M.parent,M.attribute,A,false);
Q.newValue=A
}}else{A[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(A)
}this._pending._newItems[S]=A;
for(var P in N){if(P===this._storeRefPropName||P===this._itemNumPropName){throw new Error("encountered bug in ItemFileWriteStore.newItem")
}var R=N[P];
if(!B.isArray(R)){R=[R]
}A[P]=R
}this.onNew(A,Q);
return A
},_removeArrayElement:function(A,E){var F=B.indexOf(A,E);
if(F!=-1){A.splice(F,1);
return true
}return false
},deleteItem:function(E){this._assert(!this._saveInProgress);
this._assertIsItem(E);
var A=E[this._itemNumPropName];
this._arrayOfAllItems[A]=null;
var F=this.getIdentity(E);
E[this._storeRefPropName]=null;
if(this._itemsByIdentity){delete this._itemsByIdentity[F]
}this._pending._deletedItems[F]=E;
if(E[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,E)
}this.onDelete(E);
return true
},setValue:function(E,F,A){return this._setValueOrValues(E,F,A,true)
},setValues:function(A,E,F){return this._setValueOrValues(A,E,F,true)
},unsetAttribute:function(A,D){return this._setValueOrValues(A,D,[],true)
},_setValueOrValues:function(V,A,b,f){this._assert(!this._saveInProgress);
this._assertIsItem(V);
this._assert(B.isString(A));
this._assert(typeof b!=="undefined");
var d=this._getIdentifierAttribute();
if(A==d){throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.")
}var e=this._getValueOrValues(V,A);
var a=this.getIdentity(V);
if(!this._pending._modifiedItems[a]){var T={};
for(var X in V){if((X===this._storeRefPropName)||(X===this._itemNumPropName)||(X===this._rootItemPropName)){T[X]=V[X]
}else{var Y=V[X];
var c=[];
for(var g=0;
g<Y.length;
++g){c.push(Y[g])
}T[X]=c
}}this._pending._modifiedItems[a]=T
}var W=false;
if(B.isArray(b)&&b.length===0){W=delete V[A];
b=undefined
}else{var Z=[];
if(B.isArray(b)){var U=b;
for(var h=0;
h<U.length;
++h){Z.push(U[h])
}}else{var S=b;
Z.push(S)
}V[A]=Z;
W=true
}if(f){this.onSet(V,A,e,b)
}return W
},_getValueOrValues:function(A,F){var H=undefined;
if(this.hasAttribute(A,F)){var G=this.getValues(A,F);
if(G.length==1){H=G[0]
}else{H=G
}}return H
},_flatten:function(G){if(this.isItem(G)){var H=G;
var J=this.getIdentity(H);
var I={_reference:J};
return I
}else{if(typeof G==="object"){for(type in this._datatypeMap){var A=this._datatypeMap[type];
if(B.isObject(A)&&!B.isFunction(A)){if(G instanceof A.type){if(!A.serialize){throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]")
}return{_type:type,_value:A.serialize(G)}
}}else{if(G instanceof A){return{_type:type,_value:G.toString()}
}}}}return G
}},_getNewFileContentString:function(){var N={};
var S=this._getIdentifierAttribute();
if(S!==Number){N.identifier=S
}if(this._labelAttr){N.label=this._labelAttr
}N.items=[];
for(var T=0;
T<this._arrayOfAllItems.length;
++T){var O=this._arrayOfAllItems[T];
if(O!==null){serializableItem={};
for(var P in O){if(P!==this._storeRefPropName&&P!==this._itemNumPropName){var M=P;
var Q=this.getValues(O,M);
if(Q.length==1){serializableItem[M]=this._flatten(Q[0])
}else{var R=[];
for(var A=0;
A<Q.length;
++A){R.push(this._flatten(Q[A]));
serializableItem[M]=R
}}}}N.items.push(serializableItem)
}}var L=true;
return B.toJson(N,L)
},save:function(I){this._assert(!this._saveInProgress);
this._saveInProgress=true;
var J=this;
var G=function(){J._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
J._saveInProgress=false;
if(I&&I.onComplete){var C=I.scope||B.global;
I.onComplete.call(C)
}};
var A=function(){J._saveInProgress=false;
if(I&&I.onError){var C=I.scope||B.global;
I.onError.call(C)
}};
if(this._saveEverything){var H=this._getNewFileContentString();
this._saveEverything(G,A,H)
}if(this._saveCustom){this._saveCustom(G,A)
}if(!this._saveEverything&&!this._saveCustom){G()
}},revert:function(){this._assert(!this._saveInProgress);
var L;
for(L in this._pending._newItems){var J=this._pending._newItems[L];
J[this._storeRefPropName]=null;
this._arrayOfAllItems[J[this._itemNumPropName]]=null;
if(J[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,J)
}if(this._itemsByIdentity){delete this._itemsByIdentity[L]
}}for(L in this._pending._modifiedItems){var A=this._pending._modifiedItems[L];
var I=null;
if(this._itemsByIdentity){I=this._itemsByIdentity[L]
}else{I=this._arrayOfAllItems[L]
}A[this._storeRefPropName]=this;
I[this._storeRefPropName]=null;
var M=I[this._itemNumPropName];
this._arrayOfAllItems[M]=A;
if(I[this._rootItemPropName]){M=I[this._itemNumPropName];
this._arrayOfTopLevelItems[M]=A
}if(this._itemsByIdentity){this._itemsByIdentity[L]=A
}}for(L in this._pending._deletedItems){var N=this._pending._deletedItems[L];
N[this._storeRefPropName]=this;
var K=N[this._itemNumPropName];
this._arrayOfAllItems[K]=N;
if(this._itemsByIdentity){this._itemsByIdentity[L]=N
}if(N[this._rootItemPropName]){this._arrayOfTopLevelItems.push(N)
}}this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true
},isDirty:function(A){if(A){var F=this.getIdentity(A);
return new Boolean(this._pending._newItems[F]||this._pending._modifiedItems[F]||this._pending._deletedItems[F])
}else{var E;
for(E in this._pending._newItems){return true
}for(E in this._pending._modifiedItems){return true
}for(E in this._pending._deletedItems){return true
}return false
}},onSet:function(F,G,H,A){},onNew:function(A,D){},onDelete:function(A){}})
}}});