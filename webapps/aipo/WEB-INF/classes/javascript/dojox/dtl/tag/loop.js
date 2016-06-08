if(!dojo._hasResource["dojox.dtl.tag.loop"]){dojo._hasResource["dojox.dtl.tag.loop"]=true;
dojo.provide("dojox.dtl.tag.loop");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.loop.CycleNode=function(F,D,E){this._cyclevars=F;
this._counter=-1;
this._name=D;
this._map={};
this._VarNode=E
};
dojo.extend(dojox.dtl.tag.loop.CycleNode,{render:function(H,E){if(H.forloop&&!H.forloop.counter0){this._counter=-1
}++this._counter;
var F=this._cyclevars[this._counter%this._cyclevars.length];
if(this._name){H[this._name]=F
}if(!this._map[F]){this._map[F]={}
}var G=this._map[F][this._counter]=new this._VarNode(F);
return G.render(H,E,this)
},unrender:function(D,C){return C
},clone:function(){return new this.constructor(this._cyclevars,this._name)
},_onEnd:function(){this._counter=-1
},toString:function(){return"dojox.dtl.tag.loop.CycleNode"
}});
dojox.dtl.tag.loop.cycle=function(I,J){var N=J.split(" ");
if(N.length<2){throw new Error("'cycle' tag requires at least two arguments")
}if(N[1].indexOf(",")!=-1){var K=N[1].split(",");
N=[N[0]];
for(var M=0;
M<K.length;
M++){N.push('"'+K[M]+'"')
}}if(N.length==2){var H=N[N.length-1];
if(!I._namedCycleNodes){throw new Error("No named cycles in template: '"+H+"' is not defined")
}if(!I._namedCycleNodes[H]){throw new Error("Named cycle '"+H+"' does not exist")
}return I._namedCycleNodes[H]
}if(N.length>4&&N[N.length-2]=="as"){var H=N[N.length-1];
var L=new dojox.dtl.tag.loop.CycleNode(N.slice(1,N.length-2),H,I.getVarNode());
if(!I._namedCycleNodes){I._namedCycleNodes={}
}I._namedCycleNodes[H]=L
}else{L=new dojox.dtl.tag.loop.CycleNode(N.slice(1),null,I.getVarNode())
}return L
}
};