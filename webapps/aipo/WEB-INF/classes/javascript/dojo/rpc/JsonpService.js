if(!dojo._hasResource["dojo.rpc.JsonpService"]){dojo._hasResource["dojo.rpc.JsonpService"]=true;
dojo.provide("dojo.rpc.JsonpService");
dojo.require("dojo.rpc.RpcService");
dojo.require("dojo.io.script");
dojo.declare("dojo.rpc.JsonpService",dojo.rpc.RpcService,{constructor:function(C,D){if(this.required){if(D){dojo.mixin(this.required,D)
}dojo.forEach(this.required,function(A){if(A==""||A==undefined){throw new Error("Required Service Argument not found: "+A)
}})
}},strictArgChecks:false,bind:function(G,J,H,F){var I=dojo.io.script.get({url:F||this.serviceUrl,callbackParamName:this.callbackParamName||"callback",content:this.createRequest(J),timeout:this.timeout,handleAs:"json",preventCache:true});
I.addCallbacks(this.resultCallback(H),this.errorCallback(H))
},createRequest:function(C){var D=(dojo.isArrayLike(C)&&C.length==1)?C[0]:{};
dojo.mixin(D,this.required);
return D
}})
};