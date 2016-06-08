dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.logic"],["require","dojox.dtl._base"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.tag.logic"]){B._hasResource["dojox.dtl.tag.logic"]=true;
B.provide("dojox.dtl.tag.logic");
B.require("dojox.dtl._base");
dojox.dtl.tag.logic.IfNode=function(A,F,H,G){this.bools=A;
this.trues=F;
this.falses=H;
this.type=G
};
B.extend(dojox.dtl.tag.logic.IfNode,{render:function(J,M){if(this.type=="or"){for(var K=0,L;
L=this.bools[K];
K++){var N=L[0];
var I=L[1];
var A=I.resolve(J);
if((A&&!N)||(N&&!A)){if(this.falses){M=this.falses.unrender(J,M)
}return this.trues.render(J,M,this)
}M=this.trues.unrender(J,M);
if(this.falses){return this.falses.render(J,M,this)
}}}else{for(var K=0,L;
L=this.bools[K];
K++){var N=L[0];
var I=L[1];
var A=I.resolve(J);
if(!((A&&!N)||(N&&!A))){if(this.trues){M=this.trues.unrender(J,M)
}return this.falses.render(J,M,this)
}M=this.falses.unrender(J,M);
if(this.falses){return this.trues.render(J,M,this)
}}}return M
},unrender:function(A,D){if(this.trues){D=this.trues.unrender(A,D)
}if(this.falses){D=this.falses.unrender(A,D)
}return D
},clone:function(F){var A=this.trues;
var E=this.falses;
if(A){A=A.clone(F)
}if(E){E=E.clone(F)
}return new this.constructor(this.bools,A,E,this.type)
},toString:function(){return"dojox.dtl.tag.logic.IfNode"
}});
dojox.dtl.tag.logic.ForNode=function(G,H,A,F){this.assign=G;
this.loop=H;
this.reversed=A;
this.nodelist=F;
this.pool=[]
};
B.extend(dojox.dtl.tag.logic.ForNode,{render:function(J,N){var A={};
if(J.forloop){A=J.forloop
}var M=dojox.dtl.resolveVariable(this.loop,J);
J.push();
for(var K=M.length;
K<this.pool.length;
K++){this.pool[K].unrender(J,N)
}if(this.reversed){M=M.reversed()
}var L=0;
for(var K in M){var I=M[K];
J.forloop={key:K,counter0:L,counter:L+1,revcounter0:M.length-L-1,revcounter:M.length-L,first:L==0,parentloop:A};
J[this.assign]=I;
if(L+1>this.pool.length){this.pool.push(this.nodelist.clone(N))
}N=this.pool[L].render(J,N,this);
++L
}J.pop();
return N
},unrender:function(A,H){for(var F=0,G;
G=this.pool[F];
F++){H=G.unrender(A,H)
}return H
},clone:function(A){return new this.constructor(this.assign,this.loop,this.reversed,this.nodelist.clone(A))
},toString:function(){return"dojox.dtl.tag.logic.ForNode"
}});
dojox.dtl.tag.logic.if_=function(N,O){var T=O.split(/\s+/g);
var P;
var M=[];
T.shift();
O=T.join(" ");
T=O.split(" and ");
if(T.length==1){P="or";
T=O.split(" or ")
}else{P="and";
for(var S=0;
S<T.length;
S++){if(T[S]=="or"){throw new Error("'if' tags can't mix 'and' and 'or'")
}}}for(var S=0,A;
A=T[S];
S++){var V=false;
if(A.indexOf("not ")==0){A=A.substring(4);
V=true
}M.push([V,new dojox.dtl.Filter(A)])
}var R=N.parse(["else","endif"]);
var Q=false;
var U=N.next();
if(U.text=="else"){var Q=N.parse(["endif"]);
N.next()
}return new dojox.dtl.tag.logic.IfNode(M,R,Q,P)
};
dojox.dtl.tag.logic.for_=function(A,G){var I=G.split(/\s+/g);
var H=I.length==5;
var J=A.parse(["endfor"]);
A.next();
return new dojox.dtl.tag.logic.ForNode(I[1],I[3],H,J)
}
}}});