dojo._xdResourceLoaded({depends:[["provide","dojo.rpc.JsonpService"],["require","dojo.rpc.RpcService"],["require","dojo.io.script"]],defineResource:function(B){if(!B._hasResource["dojo.rpc.JsonpService"]){B._hasResource["dojo.rpc.JsonpService"]=true;
B.provide("dojo.rpc.JsonpService");
B.require("dojo.rpc.RpcService");
B.require("dojo.io.script");
B.declare("dojo.rpc.JsonpService",B.rpc.RpcService,{constructor:function(D,A){if(this.required){if(A){B.mixin(this.required,A)
}B.forEach(this.required,function(C){if(C==""||C==undefined){throw new Error("Required Service Argument not found: "+C)
}})
}},strictArgChecks:false,bind:function(A,I,G,J){var H=B.io.script.get({url:J||this.serviceUrl,callbackParamName:this.callbackParamName||"callback",content:this.createRequest(I),timeout:this.timeout,handleAs:"json",preventCache:true});
H.addCallbacks(this.resultCallback(G),this.errorCallback(G))
},createRequest:function(D){var A=(B.isArrayLike(D)&&D.length==1)?D[0]:{};
B.mixin(A,this.required);
return A
}})
}}});