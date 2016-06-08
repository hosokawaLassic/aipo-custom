if(!dojo._hasResource["dojox.wire.ml.Action"]){dojo._hasResource["dojox.wire.ml.Action"]=true;
dojo.provide("dojox.wire.ml.Action");
dojo.provide("dojox.wire.ml.ActionFilter");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dojox.wire.Wire");
dojo.require("dojox.wire.ml.util");
dojo.declare("dojox.wire.ml.Action",[dijit._Widget,dijit._Container],{trigger:"",triggerEvent:"",triggerTopic:"",postCreate:function(){this._connect()
},_connect:function(){if(this.triggerEvent){if(this.trigger){var F=dojox.wire.ml._getValue(this.trigger);
if(F){if(!F[this.triggerEvent]){F[this.triggerEvent]=function(){}
}this._triggerHandle=dojo.connect(F,this.triggerEvent,this,"run")
}}else{var E=this.triggerEvent.toLowerCase();
if(E=="onload"){var D=this;
dojo.addOnLoad(function(){D._run.apply(D,arguments)
})
}}}else{if(this.triggerTopic){this._triggerHandle=dojo.subscribe(this.triggerTopic,this,"run")
}}},_disconnect:function(){if(this._triggerHandle){if(this.triggerTopic){dojo.unsubscribe(this.triggerTopic,this._triggerHandle)
}else{dojo.disconnect(this._triggerHandle)
}}},run:function(){var F=this.getChildren();
for(var D in F){var E=F[D];
if(E instanceof dojox.wire.ml.ActionFilter){if(!E.filter.apply(E,arguments)){return 
}}}this._run.apply(this,arguments)
},_run:function(){var F=this.getChildren();
for(var D in F){var E=F[D];
if(E instanceof dojox.wire.ml.Action){E.run.apply(E,arguments)
}}},uninitialize:function(){this._disconnect();
return true
}});
dojo.declare("dojox.wire.ml.ActionFilter",dijit._Widget,{required:"",requiredValue:"",type:"",message:"",error:"",filter:function(){if(this.required===""){return true
}else{var E=dojox.wire.ml._getValue(this.required,arguments);
if(this.requiredValue===""){if(E){return true
}}else{var F=this.requiredValue;
if(this.type!==""){var D=this.type.toLowerCase();
if(D==="boolean"){if(F.toLowerCase()==="false"){F=false
}else{F=true
}}else{if(D==="number"){F=parseInt(F,10)
}}}if(E===F){return true
}}}if(this.message){if(this.error){dojox.wire.ml._setValue(this.error,this.message)
}else{alert(this.message)
}}return false
}})
};