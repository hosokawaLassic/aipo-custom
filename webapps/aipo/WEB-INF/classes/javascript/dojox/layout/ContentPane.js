if(!dojo._hasResource["dojox.layout.ContentPane"]){dojo._hasResource["dojox.layout.ContentPane"]=true;
dojo.provide("dojox.layout.ContentPane");
dojo.require("dijit.layout.ContentPane");
(function(){if(dojo.isIE){var R=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g
}var J=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
function L(A,B){if(!B||!A){return 
}if(R){B=B.replace(R,function(D,F,E,C,G){return F+(new dojo._Url(A,"./"+C).toString())+G
})
}return B.replace(J,function(D,E,F,H,C,G){if(F){return'@import "'+(new dojo._Url(A,"./"+F).toString())+'"'+G
}else{return"url("+(new dojo._Url(A,"./"+C).toString())+")"+G
}})
}var K=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
function M(A,C){var B=A||"./";
return C.replace(K,function(V,D,I,E,H,F,G,U){return D+(I?(I+"="+E+(new dojo._Url(B,H).toString())+E):("style="+F+L(B,G)+F))+U
})
}function Q(A){return A.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"")
}function O(B,C,A){A.attributes=[];
return C.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(G,E,b,D,c,d){var Y,H=(E||D||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(b){Y=A.push(B?L(B,b):b)
}else{Y=A.push('@import "'+d+'";');
H=H.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"")
}if(H){H=H.split(/\s+/);
var F={},Z;
for(var a=0,I=H.length;
a<I;
a++){Z=H[a].split("=");
F[Z[0]]=Z[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1")
}A.attributes[Y-1]=F
}return""
})
}function P(C,A){A.code="";
function B(D){if(A.downloadRemote){dojo.xhrGet({url:D,sync:true,load:function(E){A.code+=E+";"
},error:A.errBack})
}}return C.replace(/<script\s*(?![^>]*type=['"]?dojo)(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(D,E,F,G){if(F){B(F)
}else{A.code+=G
}return""
})
}function N(B,C){C=C||dojo.doc.body;
var A=C.ownerDocument.createElement("script");
A.type="text/javascript";
C.appendChild(A);
A.text=B
}dojo.declare("dojox.layout.ContentPane",dijit.layout.ContentPane,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){this.ioArgs={};
this.ioMethod=dojo.xhrGet;
this.onLoadDeferred=new dojo.Deferred();
this.onUnloadDeferred=new dojo.Deferred()
},postCreate:function(){this._setUpDeferreds();
dijit.layout.ContentPane.prototype.postCreate.apply(this,arguments)
},onExecError:function(A){},setContent:function(B){if(!this._isDownloaded){var A=this._setUpDeferreds()
}dijit.layout.ContentPane.prototype.setContent.apply(this,arguments);
return A
},cancel:function(){if(this._xhrDfd&&this._xhrDfd.fired==-1){this.onUnloadDeferred=null
}dijit.layout.ContentPane.prototype.cancel.apply(this,arguments)
},_setUpDeferreds:function(){var D=this,A=function(){D.cancel()
};
var B=(D.onLoadDeferred=new dojo.Deferred());
var C=(D._nextUnloadDeferred=new dojo.Deferred());
return{cancel:A,addOnLoad:function(E){B.addCallback(E)
},addOnUnload:function(E){C.addCallback(E)
}}
},_onLoadHandler:function(){dijit.layout.ContentPane.prototype._onLoadHandler.apply(this,arguments);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
if(this.onUnloadDeferred){this.onUnloadDeferred.callback(true)
}dijit.layout.ContentPane.prototype._onUnloadHandler.apply(this,arguments);
if(this._nextUnloadDeferred){this.onUnloadDeferred=this._nextUnloadDeferred
}},_onError:function(B,A){dijit.layout.ContentPane.prototype._onError.apply(this,arguments);
if(this.onLoadDeferred){this.onLoadDeferred.errback(A)
}},_prepareLoad:function(A){var B=this._setUpDeferreds();
dijit.layout.ContentPane.prototype._prepareLoad.apply(this,arguments);
return B
},_setContent:function(A){var B=[];
if(dojo.isString(A)){if(this.adjustPaths&&this.href){A=M(this.href,A)
}if(this.cleanContent){A=Q(A)
}if(this.renderStyles||this.cleanContent){A=O(this.href,A,B)
}if(this.executeScripts){var C=this,T,I={downloadRemote:true,errBack:function(S){C._onError.call(C,"Exec",'Error downloading remote script in "'+C.id+'"',S)
}};
A=P(A,I);
T=I.code
}var G=(this.containerNode||this.domNode),F=post="",D=0;
switch(name=G.nodeName.toLowerCase()){case"tr":F="<tr>";
post="</tr>";
D+=1;
case"tbody":case"thead":F="<tbody>"+F;
post+="</tbody>";
D+=1;
case"table":F="<table>"+F;
post+="</table>";
D+=1;
break
}if(D){var H=G.ownerDocument.createElement("div");
H.innerHTML=F+A+post;
do{H=H.firstChild
}while(--D);
A=H.childNodes
}}dijit.layout.ContentPane.prototype._setContent.call(this,A);
if(this._styleNodes&&this._styleNodes.length){while(this._styleNodes.length){dojo._destroyElement(this._styleNodes.pop())
}}if(this.renderStyles&&B&&B.length){this._renderStyles(B)
}if(this.executeScripts&&T){if(this.cleanContent){T=T.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"")
}if(this.scriptHasHooks){T=T.replace(/_container_(?!\s*=[^=])/g,"dijit.byId('"+this.id+"')")
}try{N(T,(this.containerNode||this.domNode))
}catch(E){this._onError("Exec","Error eval script in "+this.id+", "+E.message,E)
}}},_renderStyles:function(B){this._styleNodes=[];
var A,F,I,C=this.domNode.ownerDocument;
var E=C.getElementsByTagName("head")[0];
for(var H=0,G=B.length;
H<G;
H++){I=B[H];
F=B.attributes[H];
A=C.createElement("style");
A.setAttribute("type","text/css");
for(var D in F){A.setAttribute(D,F[D])
}this._styleNodes.push(A);
E.appendChild(A);
if(A.styleSheet){A.styleSheet.cssText=I
}else{A.appendChild(C.createTextNode(I))
}}}})
})()
};