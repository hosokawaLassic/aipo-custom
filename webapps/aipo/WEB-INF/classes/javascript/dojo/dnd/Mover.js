if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.autoscroll");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(J,I,K){this.node=dojo.byId(J);
this.marginBox={l:I.pageX,t:I.pageY};
this.mouseButton=I.button;
var L=this.host=K,H=J.ownerDocument,G=dojo.connect(H,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(H,"onmousemove",this,"onMouseMove"),dojo.connect(H,"onmouseup",this,"onMouseUp"),dojo.connect(H,"ondragstart",dojo,"stopEvent"),dojo.connect(H,"onselectstart",dojo,"stopEvent"),G];
if(L&&L.onMoveStart){L.onMoveStart(this)
}},onMouseMove:function(D){dojo.dnd.autoScroll(D);
var C=this.marginBox;
this.host.onMove(this,{l:C.l+D.pageX,t:C.t+D.pageY})
},onMouseUp:function(B){if(this.mouseButton==B.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var B=dojo.marginBox(this.node);
B.l-=this.marginBox.l;
B.t-=this.marginBox.t;
this.marginBox=B;
this.host.onFirstMove(this);
dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
var B=this.host;
if(B&&B.onMoveStop){B.onMoveStop(this)
}this.events=this.node=null
}})
};