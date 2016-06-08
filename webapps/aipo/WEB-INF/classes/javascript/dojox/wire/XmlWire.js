if(!dojo._hasResource["dojox.wire.XmlWire"]){dojo._hasResource["dojox.wire.XmlWire"]=true;
dojo.provide("dojox.wire.XmlWire");
dojo.require("dojox.data.dom");
dojo.require("dojox.wire.Wire");
dojo.declare("dojox.wire.XmlWire",dojox.wire.Wire,{_wireClass:"dojox.wire.XmlWire",constructor:function(B){},_getValue:function(H){if(!H||!this.path){return H
}var L=H;
var I=this.path;
if(I.charAt(0)=="/"){var N=I.indexOf("/",1);
I=I.substring(N+1)
}var J=I.split("/");
var M=J.length-1;
for(var N=0;
N<M;
N++){L=this._getChildNode(L,J[N]);
if(!L){return undefined
}}var K=this._getNodeValue(L,J[M]);
return K
},_setValue:function(K,Q){if(!this.path){return K
}var L=K;
var R=this._getDocument(L);
var O=this.path;
if(O.charAt(0)=="/"){var T=O.indexOf("/",1);
if(!L){var N=O.substring(1,T);
L=R.createElement(N);
K=L
}O=O.substring(T+1)
}else{if(!L){return undefined
}}var S=O.split("/");
var P=S.length-1;
for(var T=0;
T<P;
T++){var M=this._getChildNode(L,S[T]);
if(!M){M=R.createElement(S[T]);
L.appendChild(M)
}L=M
}this._setNodeValue(L,S[P],Q);
return K
},_getNodeValue:function(M,J){var L=undefined;
if(J.charAt(0)=="@"){var N=J.substring(1);
L=M.getAttribute(N)
}else{if(J=="text()"){var K=M.firstChild;
if(K){L=K.nodeValue
}}else{L=[];
for(var H=0;
H<M.childNodes.length;
H++){var I=M.childNodes[H];
if(I.nodeType===1&&I.nodeName==J){L.push(I)
}}}}return L
},_setNodeValue:function(J,G,I){if(G.charAt(0)=="@"){var F=G.substring(1);
if(I){J.setAttribute(F,I)
}else{J.removeAttribute(F)
}}else{if(G=="text()"){while(J.firstChild){J.removeChild(J.firstChild)
}if(I){var H=this._getDocument(J).createTextNode(I);
J.appendChild(H)
}}}},_getChildNode:function(K,P){var I=1;
var L=P.indexOf("[");
if(L>=0){var N=P.indexOf("]");
I=P.substring(L+1,N);
P=P.substring(0,L)
}var M=1;
for(var O=0;
O<K.childNodes.length;
O++){var J=K.childNodes[O];
if(J.nodeType===1&&J.nodeName==P){if(M==I){return J
}M++
}}return null
},_getDocument:function(B){if(B){return(B.nodeType==9?B:B.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
};