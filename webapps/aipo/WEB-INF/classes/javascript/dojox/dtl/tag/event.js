if(!dojo._hasResource["dojox.dtl.tag.event"]){dojo._hasResource["dojox.dtl.tag.event"]=true;
dojo.provide("dojox.dtl.tag.event");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.event.EventNode=function(D,C){this._type=D;
this.contents=C
};
dojo.extend(dojox.dtl.tag.event.EventNode,{render:function(D,C){if(!this._clear){C.getParent()[this._type]=null;
this._clear=true
}if(this.contents&&!this._rendered){if(!D.getThis()){throw new Error("You must use Context.setObject(instance)")
}this._rendered=dojo.connect(C.getParent(),this._type,D.getThis(),this.contents)
}return C
},unrender:function(D,C){if(this._rendered){dojo.disconnect(this._rendered);
this._rendered=false
}return C
},clone:function(){return new dojox.dtl.tag.event.EventNode(this._type,this.contents)
},toString:function(){return"dojox.dtl.tag.event."+this._type
}});
dojox.dtl.tag.event.on=function(E,F){var D=F.split(" ");
return new dojox.dtl.tag.event.EventNode(D[0],D[1])
}
};