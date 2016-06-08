if(!dojo._hasResource["dojox.wire.ml.Service"]){dojo._hasResource["dojox.wire.ml.Service"]=true;
dojo.provide("dojox.wire.ml.Service");
dojo.provide("dojox.wire.ml.RestHandler");
dojo.provide("dojox.wire.ml.XmlHandler");
dojo.provide("dojox.wire.ml.JsonHandler");
dojo.require("dijit._Widget");
dojo.require("dojox.data.dom");
dojo.require("dojox.wire._base");
dojo.require("dojox.wire.ml.util");
dojo.declare("dojox.wire.ml.Service",dijit._Widget,{url:"",serviceUrl:"",serviceType:"",handlerClass:"",preventCache:true,postCreate:function(){this.handler=this._createHandler()
},_handlerClasses:{TEXT:"dojox.wire.ml.RestHandler",XML:"dojox.wire.ml.XmlHandler",JSON:"dojox.wire.ml.JsonHandler","JSON-RPC":"dojo.rpc.JsonService"},_createHandler:function(){if(this.url){var D=this;
var E=dojo.xhrGet({url:this.url,handleAs:"json",sync:true});
E.addCallback(function(A){D.smd=A
});
if(this.smd&&!this.serviceUrl){this.serviceUrl=(this.smd.serviceUrl||this.smd.serviceURL)
}}var F=undefined;
if(this.handlerClass){F=dojox.wire._getClass(this.handlerClass)
}else{if(this.serviceType){F=this._handlerClasses[this.serviceType];
if(F&&dojo.isString(F)){F=dojox.wire._getClass(F);
this._handlerClasses[this.serviceType]=F
}}else{if(this.smd&&this.smd.serviceType){F=this._handlerClasses[this.smd.serviceType];
if(F&&dojo.isString(F)){F=dojox.wire._getClass(F);
this._handlerClasses[this.smd.serviceType]=F
}}}}if(!F){return null
}return new F()
},callMethod:function(E,F){var D=new dojo.Deferred();
this.handler.bind(E,F,D,this.serviceUrl);
return D
}});
dojo.declare("dojox.wire.ml.RestHandler",null,{contentType:"text/plain",handleAs:"text",bind:function(I,K,N,L){I=I.toUpperCase();
var H=this;
var M={url:this._getUrl(I,K,L),contentType:this.contentType,handleAs:this.handleAs,headers:this.headers,preventCache:this.preventCache};
var J=null;
if(I=="POST"){M.postData=this._getContent(I,K);
J=dojo.rawXhrPost(M)
}else{if(I=="PUT"){M.putData=this._getContent(I,K);
J=dojo.rawXhrPut(M)
}else{if(I=="DELETE"){J=dojo.xhrDelete(M)
}else{J=dojo.xhrGet(M)
}}}J.addCallbacks(function(A){N.callback(H._getResult(A))
},function(A){N.errback(A)
})
},_getUrl:function(M,N,K){if(M=="GET"||M=="DELETE"){var P=N[0];
var L="";
for(var J in P){var O=P[J];
if(O){O=encodeURIComponent(O);
var R="{"+J+"}";
var Q=K.indexOf(R);
if(Q>=0){K=K.substring(0,Q)+O+K.substring(Q+R.length)
}else{if(L){L+="&"
}L+=(J+"="+O)
}}}if(L){K+="?"+L
}}return K
},_getContent:function(D,C){if(D=="POST"||D=="PUT"){return(C?C[0]:null)
}else{return null
}},_getResult:function(B){return B
}});
dojo.declare("dojox.wire.ml.XmlHandler",dojox.wire.ml.RestHandler,{contentType:"text/xml",handleAs:"xml",_getContent:function(H,K){var L=null;
if(H=="POST"||H=="PUT"){var J=K[0];
if(J){if(dojo.isString(J)){L=J
}else{var G=J;
if(G instanceof dojox.wire.ml.XmlElement){G=G.element
}else{if(G.nodeType===9){G=G.documentElement
}}var I='<?xml version="1.0"?>';
L=I+dojox.data.dom.innerXML(G)
}}}return L
},_getResult:function(B){if(B){B=new dojox.wire.ml.XmlElement(B)
}return B
}});
dojo.declare("dojox.wire.ml.JsonHandler",dojox.wire.ml.RestHandler,{contentType:"text/json",handleAs:"json",headers:{Accept:"*/json"},_getContent:function(F,H){var E=null;
if(F=="POST"||F=="PUT"){var G=(H?H[0]:undefined);
if(G){if(dojo.isString(G)){E=G
}else{E=dojo.toJson(G)
}}}return E
}})
};