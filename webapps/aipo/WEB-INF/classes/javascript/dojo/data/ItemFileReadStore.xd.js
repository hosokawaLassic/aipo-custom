dojo._xdResourceLoaded({depends:[["provide","dojo.data.ItemFileReadStore"],["require","dojo.data.util.filter"],["require","dojo.data.util.simpleFetch"],["require","dojo.date.stamp"]],defineResource:function(B){if(!B._hasResource["dojo.data.ItemFileReadStore"]){B._hasResource["dojo.data.ItemFileReadStore"]=true;
B.provide("dojo.data.ItemFileReadStore");
B.require("dojo.data.util.filter");
B.require("dojo.data.util.simpleFetch");
B.require("dojo.date.stamp");
B.declare("dojo.data.ItemFileReadStore",null,{constructor:function(A){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=A.url;
this._jsonData=A.data;
this._datatypeMap=A.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(D){return B.date.stamp.fromISOString(D)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(A,F,H){var G=this.getValues(A,F);
return(G.length>0)?G[0]:H
},getValues:function(A,D){this._assertIsItem(A);
this._assertIsAttribute(D);
return A[D]||[]
},getAttributes:function(A){this._assertIsItem(A);
var F=[];
for(var E in A){if((E!==this._storeRefPropName)&&(E!==this._itemNumPropName)&&(E!==this._rootItemPropName)){F.push(E)
}}return F
},hasAttribute:function(A,D){return this.getValues(A,D).length>0
},containsValue:function(G,H,A){var F=undefined;
if(typeof A==="string"){F=B.data.util.filter.patternToRegExp(A,false)
}return this._containsValue(G,H,A,F)
},_containsValue:function(G,H,A,F){return B.some(this.getValues(G,H),function(C){if(C!==null&&!B.isObject(C)&&F){if(C.toString().match(F)){return true
}}else{if(A===C){return true
}}})
},isItem:function(A){if(A&&A[this._storeRefPropName]===this){if(this._arrayOfAllItems[A[this._itemNumPropName]]===A){return true
}}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){this._assertIsItem(A.item)
},getFeatures:function(){return this._features
},getLabel:function(A){if(this._labelAttr&&this.isItem(A)){return this.getValue(A,this._labelAttr)
}return undefined
},getLabelAttributes:function(A){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(N,A,O){var P=this;
var M=function(U,G){var H=[];
if(U.query){var I=U.queryOptions?U.queryOptions.ignoreCase:false;
var E={};
for(var D in U.query){var F=U.query[D];
if(typeof F==="string"){E[D]=B.data.util.filter.patternToRegExp(F,I)
}}for(var W=0;
W<G.length;
++W){var V=true;
var X=G[W];
if(X===null){V=false
}else{for(var D in U.query){var F=U.query[D];
if(!P._containsValue(X,D,F,E[D])){V=false
}}}if(V){H.push(X)
}}A(H,U)
}else{for(var W=0;
W<G.length;
++W){var C=G[W];
if(C!==null){H.push(C)
}}A(H,U)
}};
if(this._loadFinished){M(N,this._getItemsArray(N.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:N,filter:M})
}else{this._loadInProgress=true;
var K={url:P._jsonFileUrl,handleAs:"json-comment-optional"};
var L=B.xhrGet(K);
L.addCallback(function(D){try{P._getItemsFromLoadedData(D);
P._loadFinished=true;
P._loadInProgress=false;
M(N,P._getItemsArray(N.queryOptions));
P._handleQueuedFetches()
}catch(C){P._loadFinished=true;
P._loadInProgress=false;
O(C,N)
}});
L.addErrback(function(C){P._loadInProgress=false;
O(C,N)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
M(N,this._getItemsArray(N.queryOptions))
}catch(J){O(J,N)
}}else{O(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),N)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var F=0;
F<this._queuedFetches.length;
F++){var H=this._queuedFetches[F];
var G=H.args;
var A=H.filter;
if(A){A(G,this._getItemsArray(G.queryOptions))
}else{this.fetchItemByIdentity(G)
}}this._queuedFetches=[]
}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(A){},_getItemsFromLoadedData:function(j){function m(D){var C=((D!=null)&&(typeof D=="object")&&(!B.isArray(D))&&(!B.isFunction(D))&&(D.constructor==Object)&&(typeof D._reference=="undefined")&&(typeof D._type=="undefined")&&(typeof D._value=="undefined"));
return C
}var e=this;
function W(E){e._arrayOfAllItems.push(E);
for(var F in E){var G=E[F];
if(G){if(B.isArray(G)){var H=G;
for(var C=0;
C<H.length;
++C){var D=H[C];
if(m(D)){W(D)
}}}else{if(m(G)){W(G)
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
if(d!==null){if(!B.isArray(d)){X[V]=[d]
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
var A=g[0];
if(!this._itemsByIdentity[A]){this._itemsByIdentity[A]=X
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+k+"].  Value collided: ["+A+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+k+"].  Value collided: ["+A+"]")
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
}else{if(B.isFunction(h)){g[a]=new h(d._value)
}else{if(B.isFunction(h.deserialize)){g[a]=h.deserialize(d._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(d._reference){var n=d._reference;
if(B.isString(n)){g[a]=this._itemsByIdentity[n]
}else{for(var b=0;
b<this._arrayOfAllItems.length;
++b){var l=this._arrayOfAllItems[b];
var f=true;
for(var Y in n){if(l[Y]!=n[Y]){f=false
}}if(f){g[a]=l
}}}}}}}}},getIdentity:function(E){var F=this._features["dojo.data.api.Identity"];
if(F===Number){return E[this._itemNumPropName]
}else{var A=E[F];
if(A){return A[0]
}}return null
},fetchItemByIdentity:function(K){if(!this._loadFinished){var L=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:K})
}else{this._loadInProgress=true;
var A={url:L._jsonFileUrl,handleAs:"json-comment-optional"};
var H=B.xhrGet(A);
H.addCallback(function(C){var E=K.scope?K.scope:B.global;
try{L._getItemsFromLoadedData(C);
L._loadFinished=true;
L._loadInProgress=false;
var D=L._getItemByIdentity(K.identity);
if(K.onItem){K.onItem.call(E,D)
}L._handleQueuedFetches()
}catch(F){L._loadInProgress=false;
if(K.onError){K.onError.call(E,F)
}}});
H.addErrback(function(D){L._loadInProgress=false;
if(K.onError){var C=K.scope?K.scope:B.global;
K.onError.call(C,D)
}})
}}else{if(this._jsonData){L._getItemsFromLoadedData(L._jsonData);
L._jsonData=null;
L._loadFinished=true;
var I=L._getItemByIdentity(K.identity);
if(K.onItem){var J=K.scope?K.scope:B.global;
K.onItem.call(J,I)
}}}}else{var I=this._getItemByIdentity(K.identity);
if(K.onItem){var J=K.scope?K.scope:B.global;
K.onItem.call(J,I)
}}},_getItemByIdentity:function(D){var A=null;
if(this._itemsByIdentity){A=this._itemsByIdentity[D]
}else{A=this._arrayOfAllItems[D]
}if(A===undefined){A=null
}return A
},getIdentityAttributes:function(A){var D=this._features["dojo.data.api.Identity"];
if(D===Number){return null
}else{return[D]
}},_forceLoad:function(){var F=this;
if(this._jsonFileUrl){var A={url:F._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var E=B.xhrGet(A);
E.addCallback(function(D){try{if(F._loadInProgress!==true&&!F._loadFinished){F._getItemsFromLoadedData(D);
F._loadFinished=true
}}catch(C){console.log(C);
throw C
}});
E.addErrback(function(C){throw C
})
}else{if(this._jsonData){F._getItemsFromLoadedData(F._jsonData);
F._jsonData=null;
F._loadFinished=true
}}}});
B.extend(B.data.ItemFileReadStore,B.data.util.simpleFetch)
}}});