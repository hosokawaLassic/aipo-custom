if(!dojo._hasResource["dojo.rpc.JsonService"]){dojo._hasResource["dojo.rpc.JsonService"]=true;
dojo.provide("dojo.rpc.JsonService");
dojo.require("dojo.rpc.RpcService");
dojo.declare("dojo.rpc.JsonService",dojo.rpc.RpcService,{bustCache:false,contentType:"application/json-rpc",lastSubmissionId:0,callRemote:function(E,F){var D=new dojo.Deferred();
this.bind(E,F,D);
return D
},bind:function(G,J,H,F){var I=dojo.rawXhrPost({url:F||this.serviceUrl,postData:this.createRequest(G,J),contentType:this.contentType,timeout:this.timeout,handleAs:"json-comment-optional"});
I.addCallbacks(this.resultCallback(H),this.errorCallback(H))
},createRequest:function(F,G){var E={params:G,method:F,id:++this.lastSubmissionId};
var H=dojo.toJson(E);
return H
},parseResults:function(B){if(dojo.isObject(B)){if("result" in B){return B.result
}if("Result" in B){return B.Result
}if("ResultSet" in B){return B.ResultSet
}}return B
}})
};