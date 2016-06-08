if(!dojo._hasResource["dojox.wire.ml.Transfer"]){dojo._hasResource["dojox.wire.ml.Transfer"]=true;
dojo.provide("dojox.wire.ml.Transfer");
dojo.provide("dojox.wire.ml.ChildWire");
dojo.provide("dojox.wire.ml.ColumnWire");
dojo.provide("dojox.wire.ml.NodeWire");
dojo.provide("dojox.wire.ml.SegmentWire");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dojox.wire._base");
dojo.require("dojox.wire.ml.Action");
dojo.declare("dojox.wire.ml.Transfer",dojox.wire.ml.Action,{source:"",sourceStore:"",sourceAttribute:"",sourcePath:"",type:"",converter:"",delimiter:"",target:"",targetStore:"",targetAttribute:"",targetPath:"",_run:function(){var D=this._getWire("source");
var C=this._getWire("target");
dojox.wire.transfer(D,C,arguments)
},_getWire:function(I){var L=undefined;
if(I=="source"){L={object:this.source,dataStore:this.sourceStore,attribute:this.sourceAttribute,path:this.sourcePath,type:this.type,converter:this.converter}
}else{L={object:this.target,dataStore:this.targetStore,attribute:this.targetAttribute,path:this.targetPath}
}if(L.object){if(L.object.length>=9&&L.object.substring(0,9)=="arguments"){L.property=L.object.substring(9);
L.object=null
}else{var J=L.object.indexOf(".");
if(J<0){L.object=dojox.wire.ml._getValue(L.object)
}else{L.property=L.object.substring(J+1);
L.object=dojox.wire.ml._getValue(L.object.substring(0,J))
}}}if(L.dataStore){L.dataStore=dojox.wire.ml._getValue(L.dataStore)
}var G=undefined;
var K=this.getChildren();
for(var J in K){var H=K[J];
if(H instanceof dojox.wire.ml.ChildWire&&H.which==I){if(!G){G={}
}H._addWire(this,G)
}}if(G){G.object=dojox.wire.create(L);
G.dataStore=L.dataStore;
L=G
}return L
}});
dojo.declare("dojox.wire.ml.ChildWire",dijit._Widget,{which:"source",object:"",property:"",type:"",converter:"",attribute:"",path:"",name:"",_addWire:function(D,C){if(this.name){if(!C.children){C.children={}
}C.children[this.name]=this._getWire(D)
}else{if(!C.children){C.children=[]
}C.children.push(this._getWire(D))
}},_getWire:function(B){return{object:(this.object?dojox.wire.ml._getValue(this.object):undefined),property:this.property,type:this.type,converter:this.converter,attribute:this.attribute,path:this.path}
}});
dojo.declare("dojox.wire.ml.ColumnWire",dojox.wire.ml.ChildWire,{column:"",_addWire:function(D,C){if(this.column){if(!C.columns){C.columns={}
}C.columns[this.column]=this._getWire(D)
}else{if(!C.columns){C.columns=[]
}C.columns.push(this._getWire(D))
}}});
dojo.declare("dojox.wire.ml.NodeWire",[dojox.wire.ml.ChildWire,dijit._Container],{titleProperty:"",titleAttribute:"",titlePath:"",_addWire:function(D,C){if(!C.nodes){C.nodes=[]
}C.nodes.push(this._getWires(D))
},_getWires:function(I){var L={node:this._getWire(I),title:{type:"string",property:this.titleProperty,attribute:this.titleAttribute,path:this.titlePath}};
var G=[];
var J=this.getChildren();
for(var K in J){var H=J[K];
if(H instanceof dojox.wire.ml.NodeWire){G.push(H._getWires(I))
}}if(G.length>0){L.children=G
}return L
}});
dojo.declare("dojox.wire.ml.SegmentWire",dojox.wire.ml.ChildWire,{_addWire:function(D,C){if(!C.segments){C.segments=[]
}C.segments.push(this._getWire(D));
if(D.delimiter&&!C.delimiter){C.delimiter=D.delimiter
}}})
};