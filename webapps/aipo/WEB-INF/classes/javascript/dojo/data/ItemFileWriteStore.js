if(!dojo._hasResource["dojo.data.ItemFileWriteStore"]){dojo._hasResource["dojo.data.ItemFileWriteStore"]=true;
dojo.provide("dojo.data.ItemFileWriteStore");
dojo.require("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileWriteStore",dojo.data.ItemFileReadStore,{constructor:function(B){this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap.Date.serialize){this._datatypeMap.Date.serialize=function(A){return dojo.date.stamp.toISOString(A,{zulu:true})
}
}this._saveInProgress=false
},_assert:function(B){if(!B){throw new Error("assertion failed in ItemFileWriteStore")
}},_getIdentifierAttribute:function(){var B=this.getFeatures()["dojo.data.api.Identity"];
return B
},newItem:function(O,N){this._assert(!this._saveInProgress);
if(!this._loadFinished){this._forceLoad()
}if(typeof O!="object"&&typeof O!="undefined"){throw new Error("newItem() was passed something other than an object")
}var T=null;
var M=this._getIdentifierAttribute();
if(M===Number){T=this._arrayOfAllItems.length
}else{T=O[M];
if(typeof T==="undefined"){throw new Error("newItem() was not passed an identity for the new item")
}if(dojo.isArray(T)){throw new Error("newItem() was not passed an single-valued identity")
}}if(this._itemsByIdentity){this._assert(typeof this._itemsByIdentity[T]==="undefined")
}this._assert(typeof this._pending._newItems[T]==="undefined");
this._assert(typeof this._pending._deletedItems[T]==="undefined");
var L={};
L[this._storeRefPropName]=this;
L[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){this._itemsByIdentity[T]=L
}this._arrayOfAllItems.push(L);
var R=null;
if(N&&N.parent&&N.attribute){R={item:N.parent,attribute:N.attribute,oldValue:undefined};
var P=this.getValues(N.parent,N.attribute);
if(P&&P.length>0){var K=P.slice(0,P.length);
if(P.length===1){R.oldValue=P[0]
}else{R.oldValue=P.slice(0,P.length)
}K.push(L);
this._setValueOrValues(N.parent,N.attribute,K,false);
R.newValue=this.getValues(N.parent,N.attribute)
}else{this._setValueOrValues(N.parent,N.attribute,L,false);
R.newValue=L
}}else{L[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(L)
}this._pending._newItems[T]=L;
for(var Q in O){if(Q===this._storeRefPropName||Q===this._itemNumPropName){throw new Error("encountered bug in ItemFileWriteStore.newItem")
}var S=O[Q];
if(!dojo.isArray(S)){S=[S]
}L[Q]=S
}this.onNew(L,R);
return L
},_removeArrayElement:function(E,F){var D=dojo.indexOf(E,F);
if(D!=-1){E.splice(D,1);
return true
}return false
},deleteItem:function(F){this._assert(!this._saveInProgress);
this._assertIsItem(F);
var E=F[this._itemNumPropName];
this._arrayOfAllItems[E]=null;
var D=this.getIdentity(F);
F[this._storeRefPropName]=null;
if(this._itemsByIdentity){delete this._itemsByIdentity[D]
}this._pending._deletedItems[D]=F;
if(F[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,F)
}this.onDelete(F);
return true
},setValue:function(F,D,E){return this._setValueOrValues(F,D,E,true)
},setValues:function(E,F,D){return this._setValueOrValues(E,F,D,true)
},unsetAttribute:function(D,C){return this._setValueOrValues(D,C,[],true)
},_setValueOrValues:function(W,S,c,g){this._assert(!this._saveInProgress);
this._assertIsItem(W);
this._assert(dojo.isString(S));
this._assert(typeof c!=="undefined");
var e=this._getIdentifierAttribute();
if(S==e){throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.")
}var f=this._getValueOrValues(W,S);
var b=this.getIdentity(W);
if(!this._pending._modifiedItems[b]){var U={};
for(var Y in W){if((Y===this._storeRefPropName)||(Y===this._itemNumPropName)||(Y===this._rootItemPropName)){U[Y]=W[Y]
}else{var Z=W[Y];
var d=[];
for(var h=0;
h<Z.length;
++h){d.push(Z[h])
}U[Y]=d
}}this._pending._modifiedItems[b]=U
}var X=false;
if(dojo.isArray(c)&&c.length===0){X=delete W[S];
c=undefined
}else{var a=[];
if(dojo.isArray(c)){var V=c;
for(var R=0;
R<V.length;
++R){a.push(V[R])
}}else{var T=c;
a.push(T)
}W[S]=a;
X=true
}if(g){this.onSet(W,S,f,c)
}return X
},_getValueOrValues:function(F,G){var E=undefined;
if(this.hasAttribute(F,G)){var H=this.getValues(F,G);
if(H.length==1){E=H[0]
}else{E=H
}}return E
},_flatten:function(H){if(this.isItem(H)){var I=H;
var F=this.getIdentity(I);
var J={_reference:F};
return J
}else{if(typeof H==="object"){for(type in this._datatypeMap){var G=this._datatypeMap[type];
if(dojo.isObject(G)&&!dojo.isFunction(G)){if(H instanceof G.type){if(!G.serialize){throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]")
}return{_type:type,_value:G.serialize(H)}
}}else{if(H instanceof G){return{_type:type,_value:H.toString()}
}}}}return H
}},_getNewFileContentString:function(){var O={};
var T=this._getIdentifierAttribute();
if(T!==Number){O.identifier=T
}if(this._labelAttr){O.label=this._labelAttr
}O.items=[];
for(var K=0;
K<this._arrayOfAllItems.length;
++K){var P=this._arrayOfAllItems[K];
if(P!==null){serializableItem={};
for(var Q in P){if(Q!==this._storeRefPropName&&Q!==this._itemNumPropName){var N=Q;
var R=this.getValues(P,N);
if(R.length==1){serializableItem[N]=this._flatten(R[0])
}else{var S=[];
for(var L=0;
L<R.length;
++L){S.push(this._flatten(R[L]));
serializableItem[N]=S
}}}}O.items.push(serializableItem)
}}var M=true;
return dojo.toJson(O,M)
},save:function(J){this._assert(!this._saveInProgress);
this._saveInProgress=true;
var F=this;
var H=function(){F._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
F._saveInProgress=false;
if(J&&J.onComplete){var A=J.scope||dojo.global;
J.onComplete.call(A)
}};
var G=function(){F._saveInProgress=false;
if(J&&J.onError){var A=J.scope||dojo.global;
J.onError.call(A)
}};
if(this._saveEverything){var I=this._getNewFileContentString();
this._saveEverything(H,G,I)
}if(this._saveCustom){this._saveCustom(H,G)
}if(!this._saveEverything&&!this._saveCustom){H()
}},revert:function(){this._assert(!this._saveInProgress);
var M;
for(M in this._pending._newItems){var K=this._pending._newItems[M];
K[this._storeRefPropName]=null;
this._arrayOfAllItems[K[this._itemNumPropName]]=null;
if(K[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,K)
}if(this._itemsByIdentity){delete this._itemsByIdentity[M]
}}for(M in this._pending._modifiedItems){var I=this._pending._modifiedItems[M];
var J=null;
if(this._itemsByIdentity){J=this._itemsByIdentity[M]
}else{J=this._arrayOfAllItems[M]
}I[this._storeRefPropName]=this;
J[this._storeRefPropName]=null;
var N=J[this._itemNumPropName];
this._arrayOfAllItems[N]=I;
if(J[this._rootItemPropName]){N=J[this._itemNumPropName];
this._arrayOfTopLevelItems[N]=I
}if(this._itemsByIdentity){this._itemsByIdentity[M]=I
}}for(M in this._pending._deletedItems){var H=this._pending._deletedItems[M];
H[this._storeRefPropName]=this;
var L=H[this._itemNumPropName];
this._arrayOfAllItems[L]=H;
if(this._itemsByIdentity){this._itemsByIdentity[M]=H
}if(H[this._rootItemPropName]){this._arrayOfTopLevelItems.push(H)
}}this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true
},isDirty:function(E){if(E){var D=this.getIdentity(E);
return new Boolean(this._pending._newItems[D]||this._pending._modifiedItems[D]||this._pending._deletedItems[D])
}else{var F;
for(F in this._pending._newItems){return true
}for(F in this._pending._modifiedItems){return true
}for(F in this._pending._deletedItems){return true
}return false
}},onSet:function(G,H,E,F){},onNew:function(D,C){},onDelete:function(B){}})
};