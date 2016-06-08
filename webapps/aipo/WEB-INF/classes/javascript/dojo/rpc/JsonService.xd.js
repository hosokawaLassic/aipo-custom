dojo._xdResourceLoaded({depends:[["provide","dojo.rpc.JsonService"],["require","dojo.rpc.RpcService"]],defineResource:function(B){if(!B._hasResource["dojo.rpc.JsonService"]){B._hasResource["dojo.rpc.JsonService"]=true;
B.provide("dojo.rpc.JsonService");
B.require("dojo.rpc.RpcService");
B.declare("dojo.rpc.JsonService",B.rpc.RpcService,{bustCache:false,contentType:"application/json-rpc",lastSubmissionId:0,callRemote:function(A,E){var F=new B.Deferred();
this.bind(A,E,F);
return F
},bind:function(A,I,G,J){var H=B.rawXhrPost({url:J||this.serviceUrl,postData:this.createRequest(A,I),contentType:this.contentType,timeout:this.timeout,handleAs:"json-comment-optional"});
H.addCallbacks(this.resultCallback(G),this.errorCallback(G))
},createRequest:function(A,F){var H={params:F,method:A,id:++this.lastSubmissionId};
var G=B.toJson(H);
return G
},parseResults:function(A){if(B.isObject(A)){if("result" in A){return A.result
}if("Result" in A){return A.Result
}if("ResultSet" in A){return A.ResultSet
}}return A
}})
}}});