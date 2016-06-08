dojo._xdResourceLoaded({depends:[["provide","dojox.timing.ThreadPool"],["require","dojox.timing"]],defineResource:function(B){if(!B._hasResource["dojox.timing.ThreadPool"]){B._hasResource["dojox.timing.ThreadPool"]=true;
B.provide("dojox.timing.ThreadPool");
B.require("dojox.timing");
B.experimental("dojox.timing.ThreadPool");
(function(){var A=dojox.timing;
A.threadStates={UNSTARTED:"unstarted",STOPPED:"stopped",PENDING:"pending",RUNNING:"running",SUSPENDED:"suspended",WAITING:"waiting",COMPLETE:"complete",ERROR:"error"};
A.threadPriorities={LOWEST:1,BELOWNORMAL:2,NORMAL:3,ABOVENORMAL:4,HIGHEST:5};
A.Thread=function(F,G){var H=this;
this.state=A.threadStates.UNSTARTED;
this.priority=G||A.threadPriorities.NORMAL;
this.lastError=null;
this.func=F;
this.invoke=function(){H.state=A.threadStates.RUNNING;
try{F(this);
H.state=A.threadStates.COMPLETE
}catch(C){H.lastError=C;
H.state=A.threadStates.ERROR
}}
};
A.ThreadPool=new (function(R,S){var P=this;
var T=R;
var Q=T;
var N=S;
var W=Math.floor((N/2)/T);
var U=[];
var X=new Array(T+1);
var O=new dojox.timing.Timer();
var V=function(){var C=X[0]={};
for(var D=0;
D<X.length;
D++){window.clearTimeout(X[D]);
var E=U.shift();
if(typeof (E)=="undefined"){break
}C["thread-"+D]=E;
X[D]=window.setTimeout(E.invoke,(W*D))
}Q=T-(D-1)
};
this.getMaxThreads=function(){return T
};
this.getAvailableThreads=function(){return Q
};
this.getTickInterval=function(){return N
};
this.queueUserWorkItem=function(D){var C=D;
if(C instanceof Function){C=new A.Thread(C)
}var F=U.length;
for(var E=0;
E<U.length;
E++){if(U[E].priority<C.priority){F=E;
break
}}if(F<U.length){U.splice(F,0,C)
}else{U.push(C)
}return true
};
this.removeQueuedUserWorkItem=function(C){if(C instanceof Function){var E=-1;
for(var D=0;
D<U.length;
D++){if(U[D].func==C){E=D;
break
}}if(E>-1){U.splice(E,1);
return true
}return false
}var E=-1;
for(var D=0;
D<U.length;
D++){if(U[D]==C){E=D;
break
}}if(E>-1){U.splice(E,1);
return true
}return false
};
this.start=function(){O.start()
};
this.stop=function(){O.stop()
};
this.abort=function(){this.stop();
for(var C=1;
C<X.length;
C++){if(X[C]){window.clearTimeout(X[C])
}}for(var D in X[0]){this.queueUserWorkItem(D)
}X[0]={}
};
this.reset=function(){this.abort();
U=[]
};
this.sleep=function(C){O.stop();
window.setTimeout(O.start,C)
};
O.onTick=P.invoke
})(16,5000)
})()
}}});