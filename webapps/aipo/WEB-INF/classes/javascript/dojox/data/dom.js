if(!dojo._hasResource["dojox.data.dom"]){dojo._hasResource["dojox.data.dom"]=true;
dojo.provide("dojox.data.dom");
dojo.experimental("dojox.data.dom");
dojox.data.dom.createDocument=function(S,R){var Q=dojo.doc;
if(!R){R="text/xml"
}if(S&&(typeof dojo.global.DOMParser)!=="undefined"){var N=new DOMParser();
return N.parseFromString(S,R)
}else{if((typeof dojo.global.ActiveXObject)!=="undefined"){var L=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var K=0;
K<L.length;
K++){try{var P=new ActiveXObject(L[K]+".XMLDOM");
if(S){if(P){P.async=false;
P.loadXML(S);
return P
}else{console.log("loadXML didn't work?")
}}else{if(P){return P
}}}catch(T){}}}else{if((Q.implementation)&&(Q.implementation.createDocument)){if(S){if(Q.createElement){var M=Q.createElement("xml");
M.innerHTML=S;
var O=Q.implementation.createDocument("foo","",null);
for(var K=0;
K<M.childNodes.length;
K++){O.importNode(M.childNodes.item(K),true)
}return O
}}else{return Q.implementation.createDocument("","",null)
}}}}return null
};
dojox.data.dom.textContent=function(H,G){if(arguments.length>1){var F=H.ownerDocument||dojo.doc;
dojox.data.dom.replaceChildren(H,F.createTextNode(G));
return G
}else{if(H.textContent!==undefined){return H.textContent
}var I="";
if(H==null){return I
}for(var J=0;
J<H.childNodes.length;
J++){switch(H.childNodes[J].nodeType){case 1:case 5:I+=dojox.data.dom.textContent(H.childNodes[J]);
break;
case 3:case 2:case 4:I+=H.childNodes[J].nodeValue;
break;
default:break
}}return I
}};
dojox.data.dom.replaceChildren=function(G,F){var E=[];
if(dojo.isIE){for(var H=0;
H<G.childNodes.length;
H++){E.push(G.childNodes[H])
}}dojox.data.dom.removeChildren(G);
for(var H=0;
H<E.length;
H++){dojo._destroyElement(E[H])
}if(!dojo.isArray(F)){G.appendChild(F)
}else{for(var H=0;
H<F.length;
H++){G.appendChild(F[H])
}}};
dojox.data.dom.removeChildren=function(D){var C=D.childNodes.length;
while(D.hasChildNodes()){D.removeChild(D.firstChild)
}return C
};
dojox.data.dom.innerXML=function(B){if(B.innerXML){return B.innerXML
}else{if(B.xml){return B.xml
}else{if(typeof XMLSerializer!="undefined"){return(new XMLSerializer()).serializeToString(B)
}}}}
};