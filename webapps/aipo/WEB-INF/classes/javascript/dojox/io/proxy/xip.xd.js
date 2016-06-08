dojo._xdResourceLoaded({depends:[["provide","dojox.io.proxy.xip"],["require","dojo.io.iframe"],["require","dojox.data.dom"]],defineResource:function(B){if(!B._hasResource["dojox.io.proxy.xip"]){B._hasResource["dojox.io.proxy.xip"]=true;
B.provide("dojox.io.proxy.xip");
B.require("dojo.io.iframe");
B.require("dojox.data.dom");
dojox.io.proxy.xip={xipClientUrl:djConfig.xipClientUrl||B.moduleUrl("dojox.io.proxy","xip_client.html"),_state:{},_stateIdCounter:0,needFrameRecursion:function(){return(B.isIE>=7)
},send:function(I){var A="XhrIframeProxy"+(this._stateIdCounter++);
I._stateId=A;
var K=this.xipClientUrl+"#0:init:id="+A+"&server="+encodeURIComponent(I._ifpServerUrl)+"&fr=false";
if(this.needFrameRecursion()){var J=window.location.href.split("#")[0].split("?")[0];
if((this.xipClientUrl+"").charAt(0)=="/"){var H=J.indexOf("://");
H=J.indexOf("/",H+3);
J=J.substring(0,H)
}else{J=J.substring(0,J.lastIndexOf("/")+1)
}J+=this.xipClientUrl;
var L=I._ifpServerUrl+(I._ifpServerUrl.indexOf("?")==-1?"?":"&")+"dojo.fr=1";
K=L+"#0:init:id="+A+"&client="+encodeURIComponent(J)+"&fr="+this.needFrameRecursion()
}this._state[A]={facade:I,stateId:A,clientFrame:B.io.iframe.create(A,"",K)};
return A
},receive:function(R,O){var K={};
var N=O.split("&");
for(var A=0;
A<N.length;
A++){if(N[A]){var P=N[A].split("=");
K[decodeURIComponent(P[0])]=decodeURIComponent(P[1])
}}var L=this._state[R];
var M=L.facade;
M._setResponseHeaders(K.responseHeaders);
if(K.status==0||K.status){M.status=parseInt(K.status,10)
}if(K.statusText){M.statusText=K.statusText
}if(K.responseText){M.responseText=K.responseText;
var Q=M.getResponseHeader("Content-Type");
if(Q&&(Q=="application/xml"||Q=="text/xml")){M.responseXML=dojox.data.dom.createDocument(K.responseText,Q)
}}M.readyState=4;
this.destroyState(R)
},clientFrameLoaded:function(A){var L=this._state[A];
var M=L.facade;
if(this.needFrameRecursion()){var K=window.open("",L.stateId+"_clientEndPoint")
}else{var K=L.clientFrame.contentWindow
}var I=[];
for(var J in M._requestHeaders){I.push(J+": "+M._requestHeaders[J])
}var N={uri:M._uri};
if(I.length>0){N.requestHeaders=I.join("\r\n")
}if(M._method){N.method=M._method
}if(M._bodyData){N.data=M._bodyData
}K.send(B.objectToQuery(N))
},destroyState:function(A){var E=this._state[A];
if(E){delete this._state[A];
var F=E.clientFrame.parentNode;
F.removeChild(E.clientFrame);
E.clientFrame=null;
E=null
}},createFacade:function(){if(arguments&&arguments[0]&&arguments[0].iframeProxyUrl){return new dojox.io.proxy.xip.XhrIframeFacade(arguments[0].iframeProxyUrl)
}else{return dojox.io.proxy.xip._xhrObjOld.apply(B,arguments)
}}};
dojox.io.proxy.xip._xhrObjOld=B._xhrObj;
B._xhrObj=dojox.io.proxy.xip.createFacade;
dojox.io.proxy.xip.XhrIframeFacade=function(A){this._requestHeaders={};
this._allResponseHeaders=null;
this._responseHeaders={};
this._method=null;
this._uri=null;
this._bodyData=null;
this.responseText=null;
this.responseXML=null;
this.status=null;
this.statusText=null;
this.readyState=0;
this._ifpServerUrl=A;
this._stateId=null
};
B.extend(dojox.io.proxy.xip.XhrIframeFacade,{open:function(A,D){this._method=A;
this._uri=D;
this.readyState=1
},setRequestHeader:function(A,D){this._requestHeaders[A]=D
},send:function(A){this._bodyData=A;
this._stateId=dojox.io.proxy.xip.send(this);
this.readyState=2
},abort:function(){dojox.io.proxy.xip.destroyState(this._stateId)
},getAllResponseHeaders:function(){return this._allResponseHeaders
},getResponseHeader:function(A){return this._responseHeaders[A]
},_setResponseHeaders:function(A){if(A){this._allResponseHeaders=A;
A=A.replace(/\r/g,"");
var G=A.split("\n");
for(var F=0;
F<G.length;
F++){if(G[F]){var H=G[F].split(": ");
this._responseHeaders[H[0]]=H[1]
}}}}})
}}});