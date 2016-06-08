if(!dojo._hasResource["dojox.wire.ml.Invocation"]){dojo._hasResource["dojox.wire.ml.Invocation"]=true;
dojo.provide("dojox.wire.ml.Invocation");
dojo.require("dojox.wire.ml.Action");
dojo.declare("dojox.wire.ml.Invocation",dojox.wire.ml.Action,{object:"",method:"",topic:"",parameters:"",result:"",error:"",_run:function(){if(this.topic){var Q=this._getParameters(arguments);
try{dojo.publish(this.topic,Q);
this.onComplete()
}catch(R){this.onError(R)
}}else{if(this.method){var O=(this.object?dojox.wire.ml._getValue(this.object):dojo.global);
if(!O){return 
}var Q=this._getParameters(arguments);
var K=O[this.method];
if(!K){K=O.callMethod;
if(!K){return 
}Q=[this.method,Q]
}try{var J=false;
if(O.getFeatures){var L=O.getFeatures();
if((this.method=="fetch"&&L["dojo.data.api.Read"])||(this.method=="save"&&L["dojo.data.api.Write"])){var N=Q[0];
if(!N.onComplete){N.onComplete=function(){}
}this.connect(N,"onComplete","onComplete");
if(!N.onError){N.onError=function(){}
}this.connect(N,"onError","onError");
J=true
}}var M=K.apply(O,Q);
if(!J){if(M&&(M instanceof dojo.Deferred)){var P=this;
M.addCallbacks(function(A){P.onComplete(A)
},function(A){P.onError(A)
})
}else{this.onComplete(M)
}}}catch(R){this.onError(R)
}}}},onComplete:function(B){if(this.result){dojox.wire.ml._setValue(this.result,B)
}if(this.error){dojox.wire.ml._setValue(this.error,"")
}},onError:function(B){if(this.error){if(B&&B.message){B=B.message
}dojox.wire.ml._setValue(this.error,B)
}},_getParameters:function(F){if(!this.parameters){return F
}var I=[];
var H=this.parameters.split(",");
if(H.length==1){var G=dojox.wire.ml._getValue(H[0],F);
if(dojo.isArray(G)){I=G
}else{I.push(G)
}}else{for(var J in H){I.push(dojox.wire.ml._getValue(H[J],F))
}}return I
}})
};