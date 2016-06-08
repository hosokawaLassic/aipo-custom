if(!dojo._hasResource["dojo.dnd.Moveable"]){dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.require("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(C,D){this.node=dojo.byId(C);
if(!D){D={}
}this.handle=D.handle?dojo.byId(D.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=D.delay>0?D.delay:0;
this.skip=D.skip;
this.mover=D.mover?D.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(D,C){return new dojo.dnd.Moveable(C,D)
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(B){if(this.skip&&dojo.dnd.isFormElement(B)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=B.pageX;
this._lastY=B.pageY
}else{new this.mover(this.node,B,this)
}dojo.stopEvent(B)
},onMouseMove:function(B){if(Math.abs(B.pageX-this._lastX)>this.delay||Math.abs(B.pageY-this._lastY)>this.delay){this.onMouseUp(B);
new this.mover(this.node,B,this)
}dojo.stopEvent(B)
},onMouseUp:function(B){dojo.disconnect(this.events.pop());
dojo.disconnect(this.events.pop())
},onSelectStart:function(B){if(!this.skip||!dojo.dnd.isFormElement(B)){dojo.stopEvent(B)
}},onMoveStart:function(B){dojo.publish("/dnd/move/start",[B]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(B){dojo.publish("/dnd/move/stop",[B]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(B){},onMove:function(D,C){this.onMoving(D,C);
dojo.marginBox(D.node,C);
this.onMoved(D,C)
},onMoving:function(D,C){},onMoved:function(D,C){}})
};