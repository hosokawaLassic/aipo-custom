if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.require("dojo.data.util.filter");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.date.stamp");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(B){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=B.url;
this._jsonData=B.data;
this._datatypeMap=B.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(A){return dojo.date.stamp.fromISOString(A)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(F,G,E){var H=this.getValues(F,G);
return(H.length>0)?H[0]:E
},getValues:function(D,C){this._assertIsItem(D);
this._assertIsAttribute(C);
return D[C]||[]
},getAttributes:function(E){this._assertIsItem(E);
var D=[];
for(var F in E){if((F!==this._storeRefPropName)&&(F!==this._itemNumPropName)&&(F!==this._rootItemPropName)){D.push(F)
}}return D
},hasAttribute:function(D,C){return this.getValues(D,C).length>0
},containsValue:function(H,E,F){var G=undefined;
if(typeof F==="string"){G=dojo.data.util.filter.patternToRegExp(F,false)
}return this._containsValue(H,E,F,G)
},_containsValue:function(H,E,F,G){return dojo.some(this.getValues(H,E),function(A){if(A!==null&&!dojo.isObject(A)&&G){if(A.toString().match(G)){return true
}}else{if(F===A){return true
}}})
},isItem:function(B){if(B&&B[this._storeRefPropName]===this){if(this._arrayOfAllItems[B[this._itemNumPropName]]===B){return true
}}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){this._assertIsItem(B.item)
},getFeatures:function(){return this._features
},getLabel:function(B){if(this._labelAttr&&this.isItem(B)){return this.getValue(B,this._labelAttr)
}return undefined
},getLabelAttributes:function(B){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(O,J,P){var I=this;
var N=function(H,E){var F=[];
if(H.query){var G=H.queryOptions?H.queryOptions.ignoreCase:false;
var C={};
for(var B in H.query){var D=H.query[B];
if(typeof D==="string"){C[B]=dojo.data.util.filter.patternToRegExp(D,G)
}}for(var U=0;
U<E.length;
++U){var T=true;
var V=E[U];
if(V===null){T=false
}else{for(var B in H.query){var D=H.query[B];
if(!I._containsValue(V,B,D,C[B])){T=false
}}}if(T){F.push(V)
}}J(F,H)
}else{for(var U=0;
U<E.length;
++U){var A=E[U];
if(A!==null){F.push(A)
}}J(F,H)
}};
if(this._loadFinished){N(O,this._getItemsArray(O.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:O,filter:N})
}else{this._loadInProgress=true;
var L={url:I._jsonFileUrl,handleAs:"json-comment-optional"};
var M=dojo.xhrGet(L);
M.addCallback(function(B){try{I._getItemsFromLoadedData(B);
I._loadFinished=true;
I._loadInProgress=false;
N(O,I._getItemsArray(O.queryOptions));
I._handleQueuedFetches()
}catch(A){I._loadFinished=true;
I._loadInProgress=false;
P(A,O)
}});
M.addErrback(function(A){I._loadInProgress=false;
P(A,O)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
N(O,this._getItemsArray(O.queryOptions))
}catch(K){P(K,O)
}}else{P(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),O)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var G=0;
G<this._queuedFetches.length;
G++){var E=this._queuedFetches[G];
var H=E.args;
var F=E.filter;
if(F){F(H,this._getItemsArray(H.queryOptions))
}else{this.fetchItemByIdentity(H)
}}this._queuedFetches=[]
}},_getItemsArray:function(B){if(B&&B.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(B){},_getItemsFromLoadedData:function(j){function m(B){var A=((B!=null)&&(typeof B=="object")&&(!dojo.isArray(B))&&(!dojo.isFunction(B))&&(B.constructor==Object)&&(typeof B._reference=="undefined")&&(typeof B._type=="undefined")&&(typeof B._value=="undefined"));
return A
}var e=this;
function W(D){e._arrayOfAllItems.push(D);
for(var E in D){var F=D[E];
if(F){if(dojo.isArray(F)){var A=F;
for(var B=0;
B<A.length;
++B){var C=A[B];
if(m(C)){W(C)
}}}else{if(m(F)){W(F)
}}}}}this._labelAttr=j.label;
var Z;
var X;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=j.items;
for(Z=0;
Z<this._arrayOfTopLevelItems.length;
++Z){X=this._arrayOfTopLevelItems[Z];
W(X);
X[this._rootItemPropName]=true
}var c={};
var V;
for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
for(V in X){if(V!==this._rootItemPropName){var d=X[V];
if(d!==null){if(!dojo.isArray(d)){X[V]=[d]
}}else{X[V]=[null]
}}c[V]=V
}}while(c[this._storeRefPropName]){this._storeRefPropName+="_"
}while(c[this._itemNumPropName]){this._itemNumPropName+="_"
}var g;
var k=j.identifier;
if(k){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=k;
for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
g=X[k];
var U=g[0];
if(!this._itemsByIdentity[U]){this._itemsByIdentity[U]=X
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+k+"].  Value collided: ["+U+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+k+"].  Value collided: ["+U+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
X[this._storeRefPropName]=this;
X[this._itemNumPropName]=Z
}for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
for(V in X){g=X[V];
for(var a=0;
a<g.length;
++a){d=g[a];
if(d!==null&&typeof d=="object"){if(d._type&&d._value){var i=d._type;
var h=this._datatypeMap[i];
if(!h){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+i+"'")
}else{if(dojo.isFunction(h)){g[a]=new h(d._value)
}else{if(dojo.isFunction(h.deserialize)){g[a]=h.deserialize(d._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(d._reference){var n=d._reference;
if(dojo.isString(n)){g[a]=this._itemsByIdentity[n]
}else{for(var b=0;
b<this._arrayOfAllItems.length;
++b){var l=this._arrayOfAllItems[b];
var f=true;
for(var Y in n){if(l[Y]!=n[Y]){f=false
}}if(f){g[a]=l
}}}}}}}}},getIdentity:function(F){var D=this._features["dojo.data.api.Identity"];
if(D===Number){return F[this._itemNumPropName]
}else{var E=F[D];
if(E){return E[0]
}}return null
},fetchItemByIdentity:function(L){if(!this._loadFinished){var G=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:L})
}else{this._loadInProgress=true;
var H={url:G._jsonFileUrl,handleAs:"json-comment-optional"};
var I=dojo.xhrGet(H);
I.addCallback(function(A){var C=L.scope?L.scope:dojo.global;
try{G._getItemsFromLoadedData(A);
G._loadFinished=true;
G._loadInProgress=false;
var B=G._getItemByIdentity(L.identity);
if(L.onItem){L.onItem.call(C,B)
}G._handleQueuedFetches()
}catch(D){G._loadInProgress=false;
if(L.onError){L.onError.call(C,D)
}}});
I.addErrback(function(B){G._loadInProgress=false;
if(L.onError){var A=L.scope?L.scope:dojo.global;
L.onError.call(A,B)
}})
}}else{if(this._jsonData){G._getItemsFromLoadedData(G._jsonData);
G._jsonData=null;
G._loadFinished=true;
var J=G._getItemByIdentity(L.identity);
if(L.onItem){var K=L.scope?L.scope:dojo.global;
L.onItem.call(K,J)
}}}}else{var J=this._getItemByIdentity(L.identity);
if(L.onItem){var K=L.scope?L.scope:dojo.global;
L.onItem.call(K,J)
}}},_getItemByIdentity:function(C){var D=null;
if(this._itemsByIdentity){D=this._itemsByIdentity[C]
}else{D=this._arrayOfAllItems[C]
}if(D===undefined){D=null
}return D
},getIdentityAttributes:function(D){var C=this._features["dojo.data.api.Identity"];
if(C===Number){return null
}else{return[C]
}},_forceLoad:function(){var D=this;
if(this._jsonFileUrl){var E={url:D._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var F=dojo.xhrGet(E);
F.addCallback(function(B){try{if(D._loadInProgress!==true&&!D._loadFinished){D._getItemsFromLoadedData(B);
D._loadFinished=true
}}catch(A){console.log(A);
throw A
}});
F.addErrback(function(A){throw A
})
}else{if(this._jsonData){D._getItemsFromLoadedData(D._jsonData);
D._jsonData=null;
D._loadFinished=true
}}}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch)
};