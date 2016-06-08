if(!dojo._hasResource["dijit._tree.dndContainer"]){dojo._hasResource["dijit._tree.dndContainer"]=true;
dojo.provide("dijit._tree.dndContainer");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.Container");
dojo.declare("dijit._tree.dndContainer",null,{constructor:function(C,D){this.tree=C;
this.node=C.domNode;
dojo.mixin(this,D);
this.map={};
this.current=null;
this.ContainerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(D&&D._skipStartup)){this.startup()
}this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",dojo,"stopEvent"),dojo.connect(this.node,"onselectstart",dojo,"stopEvent")]
},getItem:function(B){return this.selection[B]
},onMouseOver:function(F){var E=F.relatedTarget;
while(E){if(E==this.node){break
}try{E=E.parentNode
}catch(D){E=null
}}if(!E){this._changeState("Container","Over");
this.onOverEvent()
}E=this._getChildByEvent(F);
if(this.current==E){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(E){this._addItemClass(E,"Over")
}this.current=E
},onMouseOut:function(F){for(var E=F.relatedTarget;
E;
){if(E==this.node){return 
}try{E=E.parentNode
}catch(D){E=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},_changeState:function(E,F){var G="dojoDnd"+E;
var H=E.toLowerCase()+"State";
dojo.removeClass(this.node,G+this[H]);
dojo.addClass(this.node,G+F);
this[H]=F
},_getChildByEvent:function(D){var C=D.target;
if(C&&dojo.hasClass(C,"dijitTreeLabel")){return C
}return null
},markupFactory:function(C,D){D._skipStartup=true;
return new dijit._tree.dndContainer(C,D)
},_addItemClass:function(D,C){dojo.addClass(D,"dojoDndItem"+C)
},_removeItemClass:function(D,C){dojo.removeClass(D,"dojoDndItem"+C)
},onOverEvent:function(){console.log("onOverEvent parent")
},onOutEvent:function(){}})
};