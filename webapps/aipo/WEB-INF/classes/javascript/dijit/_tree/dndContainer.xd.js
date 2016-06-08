dojo._xdResourceLoaded({depends:[["provide","dijit._tree.dndContainer"],["require","dojo.dnd.common"],["require","dojo.dnd.Container"]],defineResource:function(B){if(!B._hasResource["dijit._tree.dndContainer"]){B._hasResource["dijit._tree.dndContainer"]=true;
B.provide("dijit._tree.dndContainer");
B.require("dojo.dnd.common");
B.require("dojo.dnd.Container");
B.declare("dijit._tree.dndContainer",null,{constructor:function(D,A){this.tree=D;
this.node=D.domNode;
B.mixin(this,A);
this.map={};
this.current=null;
this.ContainerState="";
B.addClass(this.node,"dojoDndContainer");
if(!(A&&A._skipStartup)){this.startup()
}this.events=[B.connect(this.node,"onmouseover",this,"onMouseOver"),B.connect(this.node,"onmouseout",this,"onMouseOut"),B.connect(this.node,"ondragstart",B,"stopEvent"),B.connect(this.node,"onselectstart",B,"stopEvent")]
},getItem:function(A){return this.selection[A]
},onMouseOver:function(E){var A=E.relatedTarget;
while(A){if(A==this.node){break
}try{A=A.parentNode
}catch(F){A=null
}}if(!A){this._changeState("Container","Over");
this.onOverEvent()
}A=this._getChildByEvent(E);
if(this.current==A){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(A){this._addItemClass(A,"Over")
}this.current=A
},onMouseOut:function(E){for(var A=E.relatedTarget;
A;
){if(A==this.node){return 
}try{A=A.parentNode
}catch(F){A=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},_changeState:function(H,A){var F="dojoDnd"+H;
var G=H.toLowerCase()+"State";
B.removeClass(this.node,F+this[G]);
B.addClass(this.node,F+A);
this[G]=A
},_getChildByEvent:function(A){var D=A.target;
if(D&&B.hasClass(D,"dijitTreeLabel")){return D
}return null
},markupFactory:function(D,A){A._skipStartup=true;
return new dijit._tree.dndContainer(D,A)
},_addItemClass:function(A,D){B.addClass(A,"dojoDndItem"+D)
},_removeItemClass:function(A,D){B.removeClass(A,"dojoDndItem"+D)
},onOverEvent:function(){console.log("onOverEvent parent")
},onOutEvent:function(){}})
}}});