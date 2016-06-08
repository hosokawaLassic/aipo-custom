dojo._xdResourceLoaded({depends:[["provide","dijit._tree.dndSelector"],["require","dojo.dnd.common"],["require","dijit._tree.dndContainer"]],defineResource:function(B){if(!B._hasResource["dijit._tree.dndSelector"]){B._hasResource["dijit._tree.dndSelector"]=true;
B.provide("dijit._tree.dndSelector");
B.require("dojo.dnd.common");
B.require("dijit._tree.dndContainer");
B.declare("dijit._tree.dndSelector",dijit._tree.dndContainer,{constructor:function(D,A){this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(B.connect(this.tree.domNode,"onmousedown",this,"onMouseDown"),B.connect(this.tree.domNode,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedItems:function(){var A=[];
for(var D in this.selection){A.push(dijit.getEnclosingWidget(this.selection[D]).item)
}return A
},getSelectedNodes:function(){return this.selection
},selectNone:function(){return this._removeSelection()._removeAnchor()
},insertItems:function(A,D){},destroy:function(){B.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},onMouseDown:function(E){if(!this.current){return 
}var F=dijit.getEnclosingWidget(this.current).item;
var A=this.tree.store.getIdentity(F);
if(!this.current.id){this.current.id=A
}if(!this.current.type){this.current.type="data"
}if(!this.singular&&!B.dnd.getCopyKeyState(E)&&!E.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
B.stopEvent(E);
return 
}if(this.singular){if(this.anchor==this.current){if(B.dnd.getCopyKeyState(E)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}}else{if(!this.singular&&E.shiftKey){if(B.dnd.getCopyKeyState(E)){}else{}}else{if(B.dnd.getCopyKeyState(E)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
this._removeAnchor()
}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id]
}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected")
}this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=this.current
}}}else{var F=dijit.getEnclosingWidget(this.current).item;
var A=this.tree.store.getIdentity(F);
if(!(A in this.selection)){this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[A]=this.current
}}}}B.stopEvent(E)
},onMouseMove:function(){},onOverEvent:function(){this.onmousemoveEvent=B.connect(this.node,"onmousemove",this,"onMouseMove")
},onMouseUp:function(A){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}},_removeSelection:function(){var A=B.dnd._empty;
for(var F in this.selection){if(F in A){continue
}var E=B.byId(F);
if(E){this._removeItemClass(E,"Selected")
}}this.selection={};
return this
},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this.anchor=null
}return this
}})
}}});