dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Action"],["provide","dojox.wire.ml.ActionFilter"],["require","dijit._Widget"],["require","dijit._Container"],["require","dojox.wire.Wire"],["require","dojox.wire.ml.util"]],defineResource:function(B){if(!B._hasResource["dojox.wire.ml.Action"]){B._hasResource["dojox.wire.ml.Action"]=true;
B.provide("dojox.wire.ml.Action");
B.provide("dojox.wire.ml.ActionFilter");
B.require("dijit._Widget");
B.require("dijit._Container");
B.require("dojox.wire.Wire");
B.require("dojox.wire.ml.util");
B.declare("dojox.wire.ml.Action",[dijit._Widget,dijit._Container],{trigger:"",triggerEvent:"",triggerTopic:"",postCreate:function(){this._connect()
},_connect:function(){if(this.triggerEvent){if(this.trigger){var E=dojox.wire.ml._getValue(this.trigger);
if(E){if(!E[this.triggerEvent]){E[this.triggerEvent]=function(){}
}this._triggerHandle=B.connect(E,this.triggerEvent,this,"run")
}}else{var A=this.triggerEvent.toLowerCase();
if(A=="onload"){var F=this;
B.addOnLoad(function(){F._run.apply(F,arguments)
})
}}}else{if(this.triggerTopic){this._triggerHandle=B.subscribe(this.triggerTopic,this,"run")
}}},_disconnect:function(){if(this._triggerHandle){if(this.triggerTopic){B.unsubscribe(this.triggerTopic,this._triggerHandle)
}else{B.disconnect(this._triggerHandle)
}}},run:function(){var E=this.getChildren();
for(var F in E){var A=E[F];
if(A instanceof dojox.wire.ml.ActionFilter){if(!A.filter.apply(A,arguments)){return 
}}}this._run.apply(this,arguments)
},_run:function(){var E=this.getChildren();
for(var F in E){var A=E[F];
if(A instanceof dojox.wire.ml.Action){A.run.apply(A,arguments)
}}},uninitialize:function(){this._disconnect();
return true
}});
B.declare("dojox.wire.ml.ActionFilter",dijit._Widget,{required:"",requiredValue:"",type:"",message:"",error:"",filter:function(){if(this.required===""){return true
}else{var A=dojox.wire.ml._getValue(this.required,arguments);
if(this.requiredValue===""){if(A){return true
}}else{var E=this.requiredValue;
if(this.type!==""){var F=this.type.toLowerCase();
if(F==="boolean"){if(E.toLowerCase()==="false"){E=false
}else{E=true
}}else{if(F==="number"){E=parseInt(E,10)
}}}if(A===E){return true
}}}if(this.message){if(this.error){dojox.wire.ml._setValue(this.error,this.message)
}else{alert(this.message)
}}return false
}})
}}});