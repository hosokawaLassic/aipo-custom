dojo._xdResourceLoaded({depends:[["provide","dojox.data.HtmlTableStore"],["require","dojox.data.dom"],["require","dojo.data.util.simpleFetch"],["require","dojo.data.util.filter"]],defineResource:function(B){if(!B._hasResource["dojox.data.HtmlTableStore"]){B._hasResource["dojox.data.HtmlTableStore"]=true;
B.provide("dojox.data.HtmlTableStore");
B.require("dojox.data.dom");
B.require("dojo.data.util.simpleFetch");
B.require("dojo.data.util.filter");
B.declare("dojox.data.HtmlTableStore",null,{constructor:function(D){if(D.url){if(!D.tableId){throw new Error("dojo.data.HtmlTableStore: Cannot instantiate using url without an id!")
}this.url=D.url;
this.tableId=D.tableId
}else{if(D.tableId){this._rootNode=B.byId(D.tableId);
this.tableId=this._rootNode.id
}else{this._rootNode=B.byId(this.tableId)
}this._getHeadings();
for(var A=0;
A<this._rootNode.rows.length;
A++){this._rootNode.rows[A].store=this
}}},url:"",tableId:"",_getHeadings:function(){this._headings=[];
B.forEach(this._rootNode.tHead.rows[0].cells,B.hitch(this,function(A){this._headings.push(dojox.data.dom.textContent(A))
}))
},_getAllItems:function(){var D=[];
for(var A=1;
A<this._rootNode.rows.length;
A++){D.push(this._rootNode.rows[A])
}return D
},_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojo.data.HtmlTableStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojo.data.HtmlTableStore: a function was passed an attribute argument that was not an attribute name string");
return 
}return B.indexOf(this._headings,A)
},getValue:function(A,F,H){var G=this.getValues(A,F);
return(G.length>0)?G[0]:H
},getValues:function(A,E){this._assertIsItem(A);
var F=this._assertIsAttribute(E);
if(F>-1){return[dojox.data.dom.textContent(A.cells[F])]
}return[]
},getAttributes:function(A){this._assertIsItem(A);
var F=[];
for(var E=0;
E<this._headings.length;
E++){if(this.hasAttribute(A,this._headings[E])){F.push(this._headings[E])
}}return F
},hasAttribute:function(A,D){return this.getValues(A,D).length>0
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
},isItem:function(A){if(A&&A.store&&A.store===this){return true
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){this._assertIsItem(A.item)
},_fetchItems:function(J,A,M){if(this._rootNode){this._finishFetchItems(J,A,M)
}else{if(!this.url){this._rootNode=B.byId(this.tableId);
this._getHeadings();
for(var L=0;
L<this._rootNode.rows.length;
L++){this._rootNode.rows[L].store=this
}}else{var I={url:this.url,handleAs:"text"};
var N=this;
var K=B.xhrGet(I);
K.addCallback(function(D){var E=function(H,G){if(H.id==G){return H
}if(H.childNodes){for(var Q=0;
Q<H.childNodes.length;
Q++){var R=E(H.childNodes[Q],G);
if(R){return R
}}}return null
};
var C=document.createElement("div");
C.innerHTML=D;
N._rootNode=E(C,N.tableId);
N._getHeadings.call(N);
for(var F=0;
F<N._rootNode.rows.length;
F++){N._rootNode.rows[F].store=N
}N._finishFetchItems(J,A,M)
});
K.addErrback(function(C){M(C,J)
})
}}},_finishFetchItems:function(A,N,V){var T=null;
var S=this._getAllItems();
if(A.query){var U=A.queryOptions?A.queryOptions.ignoreCase:false;
T=[];
var Q={};
for(var P in A.query){var R=A.query[P]+"";
if(typeof R==="string"){Q[P]=B.data.util.filter.patternToRegExp(R,U)
}}for(var X=0;
X<S.length;
++X){var W=true;
var O=S[X];
for(var P in A.query){var R=A.query[P]+"";
if(!this._containsValue(O,P,R,Q[P])){W=false
}}if(W){T.push(O)
}}N(T,A)
}else{if(S.length>0){T=S.slice(0,S.length)
}N(T,A)
}},getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Identity":true}
},close:function(A){},getLabel:function(A){if(this.isItem(A)){return"Table Row #"+this.getIdentity(A)
}return undefined
},getLabelAttributes:function(A){return null
},getIdentity:function(A){this._assertIsItem(A);
if(!B.isOpera){return A.sectionRowIndex
}else{return(B.indexOf(this._rootNode.rows,A)-1)
}},getIdentityAttributes:function(A){return null
},fetchItemByIdentity:function(N){var O=N.identity;
var P=this;
var J=null;
if(!this._rootNode){if(!this.url){this._rootNode=B.byId(this.tableId);
this._getHeadings();
for(var M=0;
M<this._rootNode.rows.length;
M++){this._rootNode.rows[M].store=this
}J=this._rootNode.rows[O+1];
if(N.onItem){var L=N.scope?N.scope:B.global;
N.onItem.call(L,J)
}}else{var A={url:this.url,handleAs:"text"};
var P=this;
var K=B.xhrGet(A);
K.addCallback(function(G){var C=function(I,H){if(I.id==H){return I
}if(I.childNodes){for(var S=0;
S<I.childNodes.length;
S++){var T=C(I.childNodes[S],H);
if(T){return T
}}}return null
};
var F=document.createElement("div");
F.innerHTML=G;
P._rootNode=C(F,P.tableId);
P._getHeadings.call(P);
for(var E=0;
E<P._rootNode.rows.length;
E++){P._rootNode.rows[E].store=P
}J=P._rootNode.rows[O+1];
if(N.onItem){var D=N.scope?N.scope:B.global;
N.onItem.call(D,J)
}});
K.addErrback(function(D){if(N.onError){var C=N.scope?N.scope:B.global;
N.onError.call(C,D)
}})
}}else{if(this._rootNode.rows[O+1]){J=this._rootNode.rows[O+1];
if(N.onItem){var L=N.scope?N.scope:B.global;
N.onItem.call(L,J)
}}}}});
B.extend(dojox.data.HtmlTableStore,B.data.util.simpleFetch)
}}});