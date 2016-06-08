if(!dojo._hasResource["dojox.gfx.move"]){dojo._hasResource["dojox.gfx.move"]=true;
dojo.provide("dojox.gfx.move");
dojo.experimental("dojox.gfx.move");
dojox.gfx.Mover=function(E,G){this.shape=E;
this.lastX=G.clientX;
this.lastY=G.clientY;
var F=document,H=dojo.connect(F,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(F,"onmousemove",this,"onMouseMove"),dojo.connect(F,"onmouseup",this,"destroy"),dojo.connect(F,"ondragstart",dojo,"stopEvent"),dojo.connect(F,"onselectstart",dojo,"stopEvent"),H];
dojo.publish("/gfx/move/start",[this]);
dojo.addClass(dojo.body(),"dojoMove")
};
dojo.extend(dojox.gfx.Mover,{onMouseMove:function(F){var D=F.clientX;
var E=F.clientY;
this.shape.applyLeftTransform({dx:D-this.lastX,dy:E-this.lastY});
this.lastX=D;
this.lastY=E;
dojo.stopEvent(F)
},onFirstMove:function(){dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
dojo.publish("/gfx/move/stop",[this]);
dojo.removeClass(dojo.body(),"dojoMove");
this.events=this.shape=null
}});
dojox.gfx.Moveable=function(C,D){this.shape=C;
this.delay=(D&&D.delay>0)?D.delay:0;
this.mover=(D&&D.mover)?D.mover:dojox.gfx.Mover;
this.events=[this.shape.connect("onmousedown",this,"onMouseDown"),]
};
dojo.extend(dojox.gfx.Moveable,{destroy:function(){dojo.forEach(this.events,"disconnect",this.shape);
this.events=this.shape=null
},onMouseDown:function(B){if(this.delay){this.events.push(this.shape.connect("onmousemove",this,"onMouseMove"));
this.events.push(this.shape.connect("onmouseup",this,"onMouseUp"));
this._lastX=B.clientX;
this._lastY=B.clientY
}else{new this.mover(this.shape,B)
}dojo.stopEvent(B)
},onMouseMove:function(B){if(Math.abs(B.clientX-this._lastX)>this.delay||Math.abs(B.clientY-this._lastY)>this.delay){this.onMouseUp(B);
new this.mover(this.shape,B)
}dojo.stopEvent(B)
},onMouseUp:function(B){this.shape.disconnect(this.events.pop());
this.shape.disconnect(this.events.pop())
}})
};