if(!dojo._hasResource["dojox.io.proxy.xip"]){dojo._hasResource["dojox.io.proxy.xip"]=true;
dojo.provide("dojox.io.proxy.xip");
dojo.require("dojo.io.iframe");
dojo.require("dojox.data.dom");
dojox.io.proxy.xip={xipClientUrl:djConfig.xipClientUrl||dojo.moduleUrl("dojox.io.proxy","xip_client.html"),_state:{},_stateIdCounter:0,needFrameRecursion:function(){return(dojo.isIE>=7)
},send:function(J){var H="XhrIframeProxy"+(this._stateIdCounter++);
J._stateId=H;
var L=this.xipClientUrl+"#0:init:id="+H+"&server="+encodeURIComponent(J._ifpServerUrl)+"&fr=false";
if(this.needFrameRecursion()){var K=window.location.href.split("#")[0].split("?")[0];
if((this.xipClientUrl+"").charAt(0)=="/"){var I=K.indexOf("://");
I=K.indexOf("/",I+3);
K=K.substring(0,I)
}else{K=K.substring(0,K.lastIndexOf("/")+1)
}K+=this.xipClientUrl;
var G=J._ifpServerUrl+(J._ifpServerUrl.indexOf("?")==-1?"?":"&")+"dojo.fr=1";
L=G+"#0:init:id="+H+"&client="+encodeURIComponent(K)+"&fr="+this.needFrameRecursion()
}this._state[H]={facade:J,stateId:H,clientFrame:dojo.io.iframe.create(H,"",L)};
return H
},receive:function(J,P){var L={};
var O=P.split("&");
for(var K=0;
K<O.length;
K++){if(O[K]){var Q=O[K].split("=");
L[decodeURIComponent(Q[0])]=decodeURIComponent(Q[1])
}}var M=this._state[J];
var N=M.facade;
N._setResponseHeaders(L.responseHeaders);
if(L.status==0||L.status){N.status=parseInt(L.status,10)
}if(L.statusText){N.statusText=L.statusText
}if(L.responseText){N.responseText=L.responseText;
var R=N.getResponseHeader("Content-Type");
if(R&&(R=="application/xml"||R=="text/xml")){N.responseXML=dojox.data.dom.createDocument(L.responseText,R)
}}N.readyState=4;
this.destroyState(J)
},clientFrameLoaded:function(I){var M=this._state[I];
var N=M.facade;
if(this.needFrameRecursion()){var L=window.open("",M.stateId+"_clientEndPoint")
}else{var L=M.clientFrame.contentWindow
}var J=[];
for(var K in N._requestHeaders){J.push(K+": "+N._requestHeaders[K])
}var H={uri:N._uri};
if(J.length>0){H.requestHeaders=J.join("\r\n")
}if(N._method){H.method=N._method
}if(N._bodyData){H.data=N._bodyData
}L.send(dojo.objectToQuery(H))
},destroyState:function(E){var F=this._state[E];
if(F){delete this._state[E];
var D=F.clientFrame.parentNode;
D.removeChild(F.clientFrame);
F.clientFrame=null;
F=null
}},createFacade:function(){if(arguments&&arguments[0]&&arguments[0].iframeProxyUrl){return new dojox.io.proxy.xip.XhrIframeFacade(arguments[0].iframeProxyUrl)
}else{return dojox.io.proxy.xip._xhrObjOld.apply(dojo,arguments)
}}};
dojox.io.proxy.xip._xhrObjOld=dojo._xhrObj;
dojo._xhrObj=dojox.io.proxy.xip.createFacade;
dojox.io.proxy.xip.XhrIframeFacade=function(B){this._requestHeaders={};
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
this._ifpServerUrl=B;
this._stateId=null
};
dojo.extend(dojox.io.proxy.xip.XhrIframeFacade,{open:function(D,C){this._method=D;
this._uri=C;
this.readyState=1
},setRequestHeader:function(D,C){this._requestHeaders[D]=C
},send:function(B){this._bodyData=B;
this._stateId=dojox.io.proxy.xip.send(this);
this.readyState=2
},abort:function(){dojox.io.proxy.xip.destroyState(this._stateId)
},getAllResponseHeaders:function(){return this._allResponseHeaders
},getResponseHeader:function(B){return this._responseHeaders[B]
},_setResponseHeaders:function(F){if(F){this._allResponseHeaders=F;
F=F.replace(/\r/g,"");
var H=F.split("\n");
for(var G=0;
G<H.length;
G++){if(H[G]){var E=H[G].split(": ");
this._responseHeaders[E[0]]=E[1]
}}}}})
};