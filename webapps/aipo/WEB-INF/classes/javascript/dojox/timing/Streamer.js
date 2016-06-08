if(!dojo._hasResource["dojox.timing.Streamer"]){dojo._hasResource["dojox.timing.Streamer"]=true;
dojo.provide("dojox.timing.Streamer");
dojo.require("dojox.timing._base");
dojox.timing.Streamer=function(O,K,L,P,J){var N=this;
var Q=[];
this.interval=L||1000;
this.minimumSize=P||10;
this.inputFunction=O||function(A){};
this.outputFunction=K||function(A){};
var M=new dojox.timing.Timer(this.interval);
var R=function(){N.onTick(N);
if(Q.length<N.minimumSize){N.inputFunction(Q)
}var A=Q.shift();
while(typeof (A)=="undefined"&&Q.length>0){A=Q.shift()
}if(typeof (A)=="undefined"){N.stop();
return 
}N.outputFunction(A)
};
this.setInterval=function(A){this.interval=A;
M.setInterval(A)
};
this.onTick=function(A){};
this.start=function(){if(typeof (this.inputFunction)=="function"&&typeof (this.outputFunction)=="function"){M.start();
return 
}throw new Error("You cannot start a Streamer without an input and an output function.")
};
this.onStart=function(){};
this.stop=function(){M.stop()
};
this.onStop=function(){};
M.onTick=this.tick;
M.onStart=this.onStart;
M.onStop=this.onStop;
if(J){Q.concat(J)
}}
};