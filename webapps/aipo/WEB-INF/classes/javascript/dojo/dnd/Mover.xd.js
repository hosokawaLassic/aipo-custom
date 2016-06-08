dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Mover"],["require","dojo.dnd.common"],["require","dojo.dnd.autoscroll"]],defineResource:function(B){if(!B._hasResource["dojo.dnd.Mover"]){B._hasResource["dojo.dnd.Mover"]=true;
B.provide("dojo.dnd.Mover");
B.require("dojo.dnd.common");
B.require("dojo.dnd.autoscroll");
B.declare("dojo.dnd.Mover",null,{constructor:function(I,H,J){this.node=B.byId(I);
this.marginBox={l:H.pageX,t:H.pageY};
this.mouseButton=H.button;
var K=this.host=J,A=I.ownerDocument,L=B.connect(A,"onmousemove",this,"onFirstMove");
this.events=[B.connect(A,"onmousemove",this,"onMouseMove"),B.connect(A,"onmouseup",this,"onMouseUp"),B.connect(A,"ondragstart",B,"stopEvent"),B.connect(A,"onselectstart",B,"stopEvent"),L];
if(K&&K.onMoveStart){K.onMoveStart(this)
}},onMouseMove:function(A){B.dnd.autoScroll(A);
var D=this.marginBox;
this.host.onMove(this,{l:D.l+A.pageX,t:D.t+A.pageY})
},onMouseUp:function(A){if(this.mouseButton==A.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var A=B.marginBox(this.node);
A.l-=this.marginBox.l;
A.t-=this.marginBox.t;
this.marginBox=A;
this.host.onFirstMove(this);
B.disconnect(this.events.pop())
},destroy:function(){B.forEach(this.events,B.disconnect);
var A=this.host;
if(A&&A.onMoveStop){A.onMoveStop(this)
}this.events=this.node=null
}})
}}});