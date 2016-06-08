if(!dojo._hasResource["dojo.DeferredList"]){dojo._hasResource["dojo.DeferredList"]=true;
dojo.provide("dojo.DeferredList");
dojo.declare("dojo.DeferredList",dojo.Deferred,{constructor:function(H,I,G,J,K){this.list=H;
this.resultList=new Array(this.list.length);
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=K;
this.silentlyCancelled=false;
if(this.list.length===0&&!I){this.callback(this.resultList)
}this.finishedCount=0;
this.fireOnOneCallback=I;
this.fireOnOneErrback=G;
this.consumeErrors=J;
var L=0;
dojo.forEach(this.list,function(A,B){A.addCallback(this,function(C){this._cbDeferred(B,true,C);
return C
});
A.addErrback(this,function(C){this._cbDeferred(B,false,C);
return C
});
B++
},this)
},_cbDeferred:function(F,E,D){this.resultList[F]=[E,D];
this.finishedCount+=1;
if(this.fired!==0){if(E&&this.fireOnOneCallback){this.callback([F,D])
}else{if(!E&&this.fireOnOneErrback){this.errback(D)
}else{if(this.finishedCount==this.list.length){this.callback(this.resultList)
}}}}if(!E&&this.consumeErrors){D=null
}return D
},gatherResults:function(C){var D=new dojo.DeferedList(C,false,true,false);
D.addCallback(function(A){var F=[];
for(var B=0;
B<A.length;
B++){F.push(A[B][1])
}return F
});
return D
}})
};