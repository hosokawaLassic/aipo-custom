if(!dojo._hasResource["dojox.data.CsvStore"]){dojo._hasResource["dojox.data.CsvStore"]=true;
dojo.provide("dojox.data.CsvStore");
dojo.require("dojo.data.util.filter");
dojo.require("dojo.data.util.simpleFetch");
dojo.declare("dojox.data.CsvStore",null,{constructor:function(B){this._attributes=[];
this._attributeIndexes={};
this._dataArray=[];
this._arrayOfAllItems=[];
this._loadFinished=false;
if(B.url){this.url=B.url
}this._csvData=B.data;
if(B.label){this.label=B.label
}else{if(this.label===""){this.label=undefined
}}this._storeProp="_csvStore";
this._idProp="_csvId";
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",label:"",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojox.data.CsvStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(!dojo.isString(B)){throw new Error("dojox.data.CsvStore: a function was passed an attribute argument that was not an attribute object nor an attribute name string")
}},getValue:function(H,I,J){this._assertIsItem(H);
this._assertIsAttribute(I);
var G=J;
if(this.hasAttribute(H,I)){var F=this._dataArray[this.getIdentity(H)];
G=F[this._attributeIndexes[I]]
}return G
},getValues:function(F,D){var E=this.getValue(F,D);
return(E?[E]:[])
},getAttributes:function(F){this._assertIsItem(F);
var H=[];
var E=this._dataArray[this.getIdentity(F)];
for(var G=0;
G<E.length;
G++){if(E[G]!=""){H.push(this._attributes[G])
}}return H
},hasAttribute:function(F,G){this._assertIsItem(F);
this._assertIsAttribute(G);
var H=this._attributeIndexes[G];
var E=this._dataArray[this.getIdentity(F)];
return(typeof H!="undefined"&&H<E.length&&E[H]!="")
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
},isItem:function(D){if(D&&D[this._storeProp]===this){var C=D[this._idProp];
if(C>=0&&C<this._dataArray.length){return true
}}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getFeatures:function(){return this._features
},getLabel:function(B){if(this.label&&this.isItem(B)){return this.getValue(B,this.label)
}return undefined
},getLabelAttributes:function(B){if(this.label){return[this.label]
}return null
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
if(this._loadFinished){L(M,this._arrayOfAllItems)
}else{if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:M,filter:L})
}else{this._loadInProgress=true;
var J={url:H.url,handleAs:"text"};
var K=dojo.xhrGet(J);
K.addCallback(function(A){H._processData(A);
L(M,H._arrayOfAllItems);
H._handleQueuedFetches()
});
K.addErrback(function(A){H._loadInProgress=false;
throw A
})
}}else{if(this._csvData){this._processData(this._csvData);
this._csvData=null;
L(M,this._arrayOfAllItems)
}else{throw new Error("dojox.data.CsvStore: No CSV source data was provided as either URL or String data input.")
}}}},close:function(B){},_getArrayOfArraysFromCsvFileContents:function(c){if(dojo.isString(c)){var W=new RegExp("\r\n|\n|\r");
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
var T=k.charAt(0);
var b=k.charAt(k.length-1);
var d=k.charAt(k.length-2);
var h=k.charAt(k.length-3);
if(k.length===2&&k=='""'){Y[V]=""
}else{if((T=='"')&&((b!='"')||((b=='"')&&(d=='"')&&(h!='"')))){if(V+1===Y.length){return null
}var f=Y[V+1];
Y[V]=i+","+f;
Y.splice(V+1,1)
}else{if((T=='"')&&(b=='"')){k=k.slice(1,(k.length-1));
k=k.replace(l,'"')
}Y[V]=k;
V+=1
}}}X.push(Y)
}}this._attributes=X.shift();
for(var U=0;
U<this._attributes.length;
U++){this._attributeIndexes[this._attributes[U]]=U
}this._dataArray=X
}},_processData:function(D){this._getArrayOfArraysFromCsvFileContents(D);
this._arrayOfAllItems=[];
for(var C=0;
C<this._dataArray.length;
C++){this._arrayOfAllItems.push(this._createItemFromIdentity(C))
}this._loadFinished=true;
this._loadInProgress=false
},_createItemFromIdentity:function(C){var D={};
D[this._storeProp]=this;
D[this._idProp]=C;
return D
},getIdentity:function(B){if(this.isItem(B)){return B[this._idProp]
}return null
},fetchItemByIdentity:function(L){if(!this._loadFinished){var G=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:L})
}else{this._loadInProgress=true;
var H={url:G.url,handleAs:"text"};
var I=dojo.xhrGet(H);
I.addCallback(function(A){var C=L.scope?L.scope:dojo.global;
try{G._processData(A);
var B=G._createItemFromIdentity(L.identity);
if(!G.isItem(B)){B=null
}if(L.onItem){L.onItem.call(C,B)
}G._handleQueuedFetches()
}catch(D){if(L.onError){L.onError.call(C,D)
}}});
I.addErrback(function(B){this._loadInProgress=false;
if(L.onError){var A=L.scope?L.scope:dojo.global;
L.onError.call(A,B)
}})
}}else{if(this._csvData){G._processData(G._csvData);
G._csvData=null;
var J=G._createItemFromIdentity(L.identity);
if(!G.isItem(J)){J=null
}if(L.onItem){var K=L.scope?L.scope:dojo.global;
L.onItem.call(K,J)
}}}}else{var J=this._createItemFromIdentity(L.identity);
if(!this.isItem(J)){J=null
}if(L.onItem){var K=L.scope?L.scope:dojo.global;
L.onItem.call(K,J)
}}},getIdentityAttributes:function(B){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var G=0;
G<this._queuedFetches.length;
G++){var E=this._queuedFetches[G];
var F=E.filter;
var H=E.args;
if(F){F(H,this._arrayOfAllItems)
}else{this.fetchItemByIdentity(E.args)
}}this._queuedFetches=[]
}}});
dojo.extend(dojox.data.CsvStore,dojo.data.util.simpleFetch)
};