if(!dojo._hasResource["dojox.dtl.tag.logic"]){dojo._hasResource["dojox.dtl.tag.logic"]=true;
dojo.provide("dojox.dtl.tag.logic");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.logic.IfNode=function(F,G,E,H){this.bools=F;
this.trues=G;
this.falses=E;
this.type=H
};
dojo.extend(dojox.dtl.tag.logic.IfNode,{render:function(K,N){if(this.type=="or"){for(var L=0,M;
M=this.bools[L];
L++){var H=M[0];
var J=M[1];
var I=J.resolve(K);
if((I&&!H)||(H&&!I)){if(this.falses){N=this.falses.unrender(K,N)
}return this.trues.render(K,N,this)
}N=this.trues.unrender(K,N);
if(this.falses){return this.falses.render(K,N,this)
}}}else{for(var L=0,M;
M=this.bools[L];
L++){var H=M[0];
var J=M[1];
var I=J.resolve(K);
if(!((I&&!H)||(H&&!I))){if(this.trues){N=this.trues.unrender(K,N)
}return this.falses.render(K,N,this)
}N=this.falses.unrender(K,N);
if(this.falses){return this.trues.render(K,N,this)
}}}return N
},unrender:function(D,C){if(this.trues){C=this.trues.unrender(D,C)
}if(this.falses){C=this.falses.unrender(D,C)
}return C
},clone:function(D){var E=this.trues;
var F=this.falses;
if(E){E=E.clone(D)
}if(F){F=F.clone(D)
}return new this.constructor(this.bools,E,F,this.type)
},toString:function(){return"dojox.dtl.tag.logic.IfNode"
}});
dojox.dtl.tag.logic.ForNode=function(H,E,F,G){this.assign=H;
this.loop=E;
this.reversed=F;
this.nodelist=G;
this.pool=[]
};
dojo.extend(dojox.dtl.tag.logic.ForNode,{render:function(K,H){var I={};
if(K.forloop){I=K.forloop
}var N=dojox.dtl.resolveVariable(this.loop,K);
K.push();
for(var L=N.length;
L<this.pool.length;
L++){this.pool[L].unrender(K,H)
}if(this.reversed){N=N.reversed()
}var M=0;
for(var L in N){var J=N[L];
K.forloop={key:L,counter0:M,counter:M+1,revcounter0:N.length-M-1,revcounter:N.length-M,first:M==0,parentloop:I};
K[this.assign]=J;
if(M+1>this.pool.length){this.pool.push(this.nodelist.clone(H))
}H=this.pool[M].render(K,H,this);
++M
}K.pop();
return H
},unrender:function(F,E){for(var G=0,H;
H=this.pool[G];
G++){E=H.unrender(F,E)
}return E
},clone:function(B){return new this.constructor(this.assign,this.loop,this.reversed,this.nodelist.clone(B))
},toString:function(){return"dojox.dtl.tag.logic.ForNode"
}});
dojox.dtl.tag.logic.if_=function(O,P){var U=P.split(/\s+/g);
var Q;
var N=[];
U.shift();
P=U.join(" ");
U=P.split(" and ");
if(U.length==1){Q="or";
U=P.split(" or ")
}else{Q="and";
for(var T=0;
T<U.length;
T++){if(U[T]=="or"){throw new Error("'if' tags can't mix 'and' and 'or'")
}}}for(var T=0,M;
M=U[T];
T++){var L=false;
if(M.indexOf("not ")==0){M=M.substring(4);
L=true
}N.push([L,new dojox.dtl.Filter(M)])
}var S=O.parse(["else","endif"]);
var R=false;
var V=O.next();
if(V.text=="else"){var R=O.parse(["endif"]);
O.next()
}return new dojox.dtl.tag.logic.IfNode(N,S,R,Q)
};
dojox.dtl.tag.logic.for_=function(G,H){var J=H.split(/\s+/g);
var I=J.length==5;
var F=G.parse(["endfor"]);
G.next();
return new dojox.dtl.tag.logic.ForNode(J[1],J[3],I,F)
}
};