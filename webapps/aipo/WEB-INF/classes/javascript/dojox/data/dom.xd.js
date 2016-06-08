dojo._xdResourceLoaded({depends:[["provide","dojox.data.dom"]],defineResource:function(B){if(!B._hasResource["dojox.data.dom"]){B._hasResource["dojox.data.dom"]=true;
B.provide("dojox.data.dom");
B.experimental("dojox.data.dom");
dojox.data.dom.createDocument=function(R,Q){var P=B.doc;
if(!Q){Q="text/xml"
}if(R&&(typeof B.global.DOMParser)!=="undefined"){var M=new DOMParser();
return M.parseFromString(R,Q)
}else{if((typeof B.global.ActiveXObject)!=="undefined"){var A=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var T=0;
T<A.length;
T++){try{var O=new ActiveXObject(A[T]+".XMLDOM");
if(R){if(O){O.async=false;
O.loadXML(R);
return O
}else{console.log("loadXML didn't work?")
}}else{if(O){return O
}}}catch(S){}}}else{if((P.implementation)&&(P.implementation.createDocument)){if(R){if(P.createElement){var L=P.createElement("xml");
L.innerHTML=R;
var N=P.implementation.createDocument("foo","",null);
for(var T=0;
T<L.childNodes.length;
T++){N.importNode(L.childNodes.item(T),true)
}return N
}}else{return P.implementation.createDocument("","",null)
}}}}return null
};
dojox.data.dom.textContent=function(G,A){if(arguments.length>1){var J=G.ownerDocument||B.doc;
dojox.data.dom.replaceChildren(G,J.createTextNode(A));
return A
}else{if(G.textContent!==undefined){return G.textContent
}var H="";
if(G==null){return H
}for(var I=0;
I<G.childNodes.length;
I++){switch(G.childNodes[I].nodeType){case 1:case 5:H+=dojox.data.dom.textContent(G.childNodes[I]);
break;
case 3:case 2:case 4:H+=G.childNodes[I].nodeValue;
break;
default:break
}}return H
}};
dojox.data.dom.replaceChildren=function(F,A){var H=[];
if(B.isIE){for(var G=0;
G<F.childNodes.length;
G++){H.push(F.childNodes[G])
}}dojox.data.dom.removeChildren(F);
for(var G=0;
G<H.length;
G++){B._destroyElement(H[G])
}if(!B.isArray(A)){F.appendChild(A)
}else{for(var G=0;
G<A.length;
G++){F.appendChild(A[G])
}}};
dojox.data.dom.removeChildren=function(A){var D=A.childNodes.length;
while(A.hasChildNodes()){A.removeChild(A.firstChild)
}return D
};
dojox.data.dom.innerXML=function(A){if(A.innerXML){return A.innerXML
}else{if(A.xml){return A.xml
}else{if(typeof XMLSerializer!="undefined"){return(new XMLSerializer()).serializeToString(A)
}}}}
}}});