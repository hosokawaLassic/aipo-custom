dojo._xdResourceLoaded({depends:[["provide","dijit._Templated"],["require","dijit._Widget"],["require","dojo.string"],["require","dojo.parser"]],defineResource:function(B){if(!B._hasResource["dijit._Templated"]){B._hasResource["dijit._Templated"]=true;
B.provide("dijit._Templated");
B.require("dijit._Widget");
B.require("dojo.string");
B.require("dojo.parser");
B.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var K=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var J;
if(B.isString(K)){var L=this.declaredClass,A=this;
var N=B.string.substitute(K,this,function(C,D){if(D.charAt(0)=="!"){C=A[D.substr(1)]
}if(typeof C=="undefined"){throw new Error(L+" template:"+D)
}if(!C){return""
}return D.charAt(0)=="!"?C:C.toString().replace(/"/g,"&quot;")
},this);
J=dijit._Templated._createNodesFromText(N)[0]
}else{J=K.cloneNode(true)
}this._attachTemplateNodes(J);
var I=this.srcNodeRef;
if(I&&I.parentNode){I.parentNode.replaceChild(J,I)
}this.domNode=J;
if(this.widgetsInTemplate){var M=B.parser.parse(J);
this._attachTemplateNodes(M,function(C,D){return C[D]
})
}this._fillContent(I)
},_fillContent:function(A){var D=this.containerNode;
if(A&&D){while(A.hasChildNodes()){D.appendChild(A.firstChild)
}}},_attachTemplateNodes:function(f,c){c=c||function(C,D){return C.getAttribute(D)
};
var R=B.isArray(f)?f:(f.all||f.getElementsByTagName("*"));
var Y=B.isArray(f)?0:-1;
for(;
Y<R.length;
Y++){var A=(Y==-1)?f:R[Y];
if(this.widgetsInTemplate&&c(A,"dojoType")){continue
}var e=c(A,"dojoAttachPoint");
if(e){var X,V=e.split(/\s*,\s*/);
while(X=V.shift()){if(B.isArray(this[X])){this[X].push(A)
}else{this[X]=A
}}}var Z=c(A,"dojoAttachEvent");
if(Z){var S,U=Z.split(/\s*,\s*/);
var d=B.trim;
while(S=U.shift()){if(S){var b=null;
if(S.indexOf(":")!=-1){var T=S.split(":");
S=d(T[0]);
b=d(T[1])
}else{S=d(S)
}if(!b){b=S
}this.connect(A,S,b)
}}}var a=c(A,"waiRole");
if(a){dijit.setWaiRole(A,a)
}var W=c(A,"waiState");
if(W){B.forEach(W.split(/\s*,\s*/),function(C){if(C.indexOf("-")!=-1){var D=C.split("-");
dijit.setWaiState(A,D[0],D[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(J,I,A){var H=dijit._Templated._templateCache;
var L=I||J;
var K=H[L];
if(K){return K
}if(!I){I=dijit._Templated._sanitizeTemplateString(B._getText(J))
}I=B.string.trim(I);
if(I.match(/\$\{([^\}]+)\}/g)||A){return(H[L]=I)
}else{return(H[L]=dijit._Templated._createNodesFromText(I)[0])
}};
dijit._Templated._sanitizeTemplateString=function(D){if(D){D=D.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var A=D.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(A){D=A[1]
}}else{D=""
}return D
};
if(B.isIE){B.addOnUnload(function(){var F=dijit._Templated._templateCache;
for(var E in F){var A=F[E];
if(!isNaN(A.nodeType)){B._destroyElement(A)
}delete F[E]
}})
}(function(){var A={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var D;
dijit._Templated._createNodesFromText=function(C){if(!D){D=B.doc.createElement("div");
D.style.display="none";
B.body().appendChild(D)
}var O="none";
var Q=C.replace(/^\s+/,"");
for(var N in A){var M=A[N];
if(M.re.test(Q)){O=N;
C=M.pre+C+M.post;
break
}}D.innerHTML=C;
if(D.normalize){D.normalize()
}var R={cell:"tr",row:"tbody",section:"table"}[O];
var L=(typeof R!="undefined")?D.getElementsByTagName(R)[0]:D;
var P=[];
while(L.firstChild){P.push(L.removeChild(L.firstChild))
}D.innerHTML="";
return P
}
})();
B.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}}});