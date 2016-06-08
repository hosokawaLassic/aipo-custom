if(!dojo._hasResource["dojo._base.fx"]){dojo._hasResource["dojo._base.fx"]=true;
dojo.provide("dojo._base.fx");
dojo.require("dojo._base.Color");
dojo.require("dojo._base.connect");
dojo.require("dojo._base.declare");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.html");
dojo._Line=function(D,C){this.start=D;
this.end=C;
this.getValue=function(A){return((this.end-this.start)*A)+this.start
}
};
dojo.declare("dojo._Animation",null,{constructor:function(B){dojo.mixin(this,B);
if(dojo.isArray(this.curve)){this.curve=new dojo._Line(this.curve[0],this.curve[1])
}},duration:1000,repeat:0,rate:10,_percent:0,_startRepeatCount:0,fire:function(C,D){if(this[C]){this[C].apply(this,D||[])
}return this
},play:function(I,J){var H=this;
if(J){H._stopTimer();
H._active=H._paused=false;
H._percent=0
}else{if(H._active&&!H._paused){return H
}}H.fire("beforeBegin");
var G=I||H.delay;
var F=dojo.hitch(H,"_play",J);
if(G>0){setTimeout(F,G);
return H
}F();
return H
},_play:function(D){var E=this;
E._startTime=new Date().valueOf();
if(E._paused){E._startTime-=E.duration*E._percent
}E._endTime=E._startTime+E.duration;
E._active=true;
E._paused=false;
var F=E.curve.getValue(E._percent);
if(!E._percent){if(!E._startRepeatCount){E._startRepeatCount=E.repeat
}E.fire("onBegin",[F])
}E.fire("onPlay",[F]);
E._cycle();
return E
},pause:function(){this._stopTimer();
if(!this._active){return this
}this._paused=true;
this.fire("onPause",[this.curve.getValue(this._percent)]);
return this
},gotoPercent:function(D,C){this._stopTimer();
this._active=this._paused=true;
this._percent=D;
if(C){this.play()
}return this
},stop:function(B){if(!this._timer){return 
}this._stopTimer();
if(B){this._percent=1
}this.fire("onStop",[this.curve.getValue(this._percent)]);
this._active=this._paused=false;
return this
},status:function(){if(this._active){return this._paused?"paused":"playing"
}return"stopped"
},_cycle:function(){var F=this;
if(F._active){var E=new Date().valueOf();
var D=(E-F._startTime)/(F._endTime-F._startTime);
if(D>=1){D=1
}F._percent=D;
if(F.easing){D=F.easing(D)
}F.fire("onAnimate",[F.curve.getValue(D)]);
if(D<1){F._startTimer()
}else{F._active=false;
if(F.repeat>0){F.repeat--;
F.play(null,true)
}else{if(F.repeat==-1){F.play(null,true)
}else{if(F._startRepeatCount){F.repeat=F._startRepeatCount;
F._startRepeatCount=0
}}}F._percent=0;
F.fire("onEnd")
}}return F
}});
(function(){var J=dojo;
var L=0;
var M=[];
var N={run:function(){}};
var I=null;
dojo._Animation.prototype._startTimer=function(){if(!this._timer){this._timer=dojo.connect(N,"run",this,"_cycle");
L++
}if(!I){I=setInterval(dojo.hitch(N,"run"),this.rate)
}};
dojo._Animation.prototype._stopTimer=function(){dojo.disconnect(this._timer);
this._timer=null;
L--;
if(!L){clearInterval(I);
I=null
}};
var K=(J.isIE)?function(A){var B=A.style;
if(!B.zoom.length&&J.style(A,"zoom")=="normal"){B.zoom="1"
}if(!B.width.length&&J.style(A,"width")=="auto"){B.width="auto"
}}:function(){};
dojo._fade=function(D){D.node=J.byId(D.node);
var A=J.mixin({properties:{}},D);
var C=(A.properties.opacity={});
C.start=!("start" in A)?function(){return Number(J.style(A.node,"opacity"))
}:A.start;
C.end=A.end;
var B=J.animateProperty(A);
J.connect(B,"beforeBegin",J.partial(K,A.node));
return B
};
dojo.fadeIn=function(A){return J._fade(J.mixin({end:1},A))
};
dojo.fadeOut=function(A){return J._fade(J.mixin({end:0},A))
};
dojo._defaultEasing=function(A){return 0.5+((Math.sin((A+1.5)*Math.PI))/2)
};
var H=function(C){this._properties=C;
for(var B in C){var A=C[B];
if(A.start instanceof J.Color){A.tempColor=new J.Color()
}}this.getValue=function(D){var E={};
for(var P in this._properties){var F=this._properties[P];
var G=F.start;
if(G instanceof J.Color){E[P]=J.blendColors(G,F.end,D,F.tempColor).toCss()
}else{if(!J.isArray(G)){E[P]=((F.end-G)*D)+G+(P!="opacity"?F.units||"px":"")
}}}return E
}
};
dojo.animateProperty=function(B){B.node=J.byId(B.node);
if(!B.easing){B.easing=J._defaultEasing
}var A=new J._Animation(B);
J.connect(A,"beforeBegin",A,function(){var C={};
for(var G in this.properties){var F=(C[G]=J.mixin({},this.properties[G]));
if(J.isFunction(F.start)){F.start=F.start()
}if(J.isFunction(F.end)){F.end=F.end()
}var D=(G.toLowerCase().indexOf("color")>=0);
function E(S,R){var T=({height:S.offsetHeight,width:S.offsetWidth})[R];
if(T!==undefined){return T
}T=J.style(S,R);
return(R=="opacity")?Number(T):parseFloat(T)
}if(!("end" in F)){F.end=E(this.node,G)
}else{if(!("start" in F)){F.start=E(this.node,G)
}}if(D){F.start=new J.Color(F.start);
F.end=new J.Color(F.end)
}else{F.start=(G=="opacity")?Number(F.start):parseFloat(F.start)
}}this.curve=new H(C)
});
J.connect(A,"onAnimate",A,function(D){for(var C in D){J.style(this.node,C,D[C])
}});
return A
}
})()
};