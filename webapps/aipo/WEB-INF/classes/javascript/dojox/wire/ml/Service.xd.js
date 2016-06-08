dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Service"],["provide","dojox.wire.ml.RestHandler"],["provide","dojox.wire.ml.XmlHandler"],["provide","dojox.wire.ml.JsonHandler"],["require","dijit._Widget"],["require","dojox.data.dom"],["require","dojox.wire._base"],["require","dojox.wire.ml.util"]],defineResource:function(B){if(!B._hasResource["dojox.wire.ml.Service"]){B._hasResource["dojox.wire.ml.Service"]=true;
B.provide("dojox.wire.ml.Service");
B.provide("dojox.wire.ml.RestHandler");
B.provide("dojox.wire.ml.XmlHandler");
B.provide("dojox.wire.ml.JsonHandler");
B.require("dijit._Widget");
B.require("dojox.data.dom");
B.require("dojox.wire._base");
B.require("dojox.wire.ml.util");
B.declare("dojox.wire.ml.Service",dijit._Widget,{url:"",serviceUrl:"",serviceType:"",handlerClass:"",preventCache:true,postCreate:function(){this.handler=this._createHandler()
},_handlerClasses:{TEXT:"dojox.wire.ml.RestHandler",XML:"dojox.wire.ml.XmlHandler",JSON:"dojox.wire.ml.JsonHandler","JSON-RPC":"dojo.rpc.JsonService"},_createHandler:function(){if(this.url){var F=this;
var A=B.xhrGet({url:this.url,handleAs:"json",sync:true});
A.addCallback(function(C){F.smd=C
});
if(this.smd&&!this.serviceUrl){this.serviceUrl=(this.smd.serviceUrl||this.smd.serviceURL)
}}var E=undefined;
if(this.handlerClass){E=dojox.wire._getClass(this.handlerClass)
}else{if(this.serviceType){E=this._handlerClasses[this.serviceType];
if(E&&B.isString(E)){E=dojox.wire._getClass(E);
this._handlerClasses[this.serviceType]=E
}}else{if(this.smd&&this.smd.serviceType){E=this._handlerClasses[this.smd.serviceType];
if(E&&B.isString(E)){E=dojox.wire._getClass(E);
this._handlerClasses[this.smd.serviceType]=E
}}}}if(!E){return null
}return new E()
},callMethod:function(A,E){var F=new B.Deferred();
this.handler.bind(A,E,F,this.serviceUrl);
return F
}});
B.declare("dojox.wire.ml.RestHandler",null,{contentType:"text/plain",handleAs:"text",bind:function(A,J,M,K){A=A.toUpperCase();
var N=this;
var L={url:this._getUrl(A,J,K),contentType:this.contentType,handleAs:this.handleAs,headers:this.headers,preventCache:this.preventCache};
var I=null;
if(A=="POST"){L.postData=this._getContent(A,J);
I=B.rawXhrPost(L)
}else{if(A=="PUT"){L.putData=this._getContent(A,J);
I=B.rawXhrPut(L)
}else{if(A=="DELETE"){I=B.xhrDelete(L)
}else{I=B.xhrGet(L)
}}}I.addCallbacks(function(C){M.callback(N._getResult(C))
},function(C){M.errback(C)
})
},_getUrl:function(L,M,A){if(L=="GET"||L=="DELETE"){var O=M[0];
var K="";
for(var R in O){var N=O[R];
if(N){N=encodeURIComponent(N);
var Q="{"+R+"}";
var P=A.indexOf(Q);
if(P>=0){A=A.substring(0,P)+N+A.substring(P+Q.length)
}else{if(K){K+="&"
}K+=(R+"="+N)
}}}if(K){A+="?"+K
}}return A
},_getContent:function(A,D){if(A=="POST"||A=="PUT"){return(D?D[0]:null)
}else{return null
}},_getResult:function(A){return A
}});
B.declare("dojox.wire.ml.XmlHandler",dojox.wire.ml.RestHandler,{contentType:"text/xml",handleAs:"xml",_getContent:function(A,J){var K=null;
if(A=="POST"||A=="PUT"){var I=J[0];
if(I){if(B.isString(I)){K=I
}else{var L=I;
if(L instanceof dojox.wire.ml.XmlElement){L=L.element
}else{if(L.nodeType===9){L=L.documentElement
}}var H='<?xml version="1.0"?>';
K=H+dojox.data.dom.innerXML(L)
}}}return K
},_getResult:function(A){if(A){A=new dojox.wire.ml.XmlElement(A)
}return A
}});
B.declare("dojox.wire.ml.JsonHandler",dojox.wire.ml.RestHandler,{contentType:"text/json",handleAs:"json",headers:{Accept:"*/json"},_getContent:function(A,G){var H=null;
if(A=="POST"||A=="PUT"){var F=(G?G[0]:undefined);
if(F){if(B.isString(F)){H=F
}else{H=B.toJson(F)
}}}return H
}})
}}});