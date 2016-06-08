if(!dojo._hasResource["dojo.dnd.Selector"]){dojo._hasResource["dojo.dnd.Selector"]=true;
dojo.provide("dojo.dnd.Selector");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.Container");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(C,D){if(!D){D={}
}this.singular=D.singular;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedNodes:function(){var F=new dojo.NodeList();
var E=dojo.dnd._empty;
for(var D in this.selection){if(D in E){continue
}F.push(dojo.byId(D))
}return F
},selectNone:function(){return this._removeSelection()._removeAnchor()
},selectAll:function(){this.forInItems(function(C,D){this._addItemClass(dojo.byId(D),"Selected");
this.selection[D]=1
},this);
return this._removeAnchor()
},deleteSelectedNodes:function(){var F=dojo.dnd._empty;
for(var D in this.selection){if(D in F){continue
}var E=dojo.byId(D);
this.delItem(D);
dojo._destroyElement(E)
}this.anchor=null;
this.selection={};
return this
},insertNodes:function(F,G,H,J){var I=this._normalizedCreator;
this._normalizedCreator=function(B,A){var C=I.call(this,B,A);
if(F){if(!this.anchor){this.anchor=C.node;
this._removeItemClass(C.node,"Selected");
this._addItemClass(this.anchor,"Anchor")
}else{if(this.anchor!=C.node){this._removeItemClass(C.node,"Anchor");
this._addItemClass(C.node,"Selected")
}}this.selection[C.node.id]=1
}else{this._removeItemClass(C.node,"Selected");
this._removeItemClass(C.node,"Anchor")
}return C
};
dojo.dnd.Selector.superclass.insertNodes.call(this,G,H,J);
this._normalizedCreator=I;
return this
},destroy:function(){dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},markupFactory:function(D,C){D._skipStartup=true;
return new dojo.dnd.Selector(C,D)
},onMouseDown:function(G){if(!this.current){return 
}if(!this.singular&&!dojo.dnd.getCopyKeyState(G)&&!G.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
dojo.stopEvent(G);
return 
}if(!this.singular&&G.shiftKey){if(!dojo.dnd.getCopyKeyState(G)){this._removeSelection()
}var F=dojo.query("> .dojoDndItem",this.parent);
if(F.length){if(!this.anchor){this.anchor=F[0];
this._addItemClass(this.anchor,"Anchor")
}this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){var E=0;
for(;
E<F.length;
++E){var H=F[E];
if(H==this.anchor||H==this.current){break
}}for(++E;
E<F.length;
++E){var H=F[E];
if(H==this.anchor||H==this.current){break
}this._addItemClass(H,"Selected");
this.selection[H.id]=1
}this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1
}}}else{if(this.singular){if(this.anchor==this.current){if(dojo.dnd.getCopyKeyState(G)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}}else{if(dojo.dnd.getCopyKeyState(G)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
this._removeAnchor()
}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id]
}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected")
}this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1
}}}else{if(!(this.current.id in this.selection)){this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1
}}}}dojo.stopEvent(G)
},onMouseUp:function(B){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}},onMouseMove:function(B){this.simpleSelection=false
},onOverEvent:function(){this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove")
},onOutEvent:function(){dojo.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent
},_removeSelection:function(){var E=dojo.dnd._empty;
for(var D in this.selection){if(D in E){continue
}var F=dojo.byId(D);
if(F){this._removeItemClass(F,"Selected")
}}this.selection={};
return this
},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this.anchor=null
}return this
}})
};