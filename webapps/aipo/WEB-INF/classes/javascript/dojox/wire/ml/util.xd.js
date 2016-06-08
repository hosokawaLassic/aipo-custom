dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.util"],["require","dojox.data.dom"],["require","dojox.wire.Wire"]],defineResource:function(B){if(!B._hasResource["dojox.wire.ml.util"]){B._hasResource["dojox.wire.ml.util"]=true;
B.provide("dojox.wire.ml.util");
B.require("dojox.data.dom");
B.require("dojox.wire.Wire");
dojox.wire.ml._getValue=function(A,I){if(!A){return undefined
}var G=undefined;
if(I&&A.length>=9&&A.substring(0,9)=="arguments"){G=A.substring(9);
return new dojox.wire.Wire({property:G}).getValue(I)
}var H=A.indexOf(".");
if(H>=0){G=A.substring(H+1);
A=A.substring(0,H)
}var J=(dijit.byId(A)||B.byId(A)||B.getObject(A));
if(!J){return undefined
}if(!G){return J
}else{return new dojox.wire.Wire({object:J,property:G}).getValue()
}};
dojox.wire.ml._setValue=function(A,G){if(!A){return 
}var I=A.indexOf(".");
if(I<0){return 
}var J=this._getValue(A.substring(0,I));
if(!J){return 
}var H=A.substring(I+1);
new dojox.wire.Wire({object:J,property:H}).setValue(G)
};
B.declare("dojox.wire.ml.XmlElement",null,{constructor:function(A){if(B.isString(A)){A=this._getDocument().createElement(A)
}this.element=A
},getPropertyValue:function(J){var K=undefined;
if(!this.element){return K
}if(!J){return K
}if(J.charAt(0)=="@"){var M=J.substring(1);
K=this.element.getAttribute(M)
}else{if(J=="text()"){var I=this.element.firstChild;
if(I){K=I.nodeValue
}}else{var L=[];
for(var N=0;
N<this.element.childNodes.length;
N++){var A=this.element.childNodes[N];
if(A.nodeType===1&&A.nodeName==J){L.push(new dojox.wire.ml.XmlElement(A))
}}if(L.length>0){if(L.length===1){K=L[0]
}else{K=L
}}}}return K
},setPropertyValue:function(L,M){if(!this.element){return 
}if(!L){return 
}if(L.charAt(0)=="@"){var O=L.substring(1);
if(M){this.element.setAttribute(O,M)
}else{this.element.removeAttribute(O)
}}else{if(L=="text()"){while(this.element.firstChild){this.element.removeChild(this.element.firstChild)
}if(M){var J=this._getDocument().createTextNode(M);
this.element.appendChild(J)
}}else{var N=null;
for(var P=this.element.childNodes.length-1;
P>=0;
P--){var A=this.element.childNodes[P];
if(A.nodeType===1&&A.nodeName==L){if(!N){N=A.nextSibling
}this.element.removeChild(A)
}}if(M){if(B.isArray(M)){for(var P in M){var K=M[P];
if(K.element){this.element.insertBefore(K.element,N)
}}}else{if(M instanceof dojox.wire.ml.XmlElement){if(M.element){this.element.insertBefore(M.element,N)
}}else{var A=this._getDocument().createElement(L);
var J=this._getDocument().createTextNode(M);
A.appendChild(J);
this.element.insertBefore(A,N)
}}}}}},toString:function(){var D="";
if(this.element){var A=this.element.firstChild;
if(A){D=A.nodeValue
}}return D
},toObject:function(){if(!this.element){return null
}var N="";
var Q={};
var M=0;
for(var P=0;
P<this.element.childNodes.length;
P++){var T=this.element.childNodes[P];
if(T.nodeType===1){M++;
var S=new dojox.wire.ml.XmlElement(T).toObject();
var L=T.nodeName;
var A=Q[L];
if(!A){Q[L]=S
}else{if(B.isArray(A)){A.push(S)
}else{Q[L]=[A,S]
}}}else{if(T.nodeType===3||T.nodeType===4){N+=T.nodeValue
}}}var R=0;
if(this.element.nodeType===1){R=this.element.attributes.length;
for(var P=0;
P<R;
P++){var O=this.element.attributes[P];
Q["@"+O.nodeName]=O.nodeValue
}}if(M===0){if(R===0){return N
}Q["text()"]=N
}return Q
},_getDocument:function(){if(this.element){return(this.element.nodeType==9?this.element:this.element.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
}}});