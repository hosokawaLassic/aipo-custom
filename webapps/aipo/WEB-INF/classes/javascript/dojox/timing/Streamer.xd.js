dojo._xdResourceLoaded({depends:[["provide","dojox.timing.Streamer"],["require","dojox.timing._base"]],defineResource:function(B){if(!B._hasResource["dojox.timing.Streamer"]){B._hasResource["dojox.timing.Streamer"]=true;
B.provide("dojox.timing.Streamer");
B.require("dojox.timing._base");
dojox.timing.Streamer=function(N,A,K,O,R){var M=this;
var P=[];
this.interval=K||1000;
this.minimumSize=O||10;
this.inputFunction=N||function(C){};
this.outputFunction=A||function(C){};
var L=new dojox.timing.Timer(this.interval);
var Q=function(){M.onTick(M);
if(P.length<M.minimumSize){M.inputFunction(P)
}var C=P.shift();
while(typeof (C)=="undefined"&&P.length>0){C=P.shift()
}if(typeof (C)=="undefined"){M.stop();
return 
}M.outputFunction(C)
};
this.setInterval=function(C){this.interval=C;
L.setInterval(C)
};
this.onTick=function(C){};
this.start=function(){if(typeof (this.inputFunction)=="function"&&typeof (this.outputFunction)=="function"){L.start();
return 
}throw new Error("You cannot start a Streamer without an input and an output function.")
};
this.onStart=function(){};
this.stop=function(){L.stop()
};
this.onStop=function(){};
L.onTick=this.tick;
L.onStart=this.onStart;
L.onStop=this.onStop;
if(R){P.concat(R)
}}
}}});