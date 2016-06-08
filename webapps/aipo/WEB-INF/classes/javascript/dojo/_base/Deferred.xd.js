dojo._xdResourceLoaded({depends:[["provide","dojo._base.Deferred"],["require","dojo._base.lang"]],defineResource:function(B){if(!B._hasResource["dojo._base.Deferred"]){B._hasResource["dojo._base.Deferred"]=true;
B.provide("dojo._base.Deferred");
B.require("dojo._base.lang");
B.Deferred=function(A){this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=A;
this.silentlyCancelled=false
};
B.extend(B.Deferred,{_nextId:(function(){var A=1;
return function(){return A++
}
})(),cancel:function(){var A;
if(this.fired==-1){if(this.canceller){A=this.canceller(this)
}else{this.silentlyCancelled=true
}if(this.fired==-1){if(!(A instanceof Error)){var D=A;
A=new Error("Deferred Cancelled");
A.dojoType="cancel";
A.cancelResult=D
}this.errback(A)
}}else{if((this.fired==0)&&(this.results[0] instanceof B.Deferred)){this.results[0].cancel()
}}},_resback:function(A){this.fired=((A instanceof Error)?1:0);
this.results[this.fired]=A;
this._fire()
},_check:function(){if(this.fired!=-1){if(!this.silentlyCancelled){throw new Error("already called!")
}this.silentlyCancelled=false;
return 
}},callback:function(A){this._check();
this._resback(A)
},errback:function(A){this._check();
if(!(A instanceof Error)){A=new Error(A)
}this._resback(A)
},addBoth:function(F,E){var A=B.hitch(F,E);
if(arguments.length>2){A=B.partial(A,arguments,2)
}return this.addCallbacks(A,A)
},addCallback:function(F,E){var A=B.hitch(F,E);
if(arguments.length>2){A=B.partial(A,arguments,2)
}return this.addCallbacks(A,null)
},addErrback:function(F,E){var A=B.hitch(F,E);
if(arguments.length>2){A=B.partial(A,arguments,2)
}return this.addCallbacks(null,A)
},addCallbacks:function(D,A){this.chain.push([D,A]);
if(this.fired>=0){this._fire()
}return this
},_fire:function(){var K=this.chain;
var A=this.fired;
var L=this.results[A];
var M=this;
var N=null;
while((K.length>0)&&(this.paused==0)){var I=K.shift()[A];
if(!I){continue
}try{L=I(L);
A=((L instanceof Error)?1:0);
if(L instanceof B.Deferred){N=function(C){M._resback(C);
M.paused--;
if((M.paused==0)&&(M.fired>=0)){M._fire()
}};
this.paused++
}}catch(J){console.debug(J);
A=1;
L=J
}}this.fired=A;
this.results[A]=L;
if((N)&&(this.paused)){L.addBoth(N)
}}})
}}});