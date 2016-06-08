dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.move"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.move"]){B._hasResource["dojox.gfx.move"]=true;
B.provide("dojox.gfx.move");
B.experimental("dojox.gfx.move");
dojox.gfx.Mover=function(H,F){this.shape=H;
this.lastX=F.clientX;
this.lastY=F.clientY;
var A=document,G=B.connect(A,"onmousemove",this,"onFirstMove");
this.events=[B.connect(A,"onmousemove",this,"onMouseMove"),B.connect(A,"onmouseup",this,"destroy"),B.connect(A,"ondragstart",B,"stopEvent"),B.connect(A,"onselectstart",B,"stopEvent"),G];
B.publish("/gfx/move/start",[this]);
B.addClass(B.body(),"dojoMove")
};
B.extend(dojox.gfx.Mover,{onMouseMove:function(E){var F=E.clientX;
var A=E.clientY;
this.shape.applyLeftTransform({dx:F-this.lastX,dy:A-this.lastY});
this.lastX=F;
this.lastY=A;
B.stopEvent(E)
},onFirstMove:function(){B.disconnect(this.events.pop())
},destroy:function(){B.forEach(this.events,B.disconnect);
B.publish("/gfx/move/stop",[this]);
B.removeClass(B.body(),"dojoMove");
this.events=this.shape=null
}});
dojox.gfx.Moveable=function(D,A){this.shape=D;
this.delay=(A&&A.delay>0)?A.delay:0;
this.mover=(A&&A.mover)?A.mover:dojox.gfx.Mover;
this.events=[this.shape.connect("onmousedown",this,"onMouseDown"),]
};
B.extend(dojox.gfx.Moveable,{destroy:function(){B.forEach(this.events,"disconnect",this.shape);
this.events=this.shape=null
},onMouseDown:function(A){if(this.delay){this.events.push(this.shape.connect("onmousemove",this,"onMouseMove"));
this.events.push(this.shape.connect("onmouseup",this,"onMouseUp"));
this._lastX=A.clientX;
this._lastY=A.clientY
}else{new this.mover(this.shape,A)
}B.stopEvent(A)
},onMouseMove:function(A){if(Math.abs(A.clientX-this._lastX)>this.delay||Math.abs(A.clientY-this._lastY)>this.delay){this.onMouseUp(A);
new this.mover(this.shape,A)
}B.stopEvent(A)
},onMouseUp:function(A){this.shape.disconnect(this.events.pop());
this.shape.disconnect(this.events.pop())
}})
}}});