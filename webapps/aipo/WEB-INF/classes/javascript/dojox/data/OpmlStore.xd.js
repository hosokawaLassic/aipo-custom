dojo._xdResourceLoaded({depends:[["provide","dojox.data.OpmlStore"],["require","dojo.data.util.filter"],["require","dojo.data.util.simpleFetch"]],defineResource:function(B){if(!B._hasResource["dojox.data.OpmlStore"]){B._hasResource["dojox.data.OpmlStore"]=true;
B.provide("dojox.data.OpmlStore");
B.require("dojo.data.util.filter");
B.require("dojo.data.util.simpleFetch");
B.declare("dojox.data.OpmlStore",null,{constructor:function(A){this._xmlData=null;
this._arrayOfTopLevelItems=[];
this._arrayOfAllItems=[];
this._metadataNodes=null;
this._loadFinished=false;
this.url=A.url;
this._opmlData=A.data;
if(A.label){this.label=A.label
}this._loadInProgress=false;
this._queuedFetches=[];
this._identityMap={};
this._identCount=0;
this._idProp="_I"
},label:"text",url:"",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojo.data.OpmlStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(!B.isString(A)){throw new Error("dojox.data.OpmlStore: a function was passed an attribute argument that was not an attribute object nor an attribute name string")
}},_removeChildNodesThatAreNotElementNodes:function(H,K){var A=H.childNodes;
if(A.length===0){return 
}var L=[];
var I,J;
for(I=0;
I<A.length;
++I){J=A[I];
if(J.nodeType!=1){L.push(J)
}}for(I=0;
I<L.length;
++I){J=L[I];
H.removeChild(J)
}if(K){for(I=0;
I<A.length;
++I){J=A[I];
this._removeChildNodesThatAreNotElementNodes(J,K)
}}},_processRawXmlTree:function(A){this._loadFinished=true;
this._xmlData=A;
var J=A.getElementsByTagName("head");
var L=J[0];
if(L){this._removeChildNodesThatAreNotElementNodes(L);
this._metadataNodes=L.childNodes
}var K=A.getElementsByTagName("body");
var N=K[0];
if(N){this._removeChildNodesThatAreNotElementNodes(N,true);
var P=K[0].childNodes;
for(var O=0;
O<P.length;
++O){var M=P[O];
if(M.tagName=="outline"){this._identityMap[this._identCount]=M;
this._identCount++;
this._arrayOfTopLevelItems.push(M);
this._arrayOfAllItems.push(M);
this._checkChildNodes(M)
}}}},_checkChildNodes:function(E){if(E.firstChild){for(var F=0;
F<E.childNodes.length;
F++){var A=E.childNodes[F];
if(A.tagName=="outline"){this._identityMap[this._identCount]=A;
this._identCount++;
this._arrayOfAllItems.push(A);
this._checkChildNodes(A)
}}}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},getValue:function(F,G,H){this._assertIsItem(F);
this._assertIsAttribute(G);
if(G=="children"){return(F.firstChild||H)
}else{var A=F.getAttribute(G);
return(A!==undefined)?A:H
}},getValues:function(F,G){this._assertIsItem(F);
this._assertIsAttribute(G);
var A=[];
if(G=="children"){for(var H=0;
H<F.childNodes.length;
++H){A.push(F.childNodes[H])
}}else{if(F.getAttribute(G)!==null){A.push(F.getAttribute(G))
}}return A
},getAttributes:function(A){this._assertIsItem(A);
var L=[];
var J=A;
var H=J.attributes;
for(var K=0;
K<H.length;
++K){var I=H.item(K);
L.push(I.nodeName)
}if(J.childNodes.length>0){L.push("children")
}return L
},hasAttribute:function(A,D){return(this.getValues(A,D).length>0)
},containsValue:function(G,H,A){var F=undefined;
if(typeof A==="string"){F=B.data.util.filter.patternToRegExp(A,false)
}return this._containsValue(G,H,A,F)
},_containsValue:function(J,K,A,I){var N=this.getValues(J,K);
for(var L=0;
L<N.length;
++L){var M=N[L];
if(typeof M==="string"&&I){return(M.match(I)!==null)
}else{if(A===M){return true
}}}return false
},isItem:function(A){return(A&&A.nodeType==1&&A.tagName=="outline"&&A.ownerDocument===this._xmlData)
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getLabel:function(A){if(this.isItem(A)){return this.getValue(A,this.label)
}return undefined
},getLabelAttributes:function(A){return[this.label]
},_fetchItems:function(L,A,M){var N=this;
var K=function(S,F){var G=null;
if(S.query){G=[];
var H=S.queryOptions?S.queryOptions.ignoreCase:false;
var D={};
for(var C in S.query){var E=S.query[C];
if(typeof E==="string"){D[C]=B.data.util.filter.patternToRegExp(E,H)
}}for(var U=0;
U<F.length;
++U){var T=true;
var V=F[U];
for(var C in S.query){var E=S.query[C];
if(!N._containsValue(V,C,E,D[C])){T=false
}}if(T){G.push(V)
}}}else{if(F.length>0){G=F.slice(0,F.length)
}}A(G,S)
};
if(this._loadFinished){K(L,this._getItemsArray(L.queryOptions))
}else{if(this._loadInProgress){this._queuedFetches.push({args:L,filter:K})
}else{if(this.url!==""){this._loadInProgress=true;
var I={url:N.url,handleAs:"xml"};
var J=B.xhrGet(I);
J.addCallback(function(C){N._processRawXmlTree(C);
K(L,N._getItemsArray(L.queryOptions));
N._handleQueuedFetches()
});
J.addErrback(function(C){throw C
})
}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
K(L,this._getItemsArray(L.queryOptions))
}else{throw new Error("dojox.data.OpmlStore: No OPML source data was provided as either URL or XML data input.")
}}}}},getFeatures:function(){var A={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
return A
},getIdentity:function(A){if(this.isItem(A)){for(var D in this._identityMap){if(this._identityMap[D]===A){return D
}}}return null
},fetchItemByIdentity:function(K){if(!this._loadFinished){var L=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:K})
}else{this._loadInProgress=true;
var A={url:L.url,handleAs:"xml"};
var H=B.xhrGet(A);
H.addCallback(function(C){var E=K.scope?K.scope:B.global;
try{L._processRawXmlTree(C);
var D=L._identityMap[K.identity];
if(!L.isItem(D)){D=null
}if(K.onItem){K.onItem.call(E,D)
}L._handleQueuedFetches()
}catch(F){if(K.onError){K.onError.call(E,F)
}}});
H.addErrback(function(D){this._loadInProgress=false;
if(K.onError){var C=K.scope?K.scope:B.global;
K.onError.call(C,D)
}})
}}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
var I=this._identityMap[K.identity];
if(!L.isItem(I)){I=null
}if(K.onItem){var J=K.scope?K.scope:B.global;
K.onItem.call(J,I)
}}}}else{var I=this._identityMap[K.identity];
if(!this.isItem(I)){I=null
}if(K.onItem){var J=K.scope?K.scope:B.global;
K.onItem.call(J,I)
}}},getIdentityAttributes:function(A){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var F=0;
F<this._queuedFetches.length;
F++){var H=this._queuedFetches[F];
var G=H.args;
var A=H.filter;
if(A){A(G,this._getItemsArray(G.queryOptions))
}else{this.fetchItemByIdentity(G)
}}this._queuedFetches=[]
}},close:function(A){}});
B.extend(dojox.data.OpmlStore,B.data.util.simpleFetch)
}}});