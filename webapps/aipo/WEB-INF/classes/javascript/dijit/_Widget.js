if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.require("dijit._base");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(D,C){this.create(D,C)
},create:function(G,J){this.srcNodeRef=dojo.byId(J);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(G){dojo.mixin(this,G)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var F in this.attributeMap){var H=this[this.attributeMap[F]||"domNode"];
var I=this[F];
if(typeof I!="object"&&(I!==""||(G&&G[F]))){switch(F){case"class":dojo.addClass(H,I);
break;
case"style":if(H.style.cssText){H.style.cssText+="; "+I
}else{H.style.cssText=I
}break;
default:H.setAttribute(F,I)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||dojo.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(B){this.destroyDescendants();
this.destroy()
},destroy:function(B){this.uninitialize();
dojo.forEach(this._connects,function(A){dojo.forEach(A,dojo.disconnect)
});
this.destroyRendering(B);
dijit.registry.remove(this.id)
},destroyRendering:function(B){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){dojo._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){dojo._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){dojo.forEach(this.getDescendants(),function(B){B.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var B=dojo.query("[widgetId]",this.domNode);
return B.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(H,I,G){var J=[];
if(I=="ondijitclick"){var F=this;
if(!this.nodesWithKeyClick[H.nodeName]){J.push(dojo.connect(H,"onkeydown",this,function(A){if(A.keyCode==dojo.keys.ENTER){return(dojo.isString(G))?F[G](A):G.call(F,A)
}else{if(A.keyCode==dojo.keys.SPACE){dojo.stopEvent(A)
}}}));
J.push(dojo.connect(H,"onkeyup",this,function(A){if(A.keyCode==dojo.keys.SPACE){return dojo.isString(G)?F[G](A):G.call(F,A)
}}))
}I="onclick"
}J.push(dojo.connect(H,I,this,G));
this._connects.push(J);
return J
},disconnect:function(D){for(var C=0;
C<this._connects.length;
C++){if(this._connects[C]==D){dojo.forEach(D,dojo.disconnect);
this._connects.splice(C,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=dojo.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(dojo.style(this.domNode,"display")!="none")
}})
};