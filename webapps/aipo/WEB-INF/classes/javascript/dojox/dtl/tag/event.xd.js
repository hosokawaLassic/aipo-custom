dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.event"],["require","dojox.dtl._base"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.tag.event"]){B._hasResource["dojox.dtl.tag.event"]=true;
B.provide("dojox.dtl.tag.event");
B.require("dojox.dtl._base");
dojox.dtl.tag.event.EventNode=function(A,D){this._type=A;
this.contents=D
};
B.extend(dojox.dtl.tag.event.EventNode,{render:function(A,D){if(!this._clear){D.getParent()[this._type]=null;
this._clear=true
}if(this.contents&&!this._rendered){if(!A.getThis()){throw new Error("You must use Context.setObject(instance)")
}this._rendered=B.connect(D.getParent(),this._type,A.getThis(),this.contents)
}return D
},unrender:function(A,D){if(this._rendered){B.disconnect(this._rendered);
this._rendered=false
}return D
},clone:function(){return new dojox.dtl.tag.event.EventNode(this._type,this.contents)
},toString:function(){return"dojox.dtl.tag.event."+this._type
}});
dojox.dtl.tag.event.on=function(A,E){var F=E.split(" ");
return new dojox.dtl.tag.event.EventNode(F[0],F[1])
}
}}});