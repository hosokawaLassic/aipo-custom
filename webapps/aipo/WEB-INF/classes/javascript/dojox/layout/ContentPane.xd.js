dojo._xdResourceLoaded({depends:[["provide","dojox.layout.ContentPane"],["require","dijit.layout.ContentPane"]],defineResource:function(B){if(!B._hasResource["dojox.layout.ContentPane"]){B._hasResource["dojox.layout.ContentPane"]=true;
B.provide("dojox.layout.ContentPane");
B.require("dijit.layout.ContentPane");
(function(){if(B.isIE){var Q=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g
}var R=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
function K(C,D){if(!D||!C){return 
}if(Q){D=D.replace(Q,function(E,G,F,I,H){return G+(new B._Url(C,"./"+I).toString())+H
})
}return D.replace(R,function(E,F,G,I,J,H){if(G){return'@import "'+(new B._Url(C,"./"+G).toString())+'"'+H
}else{return"url("+(new B._Url(C,"./"+J).toString())+")"+H
}})
}var A=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
function L(E,D){var C=E||"./";
return D.replace(A,function(X,F,V,G,J,H,I,W){return F+(V?(V+"="+G+(new B._Url(C,J).toString())+G):("style="+H+K(C,I)+H))+W
})
}function P(C){return C.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"")
}function N(C,D,E){E.attributes=[];
return D.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(I,G,d,F,e,f){var a,J=(G||F||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(d){a=E.push(C?K(C,d):d)
}else{a=E.push('@import "'+f+'";');
J=J.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"")
}if(J){J=J.split(/\s+/);
var H={},b;
for(var c=0,Z=J.length;
c<Z;
c++){b=J[c].split("=");
H[b[0]]=b[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1")
}E.attributes[a-1]=H
}return""
})
}function O(D,E){E.code="";
function C(F){if(E.downloadRemote){B.xhrGet({url:F,sync:true,load:function(G){E.code+=G+";"
},error:E.errBack})
}}return D.replace(/<script\s*(?![^>]*type=['"]?dojo)(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(F,G,H,I){if(H){C(H)
}else{E.code+=I
}return""
})
}function M(C,D){D=D||B.doc.body;
var E=D.ownerDocument.createElement("script");
E.type="text/javascript";
D.appendChild(E);
E.text=C
}B.declare("dojox.layout.ContentPane",dijit.layout.ContentPane,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){this.ioArgs={};
this.ioMethod=B.xhrGet;
this.onLoadDeferred=new B.Deferred();
this.onUnloadDeferred=new B.Deferred()
},postCreate:function(){this._setUpDeferreds();
dijit.layout.ContentPane.prototype.postCreate.apply(this,arguments)
},onExecError:function(C){},setContent:function(D){if(!this._isDownloaded){var C=this._setUpDeferreds()
}dijit.layout.ContentPane.prototype.setContent.apply(this,arguments);
return C
},cancel:function(){if(this._xhrDfd&&this._xhrDfd.fired==-1){this.onUnloadDeferred=null
}dijit.layout.ContentPane.prototype.cancel.apply(this,arguments)
},_setUpDeferreds:function(){var E=this,F=function(){E.cancel()
};
var C=(E.onLoadDeferred=new B.Deferred());
var D=(E._nextUnloadDeferred=new B.Deferred());
return{cancel:F,addOnLoad:function(G){C.addCallback(G)
},addOnUnload:function(G){D.addCallback(G)
}}
},_onLoadHandler:function(){dijit.layout.ContentPane.prototype._onLoadHandler.apply(this,arguments);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
if(this.onUnloadDeferred){this.onUnloadDeferred.callback(true)
}dijit.layout.ContentPane.prototype._onUnloadHandler.apply(this,arguments);
if(this._nextUnloadDeferred){this.onUnloadDeferred=this._nextUnloadDeferred
}},_onError:function(D,C){dijit.layout.ContentPane.prototype._onError.apply(this,arguments);
if(this.onLoadDeferred){this.onLoadDeferred.errback(C)
}},_prepareLoad:function(C){var D=this._setUpDeferreds();
dijit.layout.ContentPane.prototype._prepareLoad.apply(this,arguments);
return D
},_setContent:function(C){var D=[];
if(B.isString(C)){if(this.adjustPaths&&this.href){C=L(this.href,C)
}if(this.cleanContent){C=P(C)
}if(this.renderStyles||this.cleanContent){C=N(this.href,C,D)
}if(this.executeScripts){var E=this,V,U={downloadRemote:true,errBack:function(S){E._onError.call(E,"Exec",'Error downloading remote script in "'+E.id+'"',S)
}};
C=O(C,U);
V=U.code
}var I=(this.containerNode||this.domNode),H=post="",F=0;
switch(name=I.nodeName.toLowerCase()){case"tr":H="<tr>";
post="</tr>";
F+=1;
case"tbody":case"thead":H="<tbody>"+H;
post+="</tbody>";
F+=1;
case"table":H="<table>"+H;
post+="</table>";
F+=1;
break
}if(F){var J=I.ownerDocument.createElement("div");
J.innerHTML=H+C+post;
do{J=J.firstChild
}while(--F);
C=J.childNodes
}}dijit.layout.ContentPane.prototype._setContent.call(this,C);
if(this._styleNodes&&this._styleNodes.length){while(this._styleNodes.length){B._destroyElement(this._styleNodes.pop())
}}if(this.renderStyles&&D&&D.length){this._renderStyles(D)
}if(this.executeScripts&&V){if(this.cleanContent){V=V.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"")
}if(this.scriptHasHooks){V=V.replace(/_container_(?!\s*=[^=])/g,"dijit.byId('"+this.id+"')")
}try{M(V,(this.containerNode||this.domNode))
}catch(G){this._onError("Exec","Error eval script in "+this.id+", "+G.message,G)
}}},_renderStyles:function(D){this._styleNodes=[];
var C,H,T,E=this.domNode.ownerDocument;
var G=E.getElementsByTagName("head")[0];
for(var J=0,I=D.length;
J<I;
J++){T=D[J];
H=D.attributes[J];
C=E.createElement("style");
C.setAttribute("type","text/css");
for(var F in H){C.setAttribute(F,H[F])
}this._styleNodes.push(C);
G.appendChild(C);
if(C.styleSheet){C.styleSheet.cssText=T
}else{C.appendChild(E.createTextNode(T))
}}}})
})()
}}});