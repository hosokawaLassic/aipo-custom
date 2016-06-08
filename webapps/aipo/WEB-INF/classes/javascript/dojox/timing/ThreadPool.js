if(!dojo._hasResource["dojox.timing.ThreadPool"]){dojo._hasResource["dojox.timing.ThreadPool"]=true;
dojo.provide("dojox.timing.ThreadPool");
dojo.require("dojox.timing");
dojo.experimental("dojox.timing.ThreadPool");
(function(){var B=dojox.timing;
B.threadStates={UNSTARTED:"unstarted",STOPPED:"stopped",PENDING:"pending",RUNNING:"running",SUSPENDED:"suspended",WAITING:"waiting",COMPLETE:"complete",ERROR:"error"};
B.threadPriorities={LOWEST:1,BELOWNORMAL:2,NORMAL:3,ABOVENORMAL:4,HIGHEST:5};
B.Thread=function(A,E){var F=this;
this.state=B.threadStates.UNSTARTED;
this.priority=E||B.threadPriorities.NORMAL;
this.lastError=null;
this.func=A;
this.invoke=function(){F.state=B.threadStates.RUNNING;
try{A(this);
F.state=B.threadStates.COMPLETE
}catch(C){F.lastError=C;
F.state=B.threadStates.ERROR
}}
};
B.ThreadPool=new (function(Q,R){var O=this;
var S=Q;
var P=S;
var M=R;
var V=Math.floor((M/2)/S);
var T=[];
var A=new Array(S+1);
var N=new dojox.timing.Timer();
var U=function(){var C=A[0]={};
for(var D=0;
D<A.length;
D++){window.clearTimeout(A[D]);
var E=T.shift();
if(typeof (E)=="undefined"){break
}C["thread-"+D]=E;
A[D]=window.setTimeout(E.invoke,(V*D))
}P=S-(D-1)
};
this.getMaxThreads=function(){return S
};
this.getAvailableThreads=function(){return P
};
this.getTickInterval=function(){return M
};
this.queueUserWorkItem=function(D){var C=D;
if(C instanceof Function){C=new B.Thread(C)
}var F=T.length;
for(var E=0;
E<T.length;
E++){if(T[E].priority<C.priority){F=E;
break
}}if(F<T.length){T.splice(F,0,C)
}else{T.push(C)
}return true
};
this.removeQueuedUserWorkItem=function(C){if(C instanceof Function){var E=-1;
for(var D=0;
D<T.length;
D++){if(T[D].func==C){E=D;
break
}}if(E>-1){T.splice(E,1);
return true
}return false
}var E=-1;
for(var D=0;
D<T.length;
D++){if(T[D]==C){E=D;
break
}}if(E>-1){T.splice(E,1);
return true
}return false
};
this.start=function(){N.start()
};
this.stop=function(){N.stop()
};
this.abort=function(){this.stop();
for(var C=1;
C<A.length;
C++){if(A[C]){window.clearTimeout(A[C])
}}for(var D in A[0]){this.queueUserWorkItem(D)
}A[0]={}
};
this.reset=function(){this.abort();
T=[]
};
this.sleep=function(C){N.stop();
window.setTimeout(N.start,C)
};
N.onTick=O.invoke
})(16,5000)
})()
};