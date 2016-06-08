if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.require("dijit._Widget");
dojo.require("dojo.string");
dojo.require("dojo.parser");
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var L=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var K;
if(dojo.isString(L)){var M=this.declaredClass,I=this;
var H=dojo.string.substitute(L,this,function(A,B){if(B.charAt(0)=="!"){A=I[B.substr(1)]
}if(typeof A=="undefined"){throw new Error(M+" template:"+B)
}if(!A){return""
}return B.charAt(0)=="!"?A:A.toString().replace(/"/g,"&quot;")
},this);
K=dijit._Templated._createNodesFromText(H)[0]
}else{K=L.cloneNode(true)
}this._attachTemplateNodes(K);
var J=this.srcNodeRef;
if(J&&J.parentNode){J.parentNode.replaceChild(K,J)
}this.domNode=K;
if(this.widgetsInTemplate){var N=dojo.parser.parse(K);
this._attachTemplateNodes(N,function(A,B){return A[B]
})
}this._fillContent(J)
},_fillContent:function(D){var C=this.containerNode;
if(D&&C){while(D.hasChildNodes()){C.appendChild(D.firstChild)
}}},_attachTemplateNodes:function(Q,d){d=d||function(A,B){return A.getAttribute(B)
};
var S=dojo.isArray(Q)?Q:(Q.all||Q.getElementsByTagName("*"));
var Z=dojo.isArray(Q)?0:-1;
for(;
Z<S.length;
Z++){var R=(Z==-1)?Q:S[Z];
if(this.widgetsInTemplate&&d(R,"dojoType")){continue
}var f=d(R,"dojoAttachPoint");
if(f){var Y,W=f.split(/\s*,\s*/);
while(Y=W.shift()){if(dojo.isArray(this[Y])){this[Y].push(R)
}else{this[Y]=R
}}}var a=d(R,"dojoAttachEvent");
if(a){var T,V=a.split(/\s*,\s*/);
var e=dojo.trim;
while(T=V.shift()){if(T){var c=null;
if(T.indexOf(":")!=-1){var U=T.split(":");
T=e(U[0]);
c=e(U[1])
}else{T=e(T)
}if(!c){c=T
}this.connect(R,T,c)
}}}var b=d(R,"waiRole");
if(b){dijit.setWaiRole(R,b)
}var X=d(R,"waiState");
if(X){dojo.forEach(X.split(/\s*,\s*/),function(A){if(A.indexOf("-")!=-1){var B=A.split("-");
dijit.setWaiState(R,B[0],B[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(K,J,H){var I=dijit._Templated._templateCache;
var G=J||K;
var L=I[G];
if(L){return L
}if(!J){J=dijit._Templated._sanitizeTemplateString(dojo._getText(K))
}J=dojo.string.trim(J);
if(J.match(/\$\{([^\}]+)\}/g)||H){return(I[G]=J)
}else{return(I[G]=dijit._Templated._createNodesFromText(J)[0])
}};
dijit._Templated._sanitizeTemplateString=function(C){if(C){C=C.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var D=C.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(D){C=D[1]
}}else{C=""
}return C
};
if(dojo.isIE){dojo.addOnUnload(function(){var D=dijit._Templated._templateCache;
for(var F in D){var E=D[F];
if(!isNaN(E.nodeType)){dojo._destroyElement(E)
}delete D[F]
}})
}(function(){var D={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var C;
dijit._Templated._createNodesFromText=function(A){if(!C){C=dojo.doc.createElement("div");
C.style.display="none";
dojo.body().appendChild(C)
}var M="none";
var O=A.replace(/^\s+/,"");
for(var L in D){var K=D[L];
if(K.re.test(O)){M=L;
A=K.pre+A+K.post;
break
}}C.innerHTML=A;
if(C.normalize){C.normalize()
}var P={cell:"tr",row:"tbody",section:"table"}[M];
var B=(typeof P!="undefined")?C.getElementsByTagName(P)[0]:C;
var N=[];
while(B.firstChild){N.push(B.removeChild(B.firstChild))
}C.innerHTML="";
return N
}
})();
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
};