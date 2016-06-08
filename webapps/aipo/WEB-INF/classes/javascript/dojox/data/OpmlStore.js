if(!dojo._hasResource["dojox.data.OpmlStore"]){dojo._hasResource["dojox.data.OpmlStore"]=true;
dojo.provide("dojox.data.OpmlStore");
dojo.require("dojo.data.util.filter");
dojo.require("dojo.data.util.simpleFetch");
dojo.declare("dojox.data.OpmlStore",null,{constructor:function(B){this._xmlData=null;
this._arrayOfTopLevelItems=[];
this._arrayOfAllItems=[];
this._metadataNodes=null;
this._loadFinished=false;
this.url=B.url;
this._opmlData=B.data;
if(B.label){this.label=B.label
}this._loadInProgress=false;
this._queuedFetches=[];
this._identityMap={};
this._identCount=0;
this._idProp="_I"
},label:"text",url:"",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojo.data.OpmlStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(!dojo.isString(B)){throw new Error("dojox.data.OpmlStore: a function was passed an attribute argument that was not an attribute object nor an attribute name string")
}},_removeChildNodesThatAreNotElementNodes:function(I,L){var H=I.childNodes;
if(H.length===0){return 
}var G=[];
var J,K;
for(J=0;
J<H.length;
++J){K=H[J];
if(K.nodeType!=1){G.push(K)
}}for(J=0;
J<G.length;
++J){K=G[J];
I.removeChild(K)
}if(L){for(J=0;
J<H.length;
++J){K=H[J];
this._removeChildNodesThatAreNotElementNodes(K,L)
}}},_processRawXmlTree:function(J){this._loadFinished=true;
this._xmlData=J;
var K=J.getElementsByTagName("head");
var M=K[0];
if(M){this._removeChildNodesThatAreNotElementNodes(M);
this._metadataNodes=M.childNodes
}var L=J.getElementsByTagName("body");
var O=L[0];
if(O){this._removeChildNodesThatAreNotElementNodes(O,true);
var I=L[0].childNodes;
for(var P=0;
P<I.length;
++P){var N=I[P];
if(N.tagName=="outline"){this._identityMap[this._identCount]=N;
this._identCount++;
this._arrayOfTopLevelItems.push(N);
this._arrayOfAllItems.push(N);
this._checkChildNodes(N)
}}}},_checkChildNodes:function(F){if(F.firstChild){for(var D=0;
D<F.childNodes.length;
D++){var E=F.childNodes[D];
if(E.tagName=="outline"){this._identityMap[this._identCount]=E;
this._identCount++;
this._arrayOfAllItems.push(E);
this._checkChildNodes(E)
}}}},_getItemsArray:function(B){if(B&&B.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},getValue:function(G,H,E){this._assertIsItem(G);
this._assertIsAttribute(H);
if(H=="children"){return(G.firstChild||E)
}else{var F=G.getAttribute(H);
return(F!==undefined)?F:E
}},getValues:function(G,H){this._assertIsItem(G);
this._assertIsAttribute(H);
var F=[];
if(H=="children"){for(var E=0;
E<G.childNodes.length;
++E){F.push(G.childNodes[E])
}}else{if(G.getAttribute(H)!==null){F.push(G.getAttribute(H))
}}return F
},getAttributes:function(H){this._assertIsItem(H);
var G=[];
var K=H;
var I=K.attributes;
for(var L=0;
L<I.length;
++L){var J=I.item(L);
G.push(J.nodeName)
}if(K.childNodes.length>0){G.push("children")
}return G
},hasAttribute:function(D,C){return(this.getValues(D,C).length>0)
},containsValue:function(H,E,F){var G=undefined;
if(typeof F==="string"){G=dojo.data.util.filter.patternToRegExp(F,false)
}return this._containsValue(H,E,F,G)
},_containsValue:function(K,L,I,J){var H=this.getValues(K,L);
for(var M=0;
M<H.length;
++M){var N=H[M];
if(typeof N==="string"&&J){return(N.match(J)!==null)
}else{if(I===N){return true
}}}return false
},isItem:function(B){return(B&&B.nodeType==1&&B.tagName=="outline"&&B.ownerDocument===this._xmlData)
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getLabel:function(B){if(this.isItem(B)){return this.getValue(B,this.label)
}return undefined
},getLabelAttributes:function(B){return[this.label]
},_fetchItems:function(M,I,N){var H=this;
var L=function(G,D){var E=null;
if(G.query){E=[];
var F=G.queryOptions?G.queryOptions.ignoreCase:false;
var B={};
for(var A in G.query){var C=G.query[A];
if(typeof C==="string"){B[A]=dojo.data.util.filter.patternToRegExp(C,F)
}}for(var S=0;
S<D.length;
++S){var R=true;
var T=D[S];
for(var A in G.query){var C=G.query[A];
if(!H._containsValue(T,A,C,B[A])){R=false
}}if(R){E.push(T)
}}}else{if(D.length>0){E=D.slice(0,D.length)
}}I(E,G)
};
if(this._loadFinished){L(M,this._getItemsArray(M.queryOptions))
}else{if(this._loadInProgress){this._queuedFetches.push({args:M,filter:L})
}else{if(this.url!==""){this._loadInProgress=true;
var J={url:H.url,handleAs:"xml"};
var K=dojo.xhrGet(J);
K.addCallback(function(A){H._processRawXmlTree(A);
L(M,H._getItemsArray(M.queryOptions));
H._handleQueuedFetches()
});
K.addErrback(function(A){throw A
})
}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
L(M,this._getItemsArray(M.queryOptions))
}else{throw new Error("dojox.data.OpmlStore: No OPML source data was provided as either URL or XML data input.")
}}}}},getFeatures:function(){var B={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
return B
},getIdentity:function(D){if(this.isItem(D)){for(var C in this._identityMap){if(this._identityMap[C]===D){return C
}}}return null
},fetchItemByIdentity:function(L){if(!this._loadFinished){var G=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:L})
}else{this._loadInProgress=true;
var H={url:G.url,handleAs:"xml"};
var I=dojo.xhrGet(H);
I.addCallback(function(A){var C=L.scope?L.scope:dojo.global;
try{G._processRawXmlTree(A);
var B=G._identityMap[L.identity];
if(!G.isItem(B)){B=null
}if(L.onItem){L.onItem.call(C,B)
}G._handleQueuedFetches()
}catch(D){if(L.onError){L.onError.call(C,D)
}}});
I.addErrback(function(B){this._loadInProgress=false;
if(L.onError){var A=L.scope?L.scope:dojo.global;
L.onError.call(A,B)
}})
}}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
var J=this._identityMap[L.identity];
if(!G.isItem(J)){J=null
}if(L.onItem){var K=L.scope?L.scope:dojo.global;
L.onItem.call(K,J)
}}}}else{var J=this._identityMap[L.identity];
if(!this.isItem(J)){J=null
}if(L.onItem){var K=L.scope?L.scope:dojo.global;
L.onItem.call(K,J)
}}},getIdentityAttributes:function(B){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var G=0;
G<this._queuedFetches.length;
G++){var E=this._queuedFetches[G];
var H=E.args;
var F=E.filter;
if(F){F(H,this._getItemsArray(H.queryOptions))
}else{this.fetchItemByIdentity(H)
}}this._queuedFetches=[]
}},close:function(B){}});
dojo.extend(dojox.data.OpmlStore,dojo.data.util.simpleFetch)
};