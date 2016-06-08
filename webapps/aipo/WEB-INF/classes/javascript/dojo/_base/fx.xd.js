dojo._xdResourceLoaded({depends:[["provide","dojo._base.fx"],["require","dojo._base.Color"],["require","dojo._base.connect"],["require","dojo._base.declare"],["require","dojo._base.lang"],["require","dojo._base.html"]],defineResource:function(B){if(!B._hasResource["dojo._base.fx"]){B._hasResource["dojo._base.fx"]=true;
B.provide("dojo._base.fx");
B.require("dojo._base.Color");
B.require("dojo._base.connect");
B.require("dojo._base.declare");
B.require("dojo._base.lang");
B.require("dojo._base.html");
B._Line=function(A,D){this.start=A;
this.end=D;
this.getValue=function(C){return((this.end-this.start)*C)+this.start
}
};
B.declare("dojo._Animation",null,{constructor:function(A){B.mixin(this,A);
if(B.isArray(this.curve)){this.curve=new B._Line(this.curve[0],this.curve[1])
}},duration:1000,repeat:0,rate:10,_percent:0,_startRepeatCount:0,fire:function(D,A){if(this[D]){this[D].apply(this,A||[])
}return this
},play:function(H,I){var G=this;
if(I){G._stopTimer();
G._active=G._paused=false;
G._percent=0
}else{if(G._active&&!G._paused){return G
}}G.fire("beforeBegin");
var A=H||G.delay;
var J=B.hitch(G,"_play",I);
if(A>0){setTimeout(J,A);
return G
}J();
return G
},_play:function(F){var A=this;
A._startTime=new Date().valueOf();
if(A._paused){A._startTime-=A.duration*A._percent
}A._endTime=A._startTime+A.duration;
A._active=true;
A._paused=false;
var E=A.curve.getValue(A._percent);
if(!A._percent){if(!A._startRepeatCount){A._startRepeatCount=A.repeat
}A.fire("onBegin",[E])
}A.fire("onPlay",[E]);
A._cycle();
return A
},pause:function(){this._stopTimer();
if(!this._active){return this
}this._paused=true;
this.fire("onPause",[this.curve.getValue(this._percent)]);
return this
},gotoPercent:function(A,D){this._stopTimer();
this._active=this._paused=true;
this._percent=A;
if(D){this.play()
}return this
},stop:function(A){if(!this._timer){return 
}this._stopTimer();
if(A){this._percent=1
}this.fire("onStop",[this.curve.getValue(this._percent)]);
this._active=this._paused=false;
return this
},status:function(){if(this._active){return this._paused?"paused":"playing"
}return"stopped"
},_cycle:function(){var E=this;
if(E._active){var A=new Date().valueOf();
var F=(A-E._startTime)/(E._endTime-E._startTime);
if(F>=1){F=1
}E._percent=F;
if(E.easing){F=E.easing(F)
}E.fire("onAnimate",[E.curve.getValue(F)]);
if(F<1){E._startTimer()
}else{E._active=false;
if(E.repeat>0){E.repeat--;
E.play(null,true)
}else{if(E.repeat==-1){E.play(null,true)
}else{if(E._startRepeatCount){E.repeat=E._startRepeatCount;
E._startRepeatCount=0
}}}E._percent=0;
E.fire("onEnd")
}}return E
}});
(function(){var I=B;
var K=0;
var L=[];
var M={run:function(){}};
var A=null;
B._Animation.prototype._startTimer=function(){if(!this._timer){this._timer=B.connect(M,"run",this,"_cycle");
K++
}if(!A){A=setInterval(B.hitch(M,"run"),this.rate)
}};
B._Animation.prototype._stopTimer=function(){B.disconnect(this._timer);
this._timer=null;
K--;
if(!K){clearInterval(A);
A=null
}};
var J=(I.isIE)?function(C){var D=C.style;
if(!D.zoom.length&&I.style(C,"zoom")=="normal"){D.zoom="1"
}if(!D.width.length&&I.style(C,"width")=="auto"){D.width="auto"
}}:function(){};
B._fade=function(F){F.node=I.byId(F.node);
var C=I.mixin({properties:{}},F);
var E=(C.properties.opacity={});
E.start=!("start" in C)?function(){return Number(I.style(C.node,"opacity"))
}:C.start;
E.end=C.end;
var D=I.animateProperty(C);
I.connect(D,"beforeBegin",I.partial(J,C.node));
return D
};
B.fadeIn=function(C){return I._fade(I.mixin({end:1},C))
};
B.fadeOut=function(C){return I._fade(I.mixin({end:0},C))
};
B._defaultEasing=function(C){return 0.5+((Math.sin((C+1.5)*Math.PI))/2)
};
var N=function(E){this._properties=E;
for(var D in E){var C=E[D];
if(C.start instanceof I.Color){C.tempColor=new I.Color()
}}this.getValue=function(R){var F={};
for(var Q in this._properties){var G=this._properties[Q];
var H=G.start;
if(H instanceof I.Color){F[Q]=I.blendColors(H,G.end,R,G.tempColor).toCss()
}else{if(!I.isArray(H)){F[Q]=((G.end-H)*R)+H+(Q!="opacity"?G.units||"px":"")
}}}return F
}
};
B.animateProperty=function(D){D.node=I.byId(D.node);
if(!D.easing){D.easing=I._defaultEasing
}var C=new I._Animation(D);
I.connect(C,"beforeBegin",C,function(){var P={};
for(var H in this.properties){var G=(P[H]=I.mixin({},this.properties[H]));
if(I.isFunction(G.start)){G.start=G.start()
}if(I.isFunction(G.end)){G.end=G.end()
}var E=(H.toLowerCase().indexOf("color")>=0);
function F(S,O){var T=({height:S.offsetHeight,width:S.offsetWidth})[O];
if(T!==undefined){return T
}T=I.style(S,O);
return(O=="opacity")?Number(T):parseFloat(T)
}if(!("end" in G)){G.end=F(this.node,H)
}else{if(!("start" in G)){G.start=F(this.node,H)
}}if(E){G.start=new I.Color(G.start);
G.end=new I.Color(G.end)
}else{G.start=(H=="opacity")?Number(G.start):parseFloat(G.start)
}}this.curve=new N(P)
});
I.connect(C,"onAnimate",C,function(F){for(var E in F){I.style(this.node,E,F[E])
}});
return C
}
})()
}}});