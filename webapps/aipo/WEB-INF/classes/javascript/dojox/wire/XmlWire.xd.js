dojo._xdResourceLoaded({depends:[["provide","dojox.wire.XmlWire"],["require","dojox.data.dom"],["require","dojox.wire.Wire"]],defineResource:function(B){if(!B._hasResource["dojox.wire.XmlWire"]){B._hasResource["dojox.wire.XmlWire"]=true;
B.provide("dojox.wire.XmlWire");
B.require("dojox.data.dom");
B.require("dojox.wire.Wire");
B.declare("dojox.wire.XmlWire",dojox.wire.Wire,{_wireClass:"dojox.wire.XmlWire",constructor:function(A){},_getValue:function(N){if(!N||!this.path){return N
}var K=N;
var A=this.path;
if(A.charAt(0)=="/"){var M=A.indexOf("/",1);
A=A.substring(M+1)
}var I=A.split("/");
var L=I.length-1;
for(var M=0;
M<L;
M++){K=this._getChildNode(K,I[M]);
if(!K){return undefined
}}var J=this._getNodeValue(K,I[L]);
return J
},_setValue:function(T,P){if(!this.path){return T
}var A=T;
var Q=this._getDocument(A);
var N=this.path;
if(N.charAt(0)=="/"){var S=N.indexOf("/",1);
if(!A){var M=N.substring(1,S);
A=Q.createElement(M);
T=A
}N=N.substring(S+1)
}else{if(!A){return undefined
}}var R=N.split("/");
var O=R.length-1;
for(var S=0;
S<O;
S++){var L=this._getChildNode(A,R[S]);
if(!L){L=Q.createElement(R[S]);
A.appendChild(L)
}A=L
}this._setNodeValue(A,R[O],P);
return T
},_getNodeValue:function(L,I){var K=undefined;
if(I.charAt(0)=="@"){var M=I.substring(1);
K=L.getAttribute(M)
}else{if(I=="text()"){var J=L.firstChild;
if(J){K=J.nodeValue
}}else{K=[];
for(var N=0;
N<L.childNodes.length;
N++){var A=L.childNodes[N];
if(A.nodeType===1&&A.nodeName==I){K.push(A)
}}}}return K
},_setNodeValue:function(I,A,H){if(A.charAt(0)=="@"){var J=A.substring(1);
if(H){I.setAttribute(J,H)
}else{I.removeAttribute(J)
}}else{if(A=="text()"){while(I.firstChild){I.removeChild(I.firstChild)
}if(H){var G=this._getDocument(I).createTextNode(H);
I.appendChild(G)
}}}},_getChildNode:function(J,O){var P=1;
var K=O.indexOf("[");
if(K>=0){var M=O.indexOf("]");
P=O.substring(K+1,M);
O=O.substring(0,K)
}var L=1;
for(var N=0;
N<J.childNodes.length;
N++){var A=J.childNodes[N];
if(A.nodeType===1&&A.nodeName==O){if(L==P){return A
}L++
}}return null
},_getDocument:function(A){if(A){return(A.nodeType==9?A:A.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
}}});