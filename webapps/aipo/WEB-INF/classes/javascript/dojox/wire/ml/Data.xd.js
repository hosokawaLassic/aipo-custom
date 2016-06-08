dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Data"],["provide","dojox.wire.ml.DataProperty"],["require","dijit._Widget"],["require","dijit._Container"],["require","dojox.wire.ml.util"]],defineResource:function(B){if(!B._hasResource["dojox.wire.ml.Data"]){B._hasResource["dojox.wire.ml.Data"]=true;
B.provide("dojox.wire.ml.Data");
B.provide("dojox.wire.ml.DataProperty");
B.require("dijit._Widget");
B.require("dijit._Container");
B.require("dojox.wire.ml.util");
B.declare("dojox.wire.ml.Data",[dijit._Widget,dijit._Container],{startup:function(){this._initializeProperties()
},_initializeProperties:function(F){if(!this._properties||F){this._properties={}
}var G=this.getChildren();
for(var H in G){var A=G[H];
if((A instanceof dojox.wire.ml.DataProperty)&&A.name){this.setPropertyValue(A.name,A.getValue())
}}},getPropertyValue:function(A){return this._properties[A]
},setPropertyValue:function(A,D){this._properties[A]=D
}});
B.declare("dojox.wire.ml.DataProperty",[dijit._Widget,dijit._Container],{name:"",type:"",value:"",getValue:function(){var F=this.value;
if(this.type){if(this.type=="number"){F=parseInt(F)
}else{if(this.type=="boolean"){F=(F=="true")
}else{if(this.type=="array"){F=[];
var G=this.getChildren();
for(var H in G){var A=G[H];
if(A instanceof dojox.wire.ml.DataProperty){F.push(A.getValue())
}}}else{if(this.type=="object"){F={};
var G=this.getChildren();
for(var H in G){var A=G[H];
if((A instanceof dojox.wire.ml.DataProperty)&&A.name){F[A.name]=A.getValue()
}}}else{if(this.type=="element"){F=new dojox.wire.ml.XmlElement(F);
var G=this.getChildren();
for(var H in G){var A=G[H];
if((A instanceof dojox.wire.ml.DataProperty)&&A.name){F.setPropertyValue(A.name,A.getValue())
}}}}}}}}return F
}})
}}});