if(!dojo._hasResource["aimluck.dnd.DragMoveObject"]){dojo._hasResource["aimluck.dnd.DragMoveObject"]=true;
dojo.provide("aimluck.dnd.DragMoveObject");
dojo.provide("aimluck.dnd.Draggable");
dojo.require("dojo.dnd.Mover");
dojo.require("dojo.dnd.Moveable");
dojo.require("dojo.parser");
dojo.require("dojo.dnd.Source");
dojo.declare("aimluck.dnd.DragMoveObject",[dojo.dnd.Mover],{_pageY:0,_pageX:0,portletId:null,leftTop:null,onFirstMove:function(B){dojo.dnd.Mover.prototype.onFirstMove.apply(this,arguments)
},onMouseUp:function(B){dojo.dnd.Mover.prototype.onMouseUp.apply(this,arguments)
},onMouseDown:function(D){var C=this.marginBox;
this.leftTop={l:C.l+D.pageX,t:C.t+D.pageY};
dojo.dnd.Mover.prototype.onMouseDown.apply(this,arguments)
},onMouseMove:function(D){this._pageX=D.pageX;
this._pageY=D.pageY;
dojo.dnd.autoScroll(D);
var C=this.marginBox;
this.leftTop={l:C.l+D.pageX,t:C.t+D.pageY}
}});
dojo.declare("aimluck.dnd.Draggable",dojo.dnd.Moveable,{DragMoveObject:aimluck.dnd.DragMoveObject,portletId:null,constructor:function(C,D){this.portletId=D.pid
},onMouseDown:function(B){if(this.skip&&dojo.dnd.isFormElement(B)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"))
}else{dragObj=new this.DragMoveObject(this.node,B,this);
dragObj.dragSource=this;
dragObj.portletId=this.portletId
}dragObj._pageX=B.pageX;
dragObj._pageY=B.pageY;
this._lastX=B.pageX;
this._lastY=B.pageY;
dojo.stopEvent(B)
}})
};