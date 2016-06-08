dojo._xdResourceLoaded({depends:[["provide","dojo.DeferredList"]],defineResource:function(B){if(!B._hasResource["dojo.DeferredList"]){B._hasResource["dojo.DeferredList"]=true;
B.provide("dojo.DeferredList");
B.declare("dojo.DeferredList",B.Deferred,{constructor:function(A,H,L,I,J){this.list=A;
this.resultList=new Array(this.list.length);
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=J;
this.silentlyCancelled=false;
if(this.list.length===0&&!H){this.callback(this.resultList)
}this.finishedCount=0;
this.fireOnOneCallback=H;
this.fireOnOneErrback=L;
this.consumeErrors=I;
var K=0;
B.forEach(this.list,function(C,D){C.addCallback(this,function(E){this._cbDeferred(D,true,E);
return E
});
C.addErrback(this,function(E){this._cbDeferred(D,false,E);
return E
});
D++
},this)
},_cbDeferred:function(E,A,F){this.resultList[E]=[A,F];
this.finishedCount+=1;
if(this.fired!==0){if(A&&this.fireOnOneCallback){this.callback([E,F])
}else{if(!A&&this.fireOnOneErrback){this.errback(F)
}else{if(this.finishedCount==this.list.length){this.callback(this.resultList)
}}}}if(!A&&this.consumeErrors){F=null
}return F
},gatherResults:function(D){var A=new B.DeferedList(D,false,true,false);
A.addCallback(function(C){var H=[];
for(var G=0;
G<C.length;
G++){H.push(C[G][1])
}return H
});
return A
}})
}}});