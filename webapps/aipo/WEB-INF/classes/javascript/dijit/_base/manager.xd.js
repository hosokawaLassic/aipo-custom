dojo._xdResourceLoaded({depends:[["provide","dijit._base.manager"]],defineResource:function(B){if(!B._hasResource["dijit._base.manager"]){B._hasResource["dijit._base.manager"]=true;
B.provide("dijit._base.manager");
B.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(A){if(this._hash[A.id]){throw new Error("Tried to register widget with id=="+A.id+" but that id is already registered")
}this._hash[A.id]=A
},remove:function(A){delete this._hash[A]
},forEach:function(D){for(var A in this._hash){D(this._hash[A])
}},filter:function(A){var D=new dijit.WidgetSet();
this.forEach(function(C){if(A(C)){D.add(C)
}});
return D
},byId:function(A){return this._hash[A]
},byClass:function(A){return this.filter(function(D){return D.declaredClass==A
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(D){var A;
do{A=D+"_"+(dijit._widgetTypeCtr[D]!==undefined?++dijit._widgetTypeCtr[D]:dijit._widgetTypeCtr[D]=0)
}while(dijit.byId(A));
return A
};
if(B.isIE){B.addOnUnload(function(){dijit.registry.forEach(function(A){A.destroy()
})
})
}dijit.byId=function(A){return(B.isString(A))?dijit.registry.byId(A):A
};
dijit.byNode=function(A){return dijit.registry.byId(A.getAttribute("widgetId"))
};
dijit.getEnclosingWidget=function(A){while(A){if(A.getAttribute&&A.getAttribute("widgetId")){return dijit.registry.byId(A.getAttribute("widgetId"))
}A=A.parentNode
}return null
}
}}});