dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.loop"],["require","dojox.dtl._base"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.tag.loop"]){B._hasResource["dojox.dtl.tag.loop"]=true;
B.provide("dojox.dtl.tag.loop");
B.require("dojox.dtl._base");
dojox.dtl.tag.loop.CycleNode=function(E,F,A){this._cyclevars=E;
this._counter=-1;
this._name=F;
this._map={};
this._VarNode=A
};
B.extend(dojox.dtl.tag.loop.CycleNode,{render:function(G,H){if(G.forloop&&!G.forloop.counter0){this._counter=-1
}++this._counter;
var A=this._cyclevars[this._counter%this._cyclevars.length];
if(this._name){G[this._name]=A
}if(!this._map[A]){this._map[A]={}
}var F=this._map[A][this._counter]=new this._VarNode(A);
return F.render(G,H,this)
},unrender:function(A,D){return D
},clone:function(){return new this.constructor(this._cyclevars,this._name)
},_onEnd:function(){this._counter=-1
},toString:function(){return"dojox.dtl.tag.loop.CycleNode"
}});
dojox.dtl.tag.loop.cycle=function(A,I){var M=I.split(" ");
if(M.length<2){throw new Error("'cycle' tag requires at least two arguments")
}if(M[1].indexOf(",")!=-1){var J=M[1].split(",");
M=[M[0]];
for(var L=0;
L<J.length;
L++){M.push('"'+J[L]+'"')
}}if(M.length==2){var N=M[M.length-1];
if(!A._namedCycleNodes){throw new Error("No named cycles in template: '"+N+"' is not defined")
}if(!A._namedCycleNodes[N]){throw new Error("Named cycle '"+N+"' does not exist")
}return A._namedCycleNodes[N]
}if(M.length>4&&M[M.length-2]=="as"){var N=M[M.length-1];
var K=new dojox.dtl.tag.loop.CycleNode(M.slice(1,M.length-2),N,A.getVarNode());
if(!A._namedCycleNodes){A._namedCycleNodes={}
}A._namedCycleNodes[N]=K
}else{K=new dojox.dtl.tag.loop.CycleNode(M.slice(1),null,A.getVarNode())
}return K
}
}}});