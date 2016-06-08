if(!dojo._hasResource["dojox.timing._base"]){dojo._hasResource["dojox.timing._base"]=true;
dojo.provide("dojox.timing._base");
dojo.experimental("dojox.timing");
dojox.timing.Timer=function(B){this.timer=null;
this.isRunning=false;
this.interval=B;
this.onStart=null;
this.onStop=null
};
dojo.extend(dojox.timing.Timer,{onTick:function(){},setInterval:function(B){if(this.isRunning){window.clearInterval(this.timer)
}this.interval=B;
if(this.isRunning){this.timer=window.setInterval(dojo.hitch(this,"onTick"),this.interval)
}},start:function(){if(typeof this.onStart=="function"){this.onStart()
}this.isRunning=true;
this.timer=window.setInterval(dojo.hitch(this,"onTick"),this.interval)
},stop:function(){if(typeof this.onStop=="function"){this.onStop()
}this.isRunning=false;
window.clearInterval(this.timer)
}})
};