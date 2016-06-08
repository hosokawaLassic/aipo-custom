dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Moveable"],["require","dojo.dnd.Mover"]],defineResource:function(B){if(!B._hasResource["dojo.dnd.Moveable"]){B._hasResource["dojo.dnd.Moveable"]=true;
B.provide("dojo.dnd.Moveable");
B.require("dojo.dnd.Mover");
B.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(D,A){this.node=B.byId(D);
if(!A){A={}
}this.handle=A.handle?B.byId(A.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=A.delay>0?A.delay:0;
this.skip=A.skip;
this.mover=A.mover?A.mover:B.dnd.Mover;
this.events=[B.connect(this.handle,"onmousedown",this,"onMouseDown"),B.connect(this.handle,"ondragstart",this,"onSelectStart"),B.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(A,D){return new B.dnd.Moveable(D,A)
},destroy:function(){B.forEach(this.events,B.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(A){if(this.skip&&B.dnd.isFormElement(A)){return 
}if(this.delay){this.events.push(B.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(B.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=A.pageX;
this._lastY=A.pageY
}else{new this.mover(this.node,A,this)
}B.stopEvent(A)
},onMouseMove:function(A){if(Math.abs(A.pageX-this._lastX)>this.delay||Math.abs(A.pageY-this._lastY)>this.delay){this.onMouseUp(A);
new this.mover(this.node,A,this)
}B.stopEvent(A)
},onMouseUp:function(A){B.disconnect(this.events.pop());
B.disconnect(this.events.pop())
},onSelectStart:function(A){if(!this.skip||!B.dnd.isFormElement(A)){B.stopEvent(A)
}},onMoveStart:function(A){B.publish("/dnd/move/start",[A]);
B.addClass(B.body(),"dojoMove");
B.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(A){B.publish("/dnd/move/stop",[A]);
B.removeClass(B.body(),"dojoMove");
B.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(A){},onMove:function(A,D){this.onMoving(A,D);
B.marginBox(A.node,D);
this.onMoved(A,D)
},onMoving:function(A,D){},onMoved:function(A,D){}})
}}});