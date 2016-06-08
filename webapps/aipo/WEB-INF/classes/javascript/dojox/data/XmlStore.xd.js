dojo._xdResourceLoaded({depends:[["provide","dojox.data.XmlStore"],["provide","dojox.data.XmlItem"],["require","dojo.data.util.simpleFetch"],["require","dojo.data.util.filter"],["require","dojox.data.dom"]],defineResource:function(B){if(!B._hasResource["dojox.data.XmlStore"]){B._hasResource["dojox.data.XmlStore"]=true;
B.provide("dojox.data.XmlStore");
B.provide("dojox.data.XmlItem");
B.require("dojo.data.util.simpleFetch");
B.require("dojo.data.util.filter");
B.require("dojox.data.dom");
B.declare("dojox.data.XmlStore",null,{constructor:function(A){console.log("XmlStore()");
if(A){this._url=A.url;
this._rootItem=(A.rootItem||A.rootitem);
this._keyAttribute=(A.keyAttribute||A.keyattribute);
this._attributeMap=(A.attributeMap||A.attributemap);
this._labelAttr=A.label;
this._sendQuery=(A.sendQuery||A.sendquery)
}this._newItems=[];
this._deletedItems=[];
this._modifiedItems=[]
},getValue:function(J,K,P){var M=J.element;
if(K==="tagName"){return M.nodeName
}else{if(K==="childNodes"){for(var N=0;
N<M.childNodes.length;
N++){var L=M.childNodes[N];
if(L.nodeType===1){return this._getItem(L)
}}return P
}else{if(K==="text()"){for(var N=0;
N<M.childNodes.length;
N++){var L=M.childNodes[N];
if(L.nodeType===3||L.nodeType===4){return L.nodeValue
}}return P
}else{K=this._getAttribute(M.nodeName,K);
if(K.charAt(0)==="@"){var O=K.substring(1);
var A=M.getAttribute(O);
return(A!==undefined)?A:P
}else{for(var N=0;
N<M.childNodes.length;
N++){var L=M.childNodes[N];
if(L.nodeType===1&&L.nodeName===K){return this._getItem(L)
}}return P
}}}}},getValues:function(J,K){var M=J.element;
if(K==="tagName"){return[M.nodeName]
}else{if(K==="childNodes"){var P=[];
for(var N=0;
N<M.childNodes.length;
N++){var L=M.childNodes[N];
if(L.nodeType===1){P.push(this._getItem(L))
}}return P
}else{if(K==="text()"){var P=[];
for(var N=0;
N<M.childNodes.length;
N++){var L=childNodes[N];
if(L.nodeType===3){P.push(L.nodeValue)
}}return P
}else{K=this._getAttribute(M.nodeName,K);
if(K.charAt(0)==="@"){var O=K.substring(1);
var A=M.getAttribute(O);
return(A!==undefined)?[A]:[]
}else{var P=[];
for(var N=0;
N<M.childNodes.length;
N++){var L=M.childNodes[N];
if(L.nodeType===1&&L.nodeName===K){P.push(this._getItem(L))
}}return P
}}}}},getAttributes:function(O){var U=O.element;
var V=[];
V.push("tagName");
if(U.childNodes.length>0){var S={};
var Q=true;
var P=false;
for(var T=0;
T<U.childNodes.length;
T++){var A=U.childNodes[T];
if(A.nodeType===1){var N=A.nodeName;
if(!S[N]){V.push(N);
S[N]=N
}Q=true
}else{if(A.nodeType===3){P=true
}}}if(Q){V.push("childNodes")
}if(P){V.push("text()")
}}for(var T=0;
T<U.attributes.length;
T++){V.push("@"+U.attributes[T].nodeName)
}if(this._attributeMap){for(var R in this._attributeMap){var T=R.indexOf(".");
if(T>0){var M=R.substring(0,T);
if(M===U.nodeName){V.push(R.substring(T+1))
}}else{V.push(R)
}}}return V
},hasAttribute:function(A,D){return(this.getValue(A,D)!==undefined)
},containsValue:function(G,H,A){var J=this.getValues(G,H);
for(var I=0;
I<J.length;
I++){if((typeof A==="string")){if(J[I].toString&&J[I].toString()===A){return true
}}else{if(J[I]===A){return true
}}}return false
},isItem:function(A){if(A&&A.element&&A.store&&A.store===this){return true
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getFeatures:function(){var A={"dojo.data.api.Read":true,"dojo.data.api.Write":true};
return A
},getLabel:function(A){if(this._labelAttr&&this.isItem(A)){var D=this.getValue(A,this._labelAttr);
if(D){return D.toString()
}}return undefined
},getLabelAttributes:function(A){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(L,A,O){var N=this._getFetchUrl(L);
console.log("XmlStore._fetchItems(): url="+N);
if(!N){O(new Error("No URL specified."));
return 
}var J=(!this._sendQuery?L:null);
var P=this;
var K={url:N,handleAs:"xml",preventCache:true};
var M=B.xhrGet(K);
M.addCallback(function(C){var D=P._getItems(C,J);
console.log("XmlStore._fetchItems(): length="+(D?D.length:0));
if(D&&D.length>0){A(D,L)
}else{A([],L)
}});
M.addErrback(function(C){O(C,L)
})
},_getFetchUrl:function(J){if(!this._sendQuery){return this._url
}var H=J.query;
if(!H){return this._url
}if(B.isString(H)){return this._url+H
}var A="";
for(var K in H){var I=H[K];
if(I){if(A){A+="&"
}A+=(K+"="+I)
}}if(!A){return this._url
}var L=this._url;
if(L.indexOf("?")<0){L+="?"
}else{L+="&"
}return L+A
},_getItems:function(Z,e){var a=null;
if(e){a=e.query
}var b=[];
var S=null;
if(this._rootItem){S=Z.getElementsByTagName(this._rootItem)
}else{S=Z.documentElement.childNodes
}for(var d=0;
d<S.length;
d++){var A=S[d];
if(A.nodeType!=1){continue
}var U=this._getItem(A);
if(a){var T=true;
var c=e.queryOptions?e.queryOptions.ignoreCase:false;
var W={};
for(var X in a){var Y=a[X];
if(typeof Y==="string"){W[X]=B.data.util.filter.patternToRegExp(Y,c)
}}for(var R in a){var Y=this.getValue(U,R);
if(Y){var f=a[R];
if((typeof Y)==="string"&&(W[R])){if((Y.match(W[R]))!==null){continue
}}else{if((typeof Y)==="object"){if(Y.toString&&(W[R])){var V=Y.toString();
if((V.match(W[R]))!==null){continue
}}else{if(f==="*"||f===Y){continue
}}}}}T=false;
break
}if(!T){continue
}}b.push(U)
}B.forEach(b,function(C){C.element.parentNode.removeChild(C.element)
},this);
return b
},close:function(A){},newItem:function(M){console.log("XmlStore.newItem()");
M=(M||{});
var R=M.tagName;
if(!R){R=this._rootItem;
if(!R){return null
}}var P=this._getDocument();
var Q=P.createElement(R);
for(var A in M){if(A==="tagName"){continue
}else{if(A==="text()"){var O=P.createTextNode(M[A]);
Q.appendChild(O)
}else{A=this._getAttribute(R,A);
if(A.charAt(0)==="@"){var L=A.substring(1);
Q.setAttribute(L,M[A])
}else{var K=P.createElement(A);
var O=P.createTextNode(M[A]);
K.appendChild(O);
Q.appendChild(K)
}}}}var N=this._getItem(Q);
this._newItems.push(N);
return N
},deleteItem:function(A){console.log("XmlStore.deleteItem()");
var D=A.element;
if(D.parentNode){this._backupItem(A);
D.parentNode.removeChild(D);
return true
}this._forgetItem(A);
this._deletedItems.push(A);
return true
},setValue:function(N,A,P){if(A==="tagName"){return false
}this._backupItem(N);
var S=N.element;
if(A==="childNodes"){var L=P.element;
S.appendChild(L)
}else{if(A==="text()"){while(S.firstChild){S.removeChild(S.firstChild)
}var O=this._getDocument(S).createTextNode(P);
S.appendChild(O)
}else{A=this._getAttribute(S.nodeName,A);
if(A.charAt(0)==="@"){var M=A.substring(1);
S.setAttribute(M,P)
}else{var L=null;
for(var R=0;
R<S.childNodes.length;
R++){var T=S.childNodes[R];
if(T.nodeType===1&&T.nodeName===A){L=T;
break
}}var Q=this._getDocument(S);
if(L){while(L.firstChild){L.removeChild(L.firstChild)
}}else{L=Q.createElement(A);
S.appendChild(L)
}var O=Q.createTextNode(P);
L.appendChild(O)
}}}return true
},setValues:function(O,A,Q){if(A==="tagName"){return false
}this._backupItem(O);
var U=O.element;
if(A==="childNodes"){while(U.firstChild){U.removeChild(U.firstChild)
}for(var T=0;
T<Q.length;
T++){var M=Q[T].element;
U.appendChild(M)
}}else{if(A==="text()"){while(U.firstChild){U.removeChild(U.firstChild)
}var R="";
for(var T=0;
T<Q.length;
T++){R+=Q[T]
}var P=this._getDocument(U).createTextNode(R);
U.appendChild(P)
}else{A=this._getAttribute(U.nodeName,A);
if(A.charAt(0)==="@"){var N=A.substring(1);
U.setAttribute(N,Q[0])
}else{for(var T=U.childNodes.length-1;
T>=0;
T--){var V=U.childNodes[T];
if(V.nodeType===1&&V.nodeName===A){U.removeChild(V)
}}var S=this._getDocument(U);
for(var T=0;
T<Q.length;
T++){var M=S.createElement(A);
var P=S.createTextNode(Q[T]);
M.appendChild(P);
U.appendChild(M)
}}}}return true
},unsetAttribute:function(A,H){if(H==="tagName"){return false
}this._backupItem(A);
var J=A.element;
if(H==="childNodes"||H==="text()"){while(J.firstChild){J.removeChild(J.firstChild)
}}else{H=this._getAttribute(J.nodeName,H);
if(H.charAt(0)==="@"){var L=H.substring(1);
J.removeAttribute(L)
}else{for(var K=J.childNodes.length-1;
K>=0;
K--){var I=J.childNodes[K];
if(I.nodeType===1&&I.nodeName===H){J.removeChild(I)
}}}}return true
},save:function(F){if(!F){F={}
}for(var E=0;
E<this._modifiedItems.length;
E++){this._saveItem(this._modifiedItems[E],F,"PUT")
}for(var E=0;
E<this._newItems.length;
E++){var A=this._newItems[E];
if(A.element.parentNode){this._newItems.splice(E,1);
E--;
continue
}this._saveItem(this._newItems[E],F,"POST")
}for(var E=0;
E<this._deletedItems.length;
E++){this._saveItem(this._deletedItems[E],F,"DELETE")
}},revert:function(){console.log("XmlStore.revert() _newItems="+this._newItems.length);
console.log("XmlStore.revert() _deletedItems="+this._deletedItems.length);
console.log("XmlStore.revert() _modifiedItems="+this._modifiedItems.length);
this._newItems=[];
this._restoreItems(this._deletedItems);
this._deletedItems=[];
this._restoreItems(this._modifiedItems);
this._modifiedItems=[];
return true
},isDirty:function(A){if(A){var D=this._getRootElement(A.element);
return(this._getItemIndex(this._newItems,D)>=0||this._getItemIndex(this._deletedItems,D)>=0||this._getItemIndex(this._modifiedItems,D)>=0)
}else{return(this._newItems.length>0||this._deletedItems.length>0||this._modifiedItems.length>0)
}},_saveItem:function(J,M,A){if(A==="PUT"){url=this._getPutUrl(J)
}else{if(A==="DELETE"){url=this._getDeleteUrl(J)
}else{url=this._getPostUrl(J)
}}if(!url){if(M.onError){M.onError.call(L,new Error("No URL for saving content: "+postContent))
}return 
}var I={url:url,method:(A||"POST"),contentType:"text/xml",handleAs:"xml"};
var K;
if(A==="PUT"){I.putData=this._getPutContent(J);
saveHandler=B.rawXhrPut(I)
}else{if(A==="DELETE"){saveHandler=B.xhrDelete(I)
}else{I.postData=this._getPostContent(J);
saveHandler=B.rawXhrPost(I)
}}var L=(M.scope||B.global);
var N=this;
saveHandler.addCallback(function(C){N._forgetItem(J);
if(M.onComplete){M.onComplete.call(L)
}});
saveHandler.addErrback(function(C){if(M.onError){M.onError.call(L,C)
}})
},_getPostUrl:function(A){return this._url
},_getPutUrl:function(A){return this._url
},_getDeleteUrl:function(E){if(!this._url){return this._url
}var F=this._url;
if(E&&this._keyAttribute){var A=this.getValue(E,this._keyAttribute);
if(A){F=F+"?"+this._keyAttribute+"="+A
}}return F
},_getPostContent:function(E){var F=E.element;
var A='<?xml version="1.0"?>';
return A+dojox.data.dom.innerXML(F)
},_getPutContent:function(E){var F=E.element;
var A='<?xml version="1.0"?>';
return A+dojox.data.dom.innerXML(F)
},_getAttribute:function(G,F){if(this._attributeMap){var H=G+"."+F;
var A=this._attributeMap[H];
if(A){F=A
}else{A=this._attributeMap[F];
if(A){F=A
}}}return F
},_getItem:function(A){return new dojox.data.XmlItem(A,this)
},_getItemIndex:function(F,A){for(var E=0;
E<F.length;
E++){if(F[E].element===A){return E
}}return -1
},_backupItem:function(A){var D=this._getRootElement(A.element);
if(this._getItemIndex(this._newItems,D)>=0||this._getItemIndex(this._modifiedItems,D)>=0){return 
}if(D!=A.element){A=this._getItem(D)
}A._backup=D.cloneNode(true);
this._modifiedItems.push(A)
},_restoreItems:function(A){B.forEach(A,function(D){if(D._backup){D.element=D._backup;
D._backup=null
}},this)
},_forgetItem:function(A){var E=A.element;
var F=this._getItemIndex(this._newItems,E);
if(F>=0){this._newItems.splice(F,1)
}F=this._getItemIndex(this._deletedItems,E);
if(F>=0){this._deletedItems.splice(F,1)
}F=this._getItemIndex(this._modifiedItems,E);
if(F>=0){this._modifiedItems.splice(F,1)
}},_getDocument:function(A){if(A){return A.ownerDocument
}else{if(!this._document){return dojox.data.dom.createDocument()
}}},_getRootElement:function(A){while(A.parentNode){A=A.parentNode
}return A
}});
B.declare("dojox.data.XmlItem",null,{constructor:function(A,D){this.element=A;
this.store=D
},toString:function(){var A="";
if(this.element){for(var F=0;
F<this.element.childNodes.length;
F++){var E=this.element.childNodes[F];
if(E.nodeType===3){A=E.nodeValue;
break
}}}return A
}});
B.extend(dojox.data.XmlStore,B.data.util.simpleFetch)
}}});