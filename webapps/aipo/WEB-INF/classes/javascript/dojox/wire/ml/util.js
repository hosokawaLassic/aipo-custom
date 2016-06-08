if(!dojo._hasResource["dojox.wire.ml.util"]){dojo._hasResource["dojox.wire.ml.util"]=true;
dojo.provide("dojox.wire.ml.util");
dojo.require("dojox.data.dom");
dojo.require("dojox.wire.Wire");
dojox.wire.ml._getValue=function(G,J){if(!G){return undefined
}var H=undefined;
if(J&&G.length>=9&&G.substring(0,9)=="arguments"){H=G.substring(9);
return new dojox.wire.Wire({property:H}).getValue(J)
}var I=G.indexOf(".");
if(I>=0){H=G.substring(I+1);
G=G.substring(0,I)
}var F=(dijit.byId(G)||dojo.byId(G)||dojo.getObject(G));
if(!F){return undefined
}if(!H){return F
}else{return new dojox.wire.Wire({object:F,property:H}).getValue()
}};
dojox.wire.ml._setValue=function(G,H){if(!G){return 
}var J=G.indexOf(".");
if(J<0){return 
}var F=this._getValue(G.substring(0,J));
if(!F){return 
}var I=G.substring(J+1);
new dojox.wire.Wire({object:F,property:I}).setValue(H)
};
dojo.declare("dojox.wire.ml.XmlElement",null,{constructor:function(B){if(dojo.isString(B)){B=this._getDocument().createElement(B)
}this.element=B
},getPropertyValue:function(K){var L=undefined;
if(!this.element){return L
}if(!K){return L
}if(K.charAt(0)=="@"){var N=K.substring(1);
L=this.element.getAttribute(N)
}else{if(K=="text()"){var J=this.element.firstChild;
if(J){L=J.nodeValue
}}else{var M=[];
for(var H=0;
H<this.element.childNodes.length;
H++){var I=this.element.childNodes[H];
if(I.nodeType===1&&I.nodeName==K){M.push(new dojox.wire.ml.XmlElement(I))
}}if(M.length>0){if(M.length===1){L=M[0]
}else{L=M
}}}}return L
},setPropertyValue:function(M,N){if(!this.element){return 
}if(!M){return 
}if(M.charAt(0)=="@"){var P=M.substring(1);
if(N){this.element.setAttribute(P,N)
}else{this.element.removeAttribute(P)
}}else{if(M=="text()"){while(this.element.firstChild){this.element.removeChild(this.element.firstChild)
}if(N){var K=this._getDocument().createTextNode(N);
this.element.appendChild(K)
}}else{var O=null;
for(var I=this.element.childNodes.length-1;
I>=0;
I--){var J=this.element.childNodes[I];
if(J.nodeType===1&&J.nodeName==M){if(!O){O=J.nextSibling
}this.element.removeChild(J)
}}if(N){if(dojo.isArray(N)){for(var I in N){var L=N[I];
if(L.element){this.element.insertBefore(L.element,O)
}}}else{if(N instanceof dojox.wire.ml.XmlElement){if(N.element){this.element.insertBefore(N.element,O)
}}else{var J=this._getDocument().createElement(M);
var K=this._getDocument().createTextNode(N);
J.appendChild(K);
this.element.insertBefore(J,O)
}}}}}},toString:function(){var C="";
if(this.element){var D=this.element.firstChild;
if(D){C=D.nodeValue
}}return C
},toObject:function(){if(!this.element){return null
}var O="";
var R={};
var N=0;
for(var Q=0;
Q<this.element.childNodes.length;
Q++){var K=this.element.childNodes[Q];
if(K.nodeType===1){N++;
var T=new dojox.wire.ml.XmlElement(K).toObject();
var M=K.nodeName;
var L=R[M];
if(!L){R[M]=T
}else{if(dojo.isArray(L)){L.push(T)
}else{R[M]=[L,T]
}}}else{if(K.nodeType===3||K.nodeType===4){O+=K.nodeValue
}}}var S=0;
if(this.element.nodeType===1){S=this.element.attributes.length;
for(var Q=0;
Q<S;
Q++){var P=this.element.attributes[Q];
R["@"+P.nodeName]=P.nodeValue
}}if(N===0){if(S===0){return O
}R["text()"]=O
}return R
},_getDocument:function(){if(this.element){return(this.element.nodeType==9?this.element:this.element.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
};