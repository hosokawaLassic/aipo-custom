dojo._xdResourceLoaded({depends:[["provide","aimluck.dnd.DragMoveObject"],["provide","aimluck.dnd.Draggable"],["require","dojo.dnd.Mover"],["require","dojo.dnd.Moveable"],["require","dojo.parser"],["require","dojo.dnd.Source"]],defineResource:function(B){if(!B._hasResource["aimluck.dnd.DragMoveObject"]){B._hasResource["aimluck.dnd.DragMoveObject"]=true;
B.provide("aimluck.dnd.DragMoveObject");
B.provide("aimluck.dnd.Draggable");
B.require("dojo.dnd.Mover");
B.require("dojo.dnd.Moveable");
B.require("dojo.parser");
B.require("dojo.dnd.Source");
B.declare("aimluck.dnd.DragMoveObject",[B.dnd.Mover],{_pageY:0,_pageX:0,portletId:null,leftTop:null,onFirstMove:function(A){B.dnd.Mover.prototype.onFirstMove.apply(this,arguments)
},onMouseUp:function(A){B.dnd.Mover.prototype.onMouseUp.apply(this,arguments)
},onMouseDown:function(A){var D=this.marginBox;
this.leftTop={l:D.l+A.pageX,t:D.t+A.pageY};
B.dnd.Mover.prototype.onMouseDown.apply(this,arguments)
},onMouseMove:function(A){this._pageX=A.pageX;
this._pageY=A.pageY;
B.dnd.autoScroll(A);
var D=this.marginBox;
this.leftTop={l:D.l+A.pageX,t:D.t+A.pageY}
}});
B.declare("aimluck.dnd.Draggable",B.dnd.Moveable,{DragMoveObject:aimluck.dnd.DragMoveObject,portletId:null,constructor:function(D,A){this.portletId=A.pid
},onMouseDown:function(A){if(this.skip&&B.dnd.isFormElement(A)){return 
}if(this.delay){this.events.push(B.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(B.connect(this.handle,"onmouseup",this,"onMouseUp"))
}else{dragObj=new this.DragMoveObject(this.node,A,this);
dragObj.dragSource=this;
dragObj.portletId=this.portletId
}dragObj._pageX=A.pageX;
dragObj._pageY=A.pageY;
this._lastX=A.pageX;
this._lastY=A.pageY;
B.stopEvent(A)
}})
}}});