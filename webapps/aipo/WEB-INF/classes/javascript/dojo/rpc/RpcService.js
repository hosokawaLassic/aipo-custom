if(!dojo._hasResource["dojo.rpc.RpcService"]){dojo._hasResource["dojo.rpc.RpcService"]=true;
dojo.provide("dojo.rpc.RpcService");
dojo.declare("dojo.rpc.RpcService",null,{constructor:function(args){if(args){if((dojo.isString(args))||(args instanceof dojo._Url)){if(args instanceof dojo._Url){var url=args+""
}else{url=args
}var def=dojo.xhrGet({url:url,handleAs:"json-comment-optional",sync:true});
def.addCallback(this,"processSmd");
def.addErrback(function(){throw new Error("Unable to load SMD from "+args)
})
}else{if(args.smdStr){this.processSmd(dojo.eval("("+args.smdStr+")"))
}else{if(args.serviceUrl){this.serviceUrl=args.serviceUrl
}this.timeout=args.timeout||3000;
if("strictArgChecks" in args){this.strictArgChecks=args.strictArgChecks
}this.processSmd(args)
}}}},strictArgChecks:true,serviceUrl:"",parseResults:function(B){return B
},errorCallback:function(B){return function(A){B.errback(new Error(A.message))
}
},resultCallback:function(D){var C=dojo.hitch(this,function(A){if(A.error!=null){var B;
if(typeof A.error=="object"){B=new Error(A.error.message);
B.code=A.error.code;
B.error=A.error.error
}else{B=new Error(A.error)
}B.id=A.id;
B.errorObject=A;
D.errback(B)
}else{D.callback(this.parseResults(A))
}});
return C
},generateMethod:function(E,F,D){return dojo.hitch(this,function(){var A=new dojo.Deferred();
if((this.strictArgChecks)&&(F!=null)&&(arguments.length!=F.length)){throw new Error("Invalid number of parameters for remote method.")
}else{this.bind(E,dojo._toArray(arguments),A,D)
}return A
})
},processSmd:function(B){if(B.methods){dojo.forEach(B.methods,function(A){if(A&&A.name){this[A.name]=this.generateMethod(A.name,A.parameters,A.url||A.serviceUrl||A.serviceURL);
if(!dojo.isFunction(this[A.name])){throw new Error("RpcService: Failed to create"+A.name+"()")
}}},this)
}this.serviceUrl=B.serviceUrl||B.serviceURL;
this.required=B.required;
this.smd=B
}})
};