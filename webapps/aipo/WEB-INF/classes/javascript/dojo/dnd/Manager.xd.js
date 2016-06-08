dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Manager"],["require","dojo.dnd.common"],["require","dojo.dnd.autoscroll"],["require","dojo.dnd.Avatar"]],defineResource:function(B){if(!B._hasResource["dojo.dnd.Manager"]){B._hasResource["dojo.dnd.Manager"]=true;
B.provide("dojo.dnd.Manager");
B.require("dojo.dnd.common");
B.require("dojo.dnd.autoscroll");
B.require("dojo.dnd.Avatar");
B.dnd.Manager=function(){this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[]
};
B.extend(B.dnd.Manager,{OFFSET_X:16,OFFSET_Y:16,overSource:function(A){if(this.avatar){this.target=(A&&A.targetState!="Disabled")?A:null;
this.avatar.update()
}B.publish("/dnd/source/over",[A])
},outSource:function(A){if(this.avatar){if(this.target==A){this.target=null;
this.canDropFlag=false;
this.avatar.update();
B.publish("/dnd/source/over",[null])
}}else{B.publish("/dnd/source/over",[null])
}},startDrag:function(G,H,A){this.source=G;
this.nodes=H;
this.copy=Boolean(A);
this.avatar=this.makeAvatar();
B.body().appendChild(this.avatar.node);
B.publish("/dnd/start",[G,H,this.copy]);
this.events=[B.connect(B.doc,"onmousemove",this,"onMouseMove"),B.connect(B.doc,"onmouseup",this,"onMouseUp"),B.connect(B.doc,"onkeydown",this,"onKeyDown"),B.connect(B.doc,"onkeyup",this,"onKeyUp")];
var F="dojoDnd"+(A?"Copy":"Move");
B.addClass(B.body(),F)
},canDrop:function(D){var A=this.target&&D;
if(this.canDropFlag!=A){this.canDropFlag=A;
this.avatar.update()
}},stopDrag:function(){B.removeClass(B.body(),"dojoDndCopy");
B.removeClass(B.body(),"dojoDndMove");
B.forEach(this.events,B.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=null;
this.nodes=[]
},makeAvatar:function(){return new B.dnd.Avatar(this)
},updateAvatar:function(){this.avatar.update()
},onMouseMove:function(E){var F=this.avatar;
if(F){B.dnd.autoScroll(E);
B.marginBox(F.node,{l:E.pageX+this.OFFSET_X,t:E.pageY+this.OFFSET_Y});
var A=Boolean(this.source.copyState(B.dnd.getCopyKeyState(E)));
if(this.copy!=A){this._setCopyStatus(A)
}}},onMouseUp:function(D){if(this.avatar&&(!("mouseButton" in this.source)||this.source.mouseButton==D.button)){if(this.target&&this.canDropFlag){var A=[this.source,this.nodes,Boolean(this.source.copyState(B.dnd.getCopyKeyState(D))),this.target];
B.publish("/dnd/drop/before",A);
B.publish("/dnd/drop",A)
}else{B.publish("/dnd/cancel")
}this.stopDrag()
}},onKeyDown:function(D){if(this.avatar){switch(D.keyCode){case B.keys.CTRL:var A=Boolean(this.source.copyState(true));
if(this.copy!=A){this._setCopyStatus(A)
}break;
case B.keys.ESCAPE:B.publish("/dnd/cancel");
this.stopDrag();
break
}}},onKeyUp:function(D){if(this.avatar&&D.keyCode==B.keys.CTRL){var A=Boolean(this.source.copyState(false));
if(this.copy!=A){this._setCopyStatus(A)
}}},_setCopyStatus:function(A){this.copy=A;
this.source._markDndStatus(this.copy);
this.updateAvatar();
B.removeClass(B.body(),"dojoDnd"+(this.copy?"Move":"Copy"));
B.addClass(B.body(),"dojoDnd"+(this.copy?"Copy":"Move"))
}});
B.dnd._manager=null;
B.dnd.manager=function(){if(!B.dnd._manager){B.dnd._manager=new B.dnd.Manager()
}return B.dnd._manager
}
}}});