if(!dojo._hasResource["dojox.wire.ml.Data"]){dojo._hasResource["dojox.wire.ml.Data"]=true;
dojo.provide("dojox.wire.ml.Data");
dojo.provide("dojox.wire.ml.DataProperty");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dojox.wire.ml.util");
dojo.declare("dojox.wire.ml.Data",[dijit._Widget,dijit._Container],{startup:function(){this._initializeProperties()
},_initializeProperties:function(G){if(!this._properties||G){this._properties={}
}var H=this.getChildren();
for(var E in H){var F=H[E];
if((F instanceof dojox.wire.ml.DataProperty)&&F.name){this.setPropertyValue(F.name,F.getValue())
}}},getPropertyValue:function(B){return this._properties[B]
},setPropertyValue:function(D,C){this._properties[D]=C
}});
dojo.declare("dojox.wire.ml.DataProperty",[dijit._Widget,dijit._Container],{name:"",type:"",value:"",getValue:function(){var G=this.value;
if(this.type){if(this.type=="number"){G=parseInt(G)
}else{if(this.type=="boolean"){G=(G=="true")
}else{if(this.type=="array"){G=[];
var H=this.getChildren();
for(var E in H){var F=H[E];
if(F instanceof dojox.wire.ml.DataProperty){G.push(F.getValue())
}}}else{if(this.type=="object"){G={};
var H=this.getChildren();
for(var E in H){var F=H[E];
if((F instanceof dojox.wire.ml.DataProperty)&&F.name){G[F.name]=F.getValue()
}}}else{if(this.type=="element"){G=new dojox.wire.ml.XmlElement(G);
var H=this.getChildren();
for(var E in H){var F=H[E];
if((F instanceof dojox.wire.ml.DataProperty)&&F.name){G.setPropertyValue(F.name,F.getValue())
}}}}}}}}return G
}})
};