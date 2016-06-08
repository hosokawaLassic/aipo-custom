if(!dojo._hasResource["dojox.data.HtmlTableStore"]){dojo._hasResource["dojox.data.HtmlTableStore"]=true;
dojo.provide("dojox.data.HtmlTableStore");
dojo.require("dojox.data.dom");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.data.util.filter");
dojo.declare("dojox.data.HtmlTableStore",null,{constructor:function(C){if(C.url){if(!C.tableId){throw new Error("dojo.data.HtmlTableStore: Cannot instantiate using url without an id!")
}this.url=C.url;
this.tableId=C.tableId
}else{if(C.tableId){this._rootNode=dojo.byId(C.tableId);
this.tableId=this._rootNode.id
}else{this._rootNode=dojo.byId(this.tableId)
}this._getHeadings();
for(var D=0;
D<this._rootNode.rows.length;
D++){this._rootNode.rows[D].store=this
}}},url:"",tableId:"",_getHeadings:function(){this._headings=[];
dojo.forEach(this._rootNode.tHead.rows[0].cells,dojo.hitch(this,function(B){this._headings.push(dojox.data.dom.textContent(B))
}))
},_getAllItems:function(){var C=[];
for(var D=1;
D<this._rootNode.rows.length;
D++){C.push(this._rootNode.rows[D])
}return C
},_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojo.data.HtmlTableStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojo.data.HtmlTableStore: a function was passed an attribute argument that was not an attribute name string");
return 
}return dojo.indexOf(this._headings,B)
},getValue:function(F,G,E){var H=this.getValues(F,G);
return(H.length>0)?H[0]:E
},getValues:function(E,F){this._assertIsItem(E);
var D=this._assertIsAttribute(F);
if(D>-1){return[dojox.data.dom.textContent(E.cells[D])]
}return[]
},getAttributes:function(E){this._assertIsItem(E);
var D=[];
for(var F=0;
F<this._headings.length;
F++){if(this.hasAttribute(E,this._headings[F])){D.push(this._headings[F])
}}return D
},hasAttribute:function(D,C){return this.getValues(D,C).length>0
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
},isItem:function(B){if(B&&B.store&&B.store===this){return true
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){this._assertIsItem(B.item)
},_fetchItems:function(K,I,N){if(this._rootNode){this._finishFetchItems(K,I,N)
}else{if(!this.url){this._rootNode=dojo.byId(this.tableId);
this._getHeadings();
for(var M=0;
M<this._rootNode.rows.length;
M++){this._rootNode.rows[M].store=this
}}else{var J={url:this.url,handleAs:"text"};
var H=this;
var L=dojo.xhrGet(J);
L.addCallback(function(B){var C=function(G,F){if(G.id==F){return G
}if(G.childNodes){for(var P=0;
P<G.childNodes.length;
P++){var E=C(G.childNodes[P],F);
if(E){return E
}}}return null
};
var A=document.createElement("div");
A.innerHTML=B;
H._rootNode=C(A,H.tableId);
H._getHeadings.call(H);
for(var D=0;
D<H._rootNode.rows.length;
D++){H._rootNode.rows[D].store=H
}H._finishFetchItems(K,I,N)
});
L.addErrback(function(A){N(A,K)
})
}}},_finishFetchItems:function(N,O,W){var U=null;
var T=this._getAllItems();
if(N.query){var V=N.queryOptions?N.queryOptions.ignoreCase:false;
U=[];
var R={};
for(var Q in N.query){var S=N.query[Q]+"";
if(typeof S==="string"){R[Q]=dojo.data.util.filter.patternToRegExp(S,V)
}}for(var M=0;
M<T.length;
++M){var X=true;
var P=T[M];
for(var Q in N.query){var S=N.query[Q]+"";
if(!this._containsValue(P,Q,S,R[Q])){X=false
}}if(X){U.push(P)
}}O(U,N)
}else{if(T.length>0){U=T.slice(0,T.length)
}O(U,N)
}},getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Identity":true}
},close:function(B){},getLabel:function(B){if(this.isItem(B)){return"Table Row #"+this.getIdentity(B)
}return undefined
},getLabelAttributes:function(B){return null
},getIdentity:function(B){this._assertIsItem(B);
if(!dojo.isOpera){return B.sectionRowIndex
}else{return(dojo.indexOf(this._rootNode.rows,B)-1)
}},getIdentityAttributes:function(B){return null
},fetchItemByIdentity:function(O){var P=O.identity;
var I=this;
var K=null;
if(!this._rootNode){if(!this.url){this._rootNode=dojo.byId(this.tableId);
this._getHeadings();
for(var N=0;
N<this._rootNode.rows.length;
N++){this._rootNode.rows[N].store=this
}K=this._rootNode.rows[P+1];
if(O.onItem){var M=O.scope?O.scope:dojo.global;
O.onItem.call(M,K)
}}else{var J={url:this.url,handleAs:"text"};
var I=this;
var L=dojo.xhrGet(J);
L.addCallback(function(A){var B=function(G,F){if(G.id==F){return G
}if(G.childNodes){for(var H=0;
H<G.childNodes.length;
H++){var R=B(G.childNodes[H],F);
if(R){return R
}}}return null
};
var E=document.createElement("div");
E.innerHTML=A;
I._rootNode=B(E,I.tableId);
I._getHeadings.call(I);
for(var D=0;
D<I._rootNode.rows.length;
D++){I._rootNode.rows[D].store=I
}K=I._rootNode.rows[P+1];
if(O.onItem){var C=O.scope?O.scope:dojo.global;
O.onItem.call(C,K)
}});
L.addErrback(function(B){if(O.onError){var A=O.scope?O.scope:dojo.global;
O.onError.call(A,B)
}})
}}else{if(this._rootNode.rows[P+1]){K=this._rootNode.rows[P+1];
if(O.onItem){var M=O.scope?O.scope:dojo.global;
O.onItem.call(M,K)
}}}}});
dojo.extend(dojox.data.HtmlTableStore,dojo.data.util.simpleFetch)
};