if(!dojo._hasResource["dijit._tree.dndSelector"]){dojo._hasResource["dijit._tree.dndSelector"]=true;
dojo.provide("dijit._tree.dndSelector");
dojo.require("dojo.dnd.common");
dojo.require("dijit._tree.dndContainer");
dojo.declare("dijit._tree.dndSelector",dijit._tree.dndContainer,{constructor:function(C,D){this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.tree.domNode,"onmousedown",this,"onMouseDown"),dojo.connect(this.tree.domNode,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedItems:function(){var D=[];
for(var C in this.selection){D.push(dijit.getEnclosingWidget(this.selection[C]).item)
}return D
},getSelectedNodes:function(){return this.selection
},selectNone:function(){return this._removeSelection()._removeAnchor()
},insertItems:function(D,C){},destroy:function(){dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},onMouseDown:function(F){if(!this.current){return 
}var D=dijit.getEnclosingWidget(this.current).item;
var E=this.tree.store.getIdentity(D);
if(!this.current.id){this.current.id=E
}if(!this.current.type){this.current.type="data"
}if(!this.singular&&!dojo.dnd.getCopyKeyState(F)&&!F.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
dojo.stopEvent(F);
return 
}if(this.singular){if(this.anchor==this.current){if(dojo.dnd.getCopyKeyState(F)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}}else{if(!this.singular&&F.shiftKey){if(dojo.dnd.getCopyKeyState(F)){}else{}}else{if(dojo.dnd.getCopyKeyState(F)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
this._removeAnchor()
}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id]
}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected")
}this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=this.current
}}}else{var D=dijit.getEnclosingWidget(this.current).item;
var E=this.tree.store.getIdentity(D);
if(!(E in this.selection)){this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[E]=this.current
}}}}dojo.stopEvent(F)
},onMouseMove:function(){},onOverEvent:function(){this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove")
},onMouseUp:function(B){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}},_removeSelection:function(){var E=dojo.dnd._empty;
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