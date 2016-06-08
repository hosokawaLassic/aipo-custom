dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Transfer"],["provide","dojox.wire.ml.ChildWire"],["provide","dojox.wire.ml.ColumnWire"],["provide","dojox.wire.ml.NodeWire"],["provide","dojox.wire.ml.SegmentWire"],["require","dijit._Widget"],["require","dijit._Container"],["require","dojox.wire._base"],["require","dojox.wire.ml.Action"]],defineResource:function(B){if(!B._hasResource["dojox.wire.ml.Transfer"]){B._hasResource["dojox.wire.ml.Transfer"]=true;
B.provide("dojox.wire.ml.Transfer");
B.provide("dojox.wire.ml.ChildWire");
B.provide("dojox.wire.ml.ColumnWire");
B.provide("dojox.wire.ml.NodeWire");
B.provide("dojox.wire.ml.SegmentWire");
B.require("dijit._Widget");
B.require("dijit._Container");
B.require("dojox.wire._base");
B.require("dojox.wire.ml.Action");
B.declare("dojox.wire.ml.Transfer",dojox.wire.ml.Action,{source:"",sourceStore:"",sourceAttribute:"",sourcePath:"",type:"",converter:"",delimiter:"",target:"",targetStore:"",targetAttribute:"",targetPath:"",_run:function(){var A=this._getWire("source");
var D=this._getWire("target");
dojox.wire.transfer(A,D,arguments)
},_getWire:function(H){var K=undefined;
if(H=="source"){K={object:this.source,dataStore:this.sourceStore,attribute:this.sourceAttribute,path:this.sourcePath,type:this.type,converter:this.converter}
}else{K={object:this.target,dataStore:this.targetStore,attribute:this.targetAttribute,path:this.targetPath}
}if(K.object){if(K.object.length>=9&&K.object.substring(0,9)=="arguments"){K.property=K.object.substring(9);
K.object=null
}else{var I=K.object.indexOf(".");
if(I<0){K.object=dojox.wire.ml._getValue(K.object)
}else{K.property=K.object.substring(I+1);
K.object=dojox.wire.ml._getValue(K.object.substring(0,I))
}}}if(K.dataStore){K.dataStore=dojox.wire.ml._getValue(K.dataStore)
}var L=undefined;
var J=this.getChildren();
for(var I in J){var A=J[I];
if(A instanceof dojox.wire.ml.ChildWire&&A.which==H){if(!L){L={}
}A._addWire(this,L)
}}if(L){L.object=dojox.wire.create(K);
L.dataStore=K.dataStore;
K=L
}return K
}});
B.declare("dojox.wire.ml.ChildWire",dijit._Widget,{which:"source",object:"",property:"",type:"",converter:"",attribute:"",path:"",name:"",_addWire:function(A,D){if(this.name){if(!D.children){D.children={}
}D.children[this.name]=this._getWire(A)
}else{if(!D.children){D.children=[]
}D.children.push(this._getWire(A))
}},_getWire:function(A){return{object:(this.object?dojox.wire.ml._getValue(this.object):undefined),property:this.property,type:this.type,converter:this.converter,attribute:this.attribute,path:this.path}
}});
B.declare("dojox.wire.ml.ColumnWire",dojox.wire.ml.ChildWire,{column:"",_addWire:function(A,D){if(this.column){if(!D.columns){D.columns={}
}D.columns[this.column]=this._getWire(A)
}else{if(!D.columns){D.columns=[]
}D.columns.push(this._getWire(A))
}}});
B.declare("dojox.wire.ml.NodeWire",[dojox.wire.ml.ChildWire,dijit._Container],{titleProperty:"",titleAttribute:"",titlePath:"",_addWire:function(A,D){if(!D.nodes){D.nodes=[]
}D.nodes.push(this._getWires(A))
},_getWires:function(H){var K={node:this._getWire(H),title:{type:"string",property:this.titleProperty,attribute:this.titleAttribute,path:this.titlePath}};
var L=[];
var I=this.getChildren();
for(var J in I){var A=I[J];
if(A instanceof dojox.wire.ml.NodeWire){L.push(A._getWires(H))
}}if(L.length>0){K.children=L
}return K
}});
B.declare("dojox.wire.ml.SegmentWire",dojox.wire.ml.ChildWire,{_addWire:function(A,D){if(!D.segments){D.segments=[]
}D.segments.push(this._getWire(A));
if(A.delimiter&&!D.delimiter){D.delimiter=A.delimiter
}}})
}}});