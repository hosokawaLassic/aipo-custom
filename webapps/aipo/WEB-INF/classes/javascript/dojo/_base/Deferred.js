if(!dojo._hasResource["dojo._base.Deferred"]){dojo._hasResource["dojo._base.Deferred"]=true;
dojo.provide("dojo._base.Deferred");
dojo.require("dojo._base.lang");
dojo.Deferred=function(B){this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=B;
this.silentlyCancelled=false
};
dojo.extend(dojo.Deferred,{_nextId:(function(){var B=1;
return function(){return B++
}
})(),cancel:function(){var D;
if(this.fired==-1){if(this.canceller){D=this.canceller(this)
}else{this.silentlyCancelled=true
}if(this.fired==-1){if(!(D instanceof Error)){var C=D;
D=new Error("Deferred Cancelled");
D.dojoType="cancel";
D.cancelResult=C
}this.errback(D)
}}else{if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){this.results[0].cancel()
}}},_resback:function(B){this.fired=((B instanceof Error)?1:0);
this.results[this.fired]=B;
this._fire()
},_check:function(){if(this.fired!=-1){if(!this.silentlyCancelled){throw new Error("already called!")
}this.silentlyCancelled=false;
return 
}},callback:function(B){this._check();
this._resback(B)
},errback:function(B){this._check();
if(!(B instanceof Error)){B=new Error(B)
}this._resback(B)
},addBoth:function(D,F){var E=dojo.hitch(D,F);
if(arguments.length>2){E=dojo.partial(E,arguments,2)
}return this.addCallbacks(E,E)
},addCallback:function(D,F){var E=dojo.hitch(D,F);
if(arguments.length>2){E=dojo.partial(E,arguments,2)
}return this.addCallbacks(E,null)
},addErrback:function(D,F){var E=dojo.hitch(D,F);
if(arguments.length>2){E=dojo.partial(E,arguments,2)
}return this.addCallbacks(null,E)
},addCallbacks:function(C,D){this.chain.push([C,D]);
if(this.fired>=0){this._fire()
}return this
},_fire:function(){var L=this.chain;
var I=this.fired;
var M=this.results[I];
var N=this;
var H=null;
while((L.length>0)&&(this.paused==0)){var J=L.shift()[I];
if(!J){continue
}try{M=J(M);
I=((M instanceof Error)?1:0);
if(M instanceof dojo.Deferred){H=function(A){N._resback(A);
N.paused--;
if((N.paused==0)&&(N.fired>=0)){N._fire()
}};
this.paused++
}}catch(K){console.debug(K);
I=1;
M=K
}}this.fired=I;
this.results[I]=M;
if((H)&&(this.paused)){M.addBoth(H)
}}})
};