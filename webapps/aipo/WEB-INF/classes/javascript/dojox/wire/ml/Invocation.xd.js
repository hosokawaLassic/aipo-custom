dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Invocation"],["require","dojox.wire.ml.Action"]],defineResource:function(B){if(!B._hasResource["dojox.wire.ml.Invocation"]){B._hasResource["dojox.wire.ml.Invocation"]=true;
B.provide("dojox.wire.ml.Invocation");
B.require("dojox.wire.ml.Action");
B.declare("dojox.wire.ml.Invocation",dojox.wire.ml.Action,{object:"",method:"",topic:"",parameters:"",result:"",error:"",_run:function(){if(this.topic){var P=this._getParameters(arguments);
try{B.publish(this.topic,P);
this.onComplete()
}catch(Q){this.onError(Q)
}}else{if(this.method){var N=(this.object?dojox.wire.ml._getValue(this.object):B.global);
if(!N){return 
}var P=this._getParameters(arguments);
var A=N[this.method];
if(!A){A=N.callMethod;
if(!A){return 
}P=[this.method,P]
}try{var R=false;
if(N.getFeatures){var K=N.getFeatures();
if((this.method=="fetch"&&K["dojo.data.api.Read"])||(this.method=="save"&&K["dojo.data.api.Write"])){var M=P[0];
if(!M.onComplete){M.onComplete=function(){}
}this.connect(M,"onComplete","onComplete");
if(!M.onError){M.onError=function(){}
}this.connect(M,"onError","onError");
R=true
}}var L=A.apply(N,P);
if(!R){if(L&&(L instanceof B.Deferred)){var O=this;
L.addCallbacks(function(C){O.onComplete(C)
},function(C){O.onError(C)
})
}else{this.onComplete(L)
}}}catch(Q){this.onError(Q)
}}}},onComplete:function(A){if(this.result){dojox.wire.ml._setValue(this.result,A)
}if(this.error){dojox.wire.ml._setValue(this.error,"")
}},onError:function(A){if(this.error){if(A&&A.message){A=A.message
}dojox.wire.ml._setValue(this.error,A)
}},_getParameters:function(J){if(!this.parameters){return J
}var H=[];
var G=this.parameters.split(",");
if(G.length==1){var A=dojox.wire.ml._getValue(G[0],J);
if(B.isArray(A)){H=A
}else{H.push(A)
}}else{for(var I in G){H.push(dojox.wire.ml._getValue(G[I],J))
}}return H
}})
}}});