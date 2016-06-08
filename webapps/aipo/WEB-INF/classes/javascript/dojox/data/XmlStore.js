if(!dojo._hasResource["dojox.data.XmlStore"]){dojo._hasResource["dojox.data.XmlStore"]=true;
dojo.provide("dojox.data.XmlStore");
dojo.provide("dojox.data.XmlItem");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.data.util.filter");
dojo.require("dojox.data.dom");
dojo.declare("dojox.data.XmlStore",null,{constructor:function(B){console.log("XmlStore()");
if(B){this._url=B.url;
this._rootItem=(B.rootItem||B.rootitem);
this._keyAttribute=(B.keyAttribute||B.keyattribute);
this._attributeMap=(B.attributeMap||B.attributemap);
this._labelAttr=B.label;
this._sendQuery=(B.sendQuery||B.sendquery)
}this._newItems=[];
this._deletedItems=[];
this._modifiedItems=[]
},getValue:function(K,L,I){var N=K.element;
if(L==="tagName"){return N.nodeName
}else{if(L==="childNodes"){for(var O=0;
O<N.childNodes.length;
O++){var M=N.childNodes[O];
if(M.nodeType===1){return this._getItem(M)
}}return I
}else{if(L==="text()"){for(var O=0;
O<N.childNodes.length;
O++){var M=N.childNodes[O];
if(M.nodeType===3||M.nodeType===4){return M.nodeValue
}}return I
}else{L=this._getAttribute(N.nodeName,L);
if(L.charAt(0)==="@"){var P=L.substring(1);
var J=N.getAttribute(P);
return(J!==undefined)?J:I
}else{for(var O=0;
O<N.childNodes.length;
O++){var M=N.childNodes[O];
if(M.nodeType===1&&M.nodeName===L){return this._getItem(M)
}}return I
}}}}},getValues:function(K,L){var N=K.element;
if(L==="tagName"){return[N.nodeName]
}else{if(L==="childNodes"){var I=[];
for(var O=0;
O<N.childNodes.length;
O++){var M=N.childNodes[O];
if(M.nodeType===1){I.push(this._getItem(M))
}}return I
}else{if(L==="text()"){var I=[];
for(var O=0;
O<N.childNodes.length;
O++){var M=childNodes[O];
if(M.nodeType===3){I.push(M.nodeValue)
}}return I
}else{L=this._getAttribute(N.nodeName,L);
if(L.charAt(0)==="@"){var P=L.substring(1);
var J=N.getAttribute(P);
return(J!==undefined)?[J]:[]
}else{var I=[];
for(var O=0;
O<N.childNodes.length;
O++){var M=N.childNodes[O];
if(M.nodeType===1&&M.nodeName===L){I.push(this._getItem(M))
}}return I
}}}}},getAttributes:function(P){var V=P.element;
var L=[];
L.push("tagName");
if(V.childNodes.length>0){var T={};
var R=true;
var Q=false;
for(var U=0;
U<V.childNodes.length;
U++){var M=V.childNodes[U];
if(M.nodeType===1){var O=M.nodeName;
if(!T[O]){L.push(O);
T[O]=O
}R=true
}else{if(M.nodeType===3){Q=true
}}}if(R){L.push("childNodes")
}if(Q){L.push("text()")
}}for(var U=0;
U<V.attributes.length;
U++){L.push("@"+V.attributes[U].nodeName)
}if(this._attributeMap){for(var S in this._attributeMap){var U=S.indexOf(".");
if(U>0){var N=S.substring(0,U);
if(N===V.nodeName){L.push(S.substring(U+1))
}}else{L.push(S)
}}}return L
},hasAttribute:function(D,C){return(this.getValue(D,C)!==undefined)
},containsValue:function(H,I,G){var F=this.getValues(H,I);
for(var J=0;
J<F.length;
J++){if((typeof G==="string")){if(F[J].toString&&F[J].toString()===G){return true
}}else{if(F[J]===G){return true
}}}return false
},isItem:function(B){if(B&&B.element&&B.store&&B.store===this){return true
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getFeatures:function(){var B={"dojo.data.api.Read":true,"dojo.data.api.Write":true};
return B
},getLabel:function(D){if(this._labelAttr&&this.isItem(D)){var C=this.getValue(D,this._labelAttr);
if(C){return C.toString()
}}return undefined
},getLabelAttributes:function(B){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(M,J,P){var O=this._getFetchUrl(M);
console.log("XmlStore._fetchItems(): url="+O);
if(!O){P(new Error("No URL specified."));
return 
}var K=(!this._sendQuery?M:null);
var I=this;
var L={url:O,handleAs:"xml",preventCache:true};
var N=dojo.xhrGet(L);
N.addCallback(function(A){var B=I._getItems(A,K);
console.log("XmlStore._fetchItems(): length="+(B?B.length:0));
if(B&&B.length>0){J(B,M)
}else{J([],M)
}});
N.addErrback(function(A){P(A,M)
})
},_getFetchUrl:function(K){if(!this._sendQuery){return this._url
}var I=K.query;
if(!I){return this._url
}if(dojo.isString(I)){return this._url+I
}var H="";
for(var L in I){var J=I[L];
if(J){if(H){H+="&"
}H+=(L+"="+J)
}}if(!H){return this._url
}var G=this._url;
if(G.indexOf("?")<0){G+="?"
}else{G+="&"
}return G+H
},_getItems:function(a,f){var b=null;
if(f){b=f.query
}var c=[];
var T=null;
if(this._rootItem){T=a.getElementsByTagName(this._rootItem)
}else{T=a.documentElement.childNodes
}for(var e=0;
e<T.length;
e++){var R=T[e];
if(R.nodeType!=1){continue
}var V=this._getItem(R);
if(b){var U=true;
var d=f.queryOptions?f.queryOptions.ignoreCase:false;
var X={};
for(var Y in b){var Z=b[Y];
if(typeof Z==="string"){X[Y]=dojo.data.util.filter.patternToRegExp(Z,d)
}}for(var S in b){var Z=this.getValue(V,S);
if(Z){var Q=b[S];
if((typeof Z)==="string"&&(X[S])){if((Z.match(X[S]))!==null){continue
}}else{if((typeof Z)==="object"){if(Z.toString&&(X[S])){var W=Z.toString();
if((W.match(X[S]))!==null){continue
}}else{if(Q==="*"||Q===Z){continue
}}}}}U=false;
break
}if(!U){continue
}}c.push(V)
}dojo.forEach(c,function(A){A.element.parentNode.removeChild(A.element)
},this);
return c
},close:function(B){},newItem:function(N){console.log("XmlStore.newItem()");
N=(N||{});
var J=N.tagName;
if(!J){J=this._rootItem;
if(!J){return null
}}var Q=this._getDocument();
var R=Q.createElement(J);
for(var K in N){if(K==="tagName"){continue
}else{if(K==="text()"){var P=Q.createTextNode(N[K]);
R.appendChild(P)
}else{K=this._getAttribute(J,K);
if(K.charAt(0)==="@"){var M=K.substring(1);
R.setAttribute(M,N[K])
}else{var L=Q.createElement(K);
var P=Q.createTextNode(N[K]);
L.appendChild(P);
R.appendChild(L)
}}}}var O=this._getItem(R);
this._newItems.push(O);
return O
},deleteItem:function(D){console.log("XmlStore.deleteItem()");
var C=D.element;
if(C.parentNode){this._backupItem(D);
C.parentNode.removeChild(C);
return true
}this._forgetItem(D);
this._deletedItems.push(D);
return true
},setValue:function(O,L,Q){if(L==="tagName"){return false
}this._backupItem(O);
var T=O.element;
if(L==="childNodes"){var M=Q.element;
T.appendChild(M)
}else{if(L==="text()"){while(T.firstChild){T.removeChild(T.firstChild)
}var P=this._getDocument(T).createTextNode(Q);
T.appendChild(P)
}else{L=this._getAttribute(T.nodeName,L);
if(L.charAt(0)==="@"){var N=L.substring(1);
T.setAttribute(N,Q)
}else{var M=null;
for(var S=0;
S<T.childNodes.length;
S++){var K=T.childNodes[S];
if(K.nodeType===1&&K.nodeName===L){M=K;
break
}}var R=this._getDocument(T);
if(M){while(M.firstChild){M.removeChild(M.firstChild)
}}else{M=R.createElement(L);
T.appendChild(M)
}var P=R.createTextNode(Q);
M.appendChild(P)
}}}return true
},setValues:function(P,M,R){if(M==="tagName"){return false
}this._backupItem(P);
var V=P.element;
if(M==="childNodes"){while(V.firstChild){V.removeChild(V.firstChild)
}for(var U=0;
U<R.length;
U++){var N=R[U].element;
V.appendChild(N)
}}else{if(M==="text()"){while(V.firstChild){V.removeChild(V.firstChild)
}var S="";
for(var U=0;
U<R.length;
U++){S+=R[U]
}var Q=this._getDocument(V).createTextNode(S);
V.appendChild(Q)
}else{M=this._getAttribute(V.nodeName,M);
if(M.charAt(0)==="@"){var O=M.substring(1);
V.setAttribute(O,R[0])
}else{for(var U=V.childNodes.length-1;
U>=0;
U--){var L=V.childNodes[U];
if(L.nodeType===1&&L.nodeName===M){V.removeChild(L)
}}var T=this._getDocument(V);
for(var U=0;
U<R.length;
U++){var N=T.createElement(M);
var Q=T.createTextNode(R[U]);
N.appendChild(Q);
V.appendChild(N)
}}}}return true
},unsetAttribute:function(H,I){if(I==="tagName"){return false
}this._backupItem(H);
var K=H.element;
if(I==="childNodes"||I==="text()"){while(K.firstChild){K.removeChild(K.firstChild)
}}else{I=this._getAttribute(K.nodeName,I);
if(I.charAt(0)==="@"){var G=I.substring(1);
K.removeAttribute(G)
}else{for(var L=K.childNodes.length-1;
L>=0;
L--){var J=K.childNodes[L];
if(J.nodeType===1&&J.nodeName===I){K.removeChild(J)
}}}}return true
},save:function(D){if(!D){D={}
}for(var F=0;
F<this._modifiedItems.length;
F++){this._saveItem(this._modifiedItems[F],D,"PUT")
}for(var F=0;
F<this._newItems.length;
F++){var E=this._newItems[F];
if(E.element.parentNode){this._newItems.splice(F,1);
F--;
continue
}this._saveItem(this._newItems[F],D,"POST")
}for(var F=0;
F<this._deletedItems.length;
F++){this._saveItem(this._deletedItems[F],D,"DELETE")
}},revert:function(){console.log("XmlStore.revert() _newItems="+this._newItems.length);
console.log("XmlStore.revert() _deletedItems="+this._deletedItems.length);
console.log("XmlStore.revert() _modifiedItems="+this._modifiedItems.length);
this._newItems=[];
this._restoreItems(this._deletedItems);
this._deletedItems=[];
this._restoreItems(this._modifiedItems);
this._modifiedItems=[];
return true
},isDirty:function(D){if(D){var C=this._getRootElement(D.element);
return(this._getItemIndex(this._newItems,C)>=0||this._getItemIndex(this._deletedItems,C)>=0||this._getItemIndex(this._modifiedItems,C)>=0)
}else{return(this._newItems.length>0||this._deletedItems.length>0||this._modifiedItems.length>0)
}},_saveItem:function(K,N,I){if(I==="PUT"){url=this._getPutUrl(K)
}else{if(I==="DELETE"){url=this._getDeleteUrl(K)
}else{url=this._getPostUrl(K)
}}if(!url){if(N.onError){N.onError.call(M,new Error("No URL for saving content: "+postContent))
}return 
}var J={url:url,method:(I||"POST"),contentType:"text/xml",handleAs:"xml"};
var L;
if(I==="PUT"){J.putData=this._getPutContent(K);
saveHandler=dojo.rawXhrPut(J)
}else{if(I==="DELETE"){saveHandler=dojo.xhrDelete(J)
}else{J.postData=this._getPostContent(K);
saveHandler=dojo.rawXhrPost(J)
}}var M=(N.scope||dojo.global);
var H=this;
saveHandler.addCallback(function(A){H._forgetItem(K);
if(N.onComplete){N.onComplete.call(M)
}});
saveHandler.addErrback(function(A){if(N.onError){N.onError.call(M,A)
}})
},_getPostUrl:function(B){return this._url
},_getPutUrl:function(B){return this._url
},_getDeleteUrl:function(F){if(!this._url){return this._url
}var D=this._url;
if(F&&this._keyAttribute){var E=this.getValue(F,this._keyAttribute);
if(E){D=D+"?"+this._keyAttribute+"="+E
}}return D
},_getPostContent:function(F){var D=F.element;
var E='<?xml version="1.0"?>';
return E+dojox.data.dom.innerXML(D)
},_getPutContent:function(F){var D=F.element;
var E='<?xml version="1.0"?>';
return E+dojox.data.dom.innerXML(D)
},_getAttribute:function(H,G){if(this._attributeMap){var E=H+"."+G;
var F=this._attributeMap[E];
if(F){G=F
}else{F=this._attributeMap[G];
if(F){G=F
}}}return G
},_getItem:function(B){return new dojox.data.XmlItem(B,this)
},_getItemIndex:function(D,E){for(var F=0;
F<D.length;
F++){if(D[F].element===E){return F
}}return -1
},_backupItem:function(D){var C=this._getRootElement(D.element);
if(this._getItemIndex(this._newItems,C)>=0||this._getItemIndex(this._modifiedItems,C)>=0){return 
}if(C!=D.element){D=this._getItem(C)
}D._backup=C.cloneNode(true);
this._modifiedItems.push(D)
},_restoreItems:function(B){dojo.forEach(B,function(A){if(A._backup){A.element=A._backup;
A._backup=null
}},this)
},_forgetItem:function(E){var F=E.element;
var D=this._getItemIndex(this._newItems,F);
if(D>=0){this._newItems.splice(D,1)
}D=this._getItemIndex(this._deletedItems,F);
if(D>=0){this._deletedItems.splice(D,1)
}D=this._getItemIndex(this._modifiedItems,F);
if(D>=0){this._modifiedItems.splice(D,1)
}},_getDocument:function(B){if(B){return B.ownerDocument
}else{if(!this._document){return dojox.data.dom.createDocument()
}}},_getRootElement:function(B){while(B.parentNode){B=B.parentNode
}return B
}});
dojo.declare("dojox.data.XmlItem",null,{constructor:function(D,C){this.element=D;
this.store=C
},toString:function(){var E="";
if(this.element){for(var D=0;
D<this.element.childNodes.length;
D++){var F=this.element.childNodes[D];
if(F.nodeType===3){E=F.nodeValue;
break
}}}return E
}});
dojo.extend(dojox.data.XmlStore,dojo.data.util.simpleFetch)
};