if(!dojo._hasResource["dojo.dnd.Manager"]){dojo._hasResource["dojo.dnd.Manager"]=true;
dojo.provide("dojo.dnd.Manager");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.autoscroll");
dojo.require("dojo.dnd.Avatar");
dojo.dnd.Manager=function(){this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[]
};
dojo.extend(dojo.dnd.Manager,{OFFSET_X:16,OFFSET_Y:16,overSource:function(B){if(this.avatar){this.target=(B&&B.targetState!="Disabled")?B:null;
this.avatar.update()
}dojo.publish("/dnd/source/over",[B])
},outSource:function(B){if(this.avatar){if(this.target==B){this.target=null;
this.canDropFlag=false;
this.avatar.update();
dojo.publish("/dnd/source/over",[null])
}}else{dojo.publish("/dnd/source/over",[null])
}},startDrag:function(H,E,F){this.source=H;
this.nodes=E;
this.copy=Boolean(F);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[H,E,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp")];
var G="dojoDnd"+(F?"Copy":"Move");
dojo.addClass(dojo.body(),G)
},canDrop:function(C){var D=this.target&&C;
if(this.canDropFlag!=D){this.canDropFlag=D;
this.avatar.update()
}},stopDrag:function(){dojo.removeClass(dojo.body(),"dojoDndCopy");
dojo.removeClass(dojo.body(),"dojoDndMove");
dojo.forEach(this.events,dojo.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=null;
this.nodes=[]
},makeAvatar:function(){return new dojo.dnd.Avatar(this)
},updateAvatar:function(){this.avatar.update()
},onMouseMove:function(F){var D=this.avatar;
if(D){dojo.dnd.autoScroll(F);
dojo.marginBox(D.node,{l:F.pageX+this.OFFSET_X,t:F.pageY+this.OFFSET_Y});
var E=Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(F)));
if(this.copy!=E){this._setCopyStatus(E)
}}},onMouseUp:function(C){if(this.avatar&&(!("mouseButton" in this.source)||this.source.mouseButton==C.button)){if(this.target&&this.canDropFlag){var D=[this.source,this.nodes,Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(C))),this.target];
dojo.publish("/dnd/drop/before",D);
dojo.publish("/dnd/drop",D)
}else{dojo.publish("/dnd/cancel")
}this.stopDrag()
}},onKeyDown:function(C){if(this.avatar){switch(C.keyCode){case dojo.keys.CTRL:var D=Boolean(this.source.copyState(true));
if(this.copy!=D){this._setCopyStatus(D)
}break;
case dojo.keys.ESCAPE:dojo.publish("/dnd/cancel");
this.stopDrag();
break
}}},onKeyUp:function(C){if(this.avatar&&C.keyCode==dojo.keys.CTRL){var D=Boolean(this.source.copyState(false));
if(this.copy!=D){this._setCopyStatus(D)
}}},_setCopyStatus:function(B){this.copy=B;
this.source._markDndStatus(this.copy);
this.updateAvatar();
dojo.removeClass(dojo.body(),"dojoDnd"+(this.copy?"Move":"Copy"));
dojo.addClass(dojo.body(),"dojoDnd"+(this.copy?"Copy":"Move"))
}});
dojo.dnd._manager=null;
dojo.dnd.manager=function(){if(!dojo.dnd._manager){dojo.dnd._manager=new dojo.dnd.Manager()
}return dojo.dnd._manager
}
};