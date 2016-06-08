dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Selector"],["require","dojo.dnd.common"],["require","dojo.dnd.Container"]],defineResource:function(B){if(!B._hasResource["dojo.dnd.Selector"]){B._hasResource["dojo.dnd.Selector"]=true;
B.provide("dojo.dnd.Selector");
B.require("dojo.dnd.common");
B.require("dojo.dnd.Container");
B.declare("dojo.dnd.Selector",B.dnd.Container,{constructor:function(D,A){if(!A){A={}
}this.singular=A.singular;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(B.connect(this.node,"onmousedown",this,"onMouseDown"),B.connect(this.node,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedNodes:function(){var E=new B.NodeList();
var A=B.dnd._empty;
for(var F in this.selection){if(F in A){continue
}E.push(B.byId(F))
}return E
},selectNone:function(){return this._removeSelection()._removeAnchor()
},selectAll:function(){this.forInItems(function(D,A){this._addItemClass(B.byId(A),"Selected");
this.selection[A]=1
},this);
return this._removeAnchor()
},deleteSelectedNodes:function(){var E=B.dnd._empty;
for(var F in this.selection){if(F in E){continue
}var A=B.byId(F);
this.delItem(F);
B._destroyElement(A)
}this.anchor=null;
this.selection={};
return this
},insertNodes:function(J,A,G,I){var H=this._normalizedCreator;
this._normalizedCreator=function(D,C){var E=H.call(this,D,C);
if(J){if(!this.anchor){this.anchor=E.node;
this._removeItemClass(E.node,"Selected");
this._addItemClass(this.anchor,"Anchor")
}else{if(this.anchor!=E.node){this._removeItemClass(E.node,"Anchor");
this._addItemClass(E.node,"Selected")
}}this.selection[E.node.id]=1
}else{this._removeItemClass(E.node,"Selected");
this._removeItemClass(E.node,"Anchor")
}return E
};
B.dnd.Selector.superclass.insertNodes.call(this,A,G,I);
this._normalizedCreator=H;
return this
},destroy:function(){B.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},markupFactory:function(A,D){A._skipStartup=true;
return new B.dnd.Selector(D,A)
},onMouseDown:function(F){if(!this.current){return 
}if(!this.singular&&!B.dnd.getCopyKeyState(F)&&!F.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
B.stopEvent(F);
return 
}if(!this.singular&&F.shiftKey){if(!B.dnd.getCopyKeyState(F)){this._removeSelection()
}var A=B.query("> .dojoDndItem",this.parent);
if(A.length){if(!this.anchor){this.anchor=A[0];
this._addItemClass(this.anchor,"Anchor")
}this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){var H=0;
for(;
H<A.length;
++H){var G=A[H];
if(G==this.anchor||G==this.current){break
}}for(++H;
H<A.length;
++H){var G=A[H];
if(G==this.anchor||G==this.current){break
}this._addItemClass(G,"Selected");
this.selection[G.id]=1
}this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1
}}}else{if(this.singular){if(this.anchor==this.current){if(B.dnd.getCopyKeyState(F)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}}else{if(B.dnd.getCopyKeyState(F)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
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
}}}}B.stopEvent(F)
},onMouseUp:function(A){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}},onMouseMove:function(A){this.simpleSelection=false
},onOverEvent:function(){this.onmousemoveEvent=B.connect(this.node,"onmousemove",this,"onMouseMove")
},onOutEvent:function(){B.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent
},_removeSelection:function(){var A=B.dnd._empty;
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