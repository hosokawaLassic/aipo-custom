dojo._xdResourceLoaded({depends:[["provide","dojox.data.CsvStore"],["require","dojo.data.util.filter"],["require","dojo.data.util.simpleFetch"]],defineResource:function(B){if(!B._hasResource["dojox.data.CsvStore"]){B._hasResource["dojox.data.CsvStore"]=true;
B.provide("dojox.data.CsvStore");
B.require("dojo.data.util.filter");
B.require("dojo.data.util.simpleFetch");
B.declare("dojox.data.CsvStore",null,{constructor:function(A){this._attributes=[];
this._attributeIndexes={};
this._dataArray=[];
this._arrayOfAllItems=[];
this._loadFinished=false;
if(A.url){this.url=A.url
}this._csvData=A.data;
if(A.label){this.label=A.label
}else{if(this.label===""){this.label=undefined
}}this._storeProp="_csvStore";
this._idProp="_csvId";
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",label:"",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojox.data.CsvStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(!B.isString(A)){throw new Error("dojox.data.CsvStore: a function was passed an attribute argument that was not an attribute object nor an attribute name string")
}},getValue:function(G,H,I){this._assertIsItem(G);
this._assertIsAttribute(H);
var A=I;
if(this.hasAttribute(G,H)){var J=this._dataArray[this.getIdentity(G)];
A=J[this._attributeIndexes[H]]
}return A
},getValues:function(E,F){var A=this.getValue(E,F);
return(A?[A]:[])
},getAttributes:function(A){this._assertIsItem(A);
var G=[];
var H=this._dataArray[this.getIdentity(A)];
for(var F=0;
F<H.length;
F++){if(H[F]!=""){G.push(this._attributes[F])
}}return G
},hasAttribute:function(A,F){this._assertIsItem(A);
this._assertIsAttribute(F);
var G=this._attributeIndexes[F];
var H=this._dataArray[this.getIdentity(A)];
return(typeof G!="undefined"&&G<H.length&&H[G]!="")
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
},isItem:function(A){if(A&&A[this._storeProp]===this){var D=A[this._idProp];
if(D>=0&&D<this._dataArray.length){return true
}}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getFeatures:function(){return this._features
},getLabel:function(A){if(this.label&&this.isItem(A)){return this.getValue(A,this.label)
}return undefined
},getLabelAttributes:function(A){if(this.label){return[this.label]
}return null
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
if(this._loadFinished){K(L,this._arrayOfAllItems)
}else{if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:L,filter:K})
}else{this._loadInProgress=true;
var I={url:N.url,handleAs:"text"};
var J=B.xhrGet(I);
J.addCallback(function(C){N._processData(C);
K(L,N._arrayOfAllItems);
N._handleQueuedFetches()
});
J.addErrback(function(C){N._loadInProgress=false;
throw C
})
}}else{if(this._csvData){this._processData(this._csvData);
this._csvData=null;
K(L,this._arrayOfAllItems)
}else{throw new Error("dojox.data.CsvStore: No CSV source data was provided as either URL or String data input.")
}}}},close:function(A){},_getArrayOfArraysFromCsvFileContents:function(c){if(B.isString(c)){var W=new RegExp("\r\n|\n|\r");
var g=new RegExp("^\\s+","g");
var e=new RegExp("\\s+$","g");
var l=new RegExp('""',"g");
var X=[];
var a=c.split(W);
for(var U=0;
U<a.length;
++U){var j=a[U];
if(j.length>0){var Y=j.split(",");
var V=0;
while(V<Y.length){var Z=Y[V];
var i=Z.replace(g,"");
var k=i.replace(e,"");
var A=k.charAt(0);
var b=k.charAt(k.length-1);
var d=k.charAt(k.length-2);
var h=k.charAt(k.length-3);
if(k.length===2&&k=='""'){Y[V]=""
}else{if((A=='"')&&((b!='"')||((b=='"')&&(d=='"')&&(h!='"')))){if(V+1===Y.length){return null
}var f=Y[V+1];
Y[V]=i+","+f;
Y.splice(V+1,1)
}else{if((A=='"')&&(b=='"')){k=k.slice(1,(k.length-1));
k=k.replace(l,'"')
}Y[V]=k;
V+=1
}}}X.push(Y)
}}this._attributes=X.shift();
for(var U=0;
U<this._attributes.length;
U++){this._attributeIndexes[this._attributes[U]]=U
}this._dataArray=X
}},_processData:function(A){this._getArrayOfArraysFromCsvFileContents(A);
this._arrayOfAllItems=[];
for(var D=0;
D<this._dataArray.length;
D++){this._arrayOfAllItems.push(this._createItemFromIdentity(D))
}this._loadFinished=true;
this._loadInProgress=false
},_createItemFromIdentity:function(D){var A={};
A[this._storeProp]=this;
A[this._idProp]=D;
return A
},getIdentity:function(A){if(this.isItem(A)){return A[this._idProp]
}return null
},fetchItemByIdentity:function(K){if(!this._loadFinished){var L=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:K})
}else{this._loadInProgress=true;
var A={url:L.url,handleAs:"text"};
var H=B.xhrGet(A);
H.addCallback(function(C){var E=K.scope?K.scope:B.global;
try{L._processData(C);
var D=L._createItemFromIdentity(K.identity);
if(!L.isItem(D)){D=null
}if(K.onItem){K.onItem.call(E,D)
}L._handleQueuedFetches()
}catch(F){if(K.onError){K.onError.call(E,F)
}}});
H.addErrback(function(D){this._loadInProgress=false;
if(K.onError){var C=K.scope?K.scope:B.global;
K.onError.call(C,D)
}})
}}else{if(this._csvData){L._processData(L._csvData);
L._csvData=null;
var I=L._createItemFromIdentity(K.identity);
if(!L.isItem(I)){I=null
}if(K.onItem){var J=K.scope?K.scope:B.global;
K.onItem.call(J,I)
}}}}else{var I=this._createItemFromIdentity(K.identity);
if(!this.isItem(I)){I=null
}if(K.onItem){var J=K.scope?K.scope:B.global;
K.onItem.call(J,I)
}}},getIdentityAttributes:function(A){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var F=0;
F<this._queuedFetches.length;
F++){var H=this._queuedFetches[F];
var A=H.filter;
var G=H.args;
if(A){A(G,this._arrayOfAllItems)
}else{this.fetchItemByIdentity(H.args)
}}this._queuedFetches=[]
}}});
B.extend(dojox.data.CsvStore,B.data.util.simpleFetch)
}}});